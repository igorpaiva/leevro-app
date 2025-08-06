import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userNickname: string = '';
  userId: number = 1; // TODO: Get from authentication service
  stats = {
    readBooks: 0,
    favoriteBooks: 0,
    wishlistBooks: 0,
    ownedBooks: 0
  };
  loading = true;

  constructor(
    private router: Router,
    private booksService: BooksService
  ) { }

  ngOnInit(): void {
    this.loadUserData();
    this.loadStats();
  }

  loadUserData() {
    this.userNickname = sessionStorage.getItem('userNickname') || 'User';
  }

  loadStats(): void {
    this.loading = true;
    let loadedCount = 0;
    const totalLoads = 4; // 4 API calls

    const checkComplete = () => {
      loadedCount++;
      if (loadedCount >= totalLoads) {
        this.loading = false;
      }
    };

    // Get user's read books
    this.booksService.getUserReadBooks(this.userId).subscribe({
      next: (readBooks) => {
        this.stats.readBooks = readBooks.length;
        checkComplete();
      },
      error: (error) => {
        console.error('Error loading read books stats:', error);
        this.stats.readBooks = 0;
        checkComplete();
      }
    });

    // Get user's favorite books
    this.booksService.getUserFavoriteBooks(this.userId).subscribe({
      next: (favorites) => {
        this.stats.favoriteBooks = favorites.length;
        checkComplete();
      },
      error: (error) => {
        console.error('Error loading favorite books stats:', error);
        this.stats.favoriteBooks = 0;
        checkComplete();
      }
    });

    // Get user's wishlist
    this.booksService.getUserWishlist(this.userId).subscribe({
      next: (wishlist) => {
        this.stats.wishlistBooks = wishlist.length;
        checkComplete();
      },
      error: (error) => {
        console.error('Error loading wishlist stats:', error);
        this.stats.wishlistBooks = 0;
        checkComplete();
      }
    });

    // Get user's owned books
    this.booksService.getUserOwnedBooks(this.userId).subscribe({
      next: (ownedBooks) => {
        this.stats.ownedBooks = ownedBooks.length;
        checkComplete();
      },
      error: (error) => {
        console.error('Error loading owned books stats:', error);
        this.stats.ownedBooks = 0;
        checkComplete();
      }
    });
  }

  navigateToAuthors() {
    this.router.navigate(['/authors']);
  }

  navigateToAllBooks() {
    this.router.navigate(['/books']);
  }

  navigateToReadBooks() {
    this.router.navigate(['/books'], { queryParams: { filter: 'read' } });
  }

  navigateToFavorites() {
    this.router.navigate(['/books'], { queryParams: { filter: 'favorites' } });
  }

  navigateToWishlist() {
    this.router.navigate(['/books'], { queryParams: { filter: 'wishlist' } });
  }

  navigateToOwnedBooks() {
    this.router.navigate(['/books'], { queryParams: { filter: 'owned' } });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
