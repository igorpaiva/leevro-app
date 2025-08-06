import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksService, Book, Author, ReadBook, UserReview } from '../services/books.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  readBooks: ReadBook[] = [];
  favoriteBooks: Book[] = [];
  ownedBooks: Book[] = [];
  wishlistBooks: Book[] = [];
  filteredBooks: Book[] = [];
  loading = true;
  searchTerm = '';
  filterStatus = 'all';
  viewMode = 'grid'; // 'grid' or 'list'
  currentUserId = 1; // Hardcoded for now, should come from auth service
  pageTitle = 'All Books'; // Dynamic page title

  statusOptions = [
    { value: 'all', label: 'All Books' },
    { value: 'read', label: 'Read' },
    { value: 'favorites', label: 'Favorites' },
    { value: 'owned', label: 'Owned' },
    { value: 'wishlist', label: 'Wishlist' }
  ];

  constructor(
    private booksService: BooksService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadBooks();
    this.loadUserData();
    
    // Check for filter parameter from dashboard navigation
    this.route.queryParams.subscribe(params => {
      if (params['filter']) {
        this.filterStatus = params['filter'];
        this.updatePageTitle();
      } else {
        this.filterStatus = 'all';
        this.pageTitle = 'All Books';
      }
    });
  }

  loadBooks(): void {
    this.loading = true;
    
    this.booksService.getAllBooks().subscribe({
      next: (books: Book[]) => {
        this.books = books;
        this.filteredBooks = [...this.books];
        this.loading = false;
      },
      error: (error: any) => {
        // Check if it's a CORS error
        if (!error.status) {
          this.notificationService.error('Connection failed. Please check if the backend is running on port 8080.');
        } else if (error.status === 401) {
          this.notificationService.error('Authentication required. Please login first.');
        } else {
          this.notificationService.error(`Failed to load books. Error: ${error.status}`);
        }
        
        this.loading = false;
        // Fallback to empty array if API fails
        this.books = [];
        this.filteredBooks = [];
      }
    });
  }

  loadUserData(): void {
    let loadedCount = 0;
    const totalLoads = 4; // 4 diferentes chamadas para API

    const checkComplete = () => {
      loadedCount++;
      if (loadedCount >= totalLoads) {
        // Apply filters after all data is loaded
        this.filterBooks();
      }
    };

    // Load all user-specific data
    this.booksService.getUserReadBooks(this.currentUserId).subscribe({
      next: (readBooks: ReadBook[]) => {
        this.readBooks = readBooks;
        checkComplete();
      },
      error: (error) => {
        console.error('Error loading read books:', error);
        checkComplete();
      }
    });

    this.booksService.getUserFavoriteBooks(this.currentUserId).subscribe({
      next: (favorites: Book[]) => {
        this.favoriteBooks = favorites;
        checkComplete();
      },
      error: (error) => {
        console.error('Error loading favorite books:', error);
        checkComplete();
      }
    });

    this.booksService.getUserOwnedBooks(this.currentUserId).subscribe({
      next: (owned: Book[]) => {
        this.ownedBooks = owned;
        checkComplete();
      },
      error: (error) => {
        console.error('Error loading owned books:', error);
        checkComplete();
      }
    });

    this.booksService.getUserWishlist(this.currentUserId).subscribe({
      next: (wishlist: Book[]) => {
        this.wishlistBooks = wishlist;
        checkComplete();
      },
      error: (error) => {
        console.error('Error loading wishlist:', error);
        checkComplete();
      }
    });
  }

  onSearch(): void {
    this.filterBooks();
  }

  onFilterChange(): void {
    this.filterBooks();
    this.updatePageTitle();
  }

  updatePageTitle(): void {
    switch (this.filterStatus) {
      case 'all':
        this.pageTitle = 'All Books';
        break;
      case 'read':
        this.pageTitle = 'Read Books';
        break;
      case 'favorites':
        this.pageTitle = 'Favorite Books';
        break;
      case 'owned':
        this.pageTitle = 'My Books';
        break;
      case 'wishlist':
        this.pageTitle = 'Wishlist';
        break;
      default:
        this.pageTitle = 'All Books';
    }
  }

  filterBooks(): void {
    let filtered = [...this.books];

    // Filter by search term
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.isbn.includes(term)
      );
    }

    // Filter by reading status
    if (this.filterStatus !== 'all') {
      let userBookIds: number[] = [];
      
      switch (this.filterStatus) {
        case 'read':
          userBookIds = this.readBooks.map(rb => rb.book.id);
          break;
        case 'favorites':
          userBookIds = this.favoriteBooks.map(book => book.id);
          break;
        case 'owned':
          userBookIds = this.ownedBooks.map(book => book.id);
          break;
        case 'wishlist':
          userBookIds = this.wishlistBooks.map(book => book.id);
          break;
      }
      
      filtered = filtered.filter(book => userBookIds.includes(book.id));
    }

    this.filteredBooks = filtered;
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }

  getBookStatus(bookId: number): string {
    const readBook = this.readBooks.find(rb => rb.book.id === bookId);
    if (readBook) {
      if (readBook.finishReadingDate) return 'READ';
      if (readBook.startReadingDate) return 'READING';
    }
    if (this.favoriteBooks.some(book => book.id === bookId)) return 'FAVORITE';
    if (this.ownedBooks.some(book => book.id === bookId)) return 'OWNED';
    if (this.wishlistBooks.some(book => book.id === bookId)) return 'WISHLIST';
    return 'NOT_READ';
  }

  getBookRating(bookId: number): number {
    const readBook = this.readBooks.find(rb => rb.book.id === bookId);
    return readBook?.userRating || 0;
  }

  isBookFavorite(bookId: number): boolean {
    return this.favoriteBooks.some(book => book.id === bookId);
  }

  isBookOwned(bookId: number): boolean {
    return this.ownedBooks.some(book => book.id === bookId);
  }

  isBookInWishlist(bookId: number): boolean {
    return this.wishlistBooks.some(book => book.id === bookId);
  }

  addToReading(book: Book): void {
    // Implementation for adding book to reading list
    this.notificationService.success(`Added "${book.title}" to your reading list`);
  }

  markAsCompleted(book: Book): void {
    // Implementation for marking book as completed
    this.notificationService.success(`Marked "${book.title}" as completed`);
  }

  toggleFavorite(book: Book): void {
    // Implementation for toggling favorite status
    const isFavorite = this.isBookFavorite(book.id);
    const message = isFavorite ? 
      `Removed "${book.title}" from favorites` : 
      `Added "${book.title}" to favorites`;
    this.notificationService.success(message);
  }

  viewBookDetails(book: Book): void {
    // Navigate to book details page (to be implemented)
    this.router.navigate(['/books', book.id]);
  }

  getReadingStats(): { read: number; favorites: number; owned: number; wishlist: number } {
    return {
      read: this.readBooks.length,
      favorites: this.favoriteBooks.length,
      owned: this.ownedBooks.length,
      wishlist: this.wishlistBooks.length
    };
  }

  goBackToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
