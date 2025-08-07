import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksService, Book, Author, ReadBook, UserReview, PageableResponse } from '../services/books.service';
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

  // Pagination properties
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;
  isLast = false;
  isFirst = true;
  sortDirection = 'asc';

  // Image cache to avoid repeated failures
  private failedImages = new Set<string>();

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
    
    this.booksService.getAllBooks(this.currentPage, this.pageSize, this.sortDirection).subscribe({
      next: (response: PageableResponse<Book>) => {
        this.books = response.content;
        this.filteredBooks = [...this.books];
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.isLast = response.last;
        this.isFirst = response.first;
        this.currentPage = response.number;
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
        book.authors.some(author => author.toLowerCase().includes(term)) ||
        book.isbn.includes(term)
      );
    }

    // Filter by reading status
    if (this.filterStatus !== 'all') {
      let userBookIds: number[] = [];
      
      switch (this.filterStatus) {
        case 'read':
          userBookIds = this.readBooks.map(rb => rb.book.id!);
          break;
        case 'favorites':
          userBookIds = this.favoriteBooks.map(book => book.id!);
          break;
        case 'owned':
          userBookIds = this.ownedBooks.map(book => book.id!);
          break;
        case 'wishlist':
          userBookIds = this.wishlistBooks.map(book => book.id!);
          break;
      }
      
      filtered = filtered.filter(book => book.id && userBookIds.includes(book.id));
    }

    this.filteredBooks = filtered;
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }

  getBookStatus(bookId: number | undefined): string {
    if (!bookId) return 'NOT_READ';
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

  getBookRating(bookId: number | undefined): number {
    if (!bookId) return 0;
    const readBook = this.readBooks.find(rb => rb.book.id === bookId);
    return readBook?.userRating || 0;
  }

  isBookFavorite(bookId: number | undefined): boolean {
    if (!bookId) return false;
    return this.favoriteBooks.some(book => book.id === bookId);
  }

  isBookOwned(bookId: number | undefined): boolean {
    if (!bookId) return false;
    return this.ownedBooks.some(book => book.id === bookId);
  }

  isBookInWishlist(bookId: number | undefined): boolean {
    if (!bookId) return false;
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
    if (!book.id) return;
    // Implementation for toggling favorite status
    const isFavorite = this.isBookFavorite(book.id);
    const message = isFavorite ? 
      `Removed "${book.title}" from favorites` : 
      `Added "${book.title}" to favorites`;
    this.notificationService.success(message);
  }

  viewBookDetails(book: Book): void {
    if (!book.id) return;
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

  // Pagination methods
  nextPage(): void {
    if (!this.isLast) {
      this.currentPage++;
      this.loadBooks();
    }
  }

  previousPage(): void {
    if (!this.isFirst) {
      this.currentPage--;
      this.loadBooks();
    }
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadBooks();
    }
  }

  changePageSize(newSize: number): void {
    this.pageSize = newSize;
    this.currentPage = 0; // Reset to first page
    this.loadBooks();
  }

  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.currentPage = 0; // Reset to first page
    this.loadBooks();
  }

  getPaginationArray(): number[] {
    const pages: number[] = [];
    const start = Math.max(0, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 3);
    
    for (let i = start; i < end; i++) {
      pages.push(i);
    }
    return pages;
  }

  getEndItem(): number {
    return Math.min((this.currentPage + 1) * this.pageSize, this.totalElements);
  }

  formatAuthors(authors: string[]): string {
    if (!authors || authors.length === 0) return 'Unknown Author';
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;
    return `${authors[0]} and ${authors.length - 1} others`;
  }

  onImageError(event: any): void {
    const imgElement = event.target as HTMLImageElement;
    const fallbackImage = 'assets/img/book-placeholder.jpg';
    const originalSrc = imgElement.src;
    
    // Prevent infinite loops by checking if we're already using the fallback
    if (originalSrc.includes('book-placeholder.jpg')) {
      return;
    }
    
    // Add to failed images cache
    this.failedImages.add(originalSrc);
    
    console.warn(`Failed to load book cover: ${originalSrc}`);
    imgElement.src = fallbackImage;
  }

  getBookCoverUrl(book: Book): string {
    // If no coverUrl, return fallback immediately
    if (!book.coverUrl) {
      return 'assets/img/book-placeholder.jpg';
    }
    
    // Check if this URL has previously failed
    if (this.failedImages.has(book.coverUrl)) {
      return 'assets/img/book-placeholder.jpg';
    }
    
    // Check if the URL looks valid
    if (!book.coverUrl.startsWith('http')) {
      return 'assets/img/book-placeholder.jpg';
    }
    
    // Check for common Open Library issues
    if (book.coverUrl.includes('openlibrary.org') && !book.coverUrl.includes('-L.jpg')) {
      // Try to ensure we're using the large version
      const isbn = book.isbn;
      if (isbn) {
        return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
      }
    }
    
    return book.coverUrl;
  }
}
