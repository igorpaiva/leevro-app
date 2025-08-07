import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Book {
  id?: number;
  title: string;
  isbn: string;
  numberOfPages: number;
  authors: string[];
  releaseDate: string;
  description?: string;
  coverUrl?: string;
  customCoverImage?: string;
  customCoverImageType?: string;
}

export interface PageableResponse<T> {
  content: T[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

export interface Author {
  id: number;
  name: string;
  biography?: string;
  birthDate?: string;
  nationality?: string;
}

export interface ReadBook {
  id: number;
  startReadingDate?: string;
  finishReadingDate?: string;
  userRating?: number;
  isFavorite: boolean;
  isWished: boolean;
  isOwned: boolean;
  userReview?: string;
  book: Book;
  user: {
    id: number;
  };
}

export interface UserReview {
  id: number;
  user: any;
  book: Book;
  rating: number;
  reviewText?: string;
  reviewDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = '/api'; // Using relative URL with proxy

  constructor(private http: HttpClient) { }

  // Book operations
  getAllBooks(page: number = 0, size: number = 10, direction: string = 'asc'): Observable<PageableResponse<Book>> {
    return this.http.get<PageableResponse<Book>>(`${this.apiUrl}/books?page=${page}&size=${size}&direction=${direction}`);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${id}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/books`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/books/${id}`);
  }

  // User operations
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`);
  }

  // User reading operations
  getUserReadBooks(userId: number): Observable<ReadBook[]> {
    return this.http.get<ReadBook[]>(`${this.apiUrl}/users/${userId}/readBooks`);
  }

  getUserFavoriteBooks(userId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/users/${userId}/favoriteBooks`);
  }

  getUserOwnedBooks(userId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/users/${userId}/ownedBooks`);
  }

  getUserWishlist(userId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/users/${userId}/wishlist`);
  }

  addReadBookToUser(userId: number, bookId: number, readBook: ReadBook): Observable<ReadBook> {
    return this.http.patch<ReadBook>(`${this.apiUrl}/users/${userId}/readBooks/${bookId}`, readBook);
  }

  // Review operations
  getUserReviews(userId: number): Observable<UserReview[]> {
    return this.http.get<UserReview[]>(`${this.apiUrl}/users/${userId}/userReviews`);
  }

  createReview(userId: number, bookId: number, reviewBody: string): Observable<UserReview> {
    return this.http.post<UserReview>(`${this.apiUrl}/users/${userId}/userReviews/${bookId}`, reviewBody);
  }
}
