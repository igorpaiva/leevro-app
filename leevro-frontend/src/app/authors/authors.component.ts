import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService, Author, Book } from '../services/books.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors: Author[] = [];
  filteredAuthors: Author[] = [];
  loading = true;
  searchTerm = '';
  viewMode = 'grid'; // 'grid' or 'list'

  constructor(
    private booksService: BooksService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors(): void {
    // Mock data for now - replace with actual API call
    this.authors = [
      {
        id: 1,
        name: 'F. Scott Fitzgerald',
        biography: 'Francis Scott Key Fitzgerald was an American novelist, essayist, screenwriter, and short story writer. He was best known for his novels depicting the flamboyance and excess of the Jazz Age—a term he popularized.',
        birthDate: '1896-09-24',
        nationality: 'American'
      },
      {
        id: 2,
        name: 'George Orwell',
        biography: 'Eric Arthur Blair, known by his pen name George Orwell, was an English novelist, essayist, journalist, and critic. His work is characterized by lucid prose, biting social criticism, opposition to totalitarianism, and outspoken support of democratic socialism.',
        birthDate: '1903-06-25',
        nationality: 'British'
      },
      {
        id: 3,
        name: 'Harper Lee',
        biography: 'Nelle Harper Lee was an American novelist best known for her 1960 novel To Kill a Mockingbird. It won the 1961 Pulitzer Prize and has become a classic of modern American literature.',
        birthDate: '1926-04-28',
        nationality: 'American'
      },
      {
        id: 4,
        name: 'Jane Austen',
        biography: 'Jane Austen was an English novelist known primarily for her six major novels, which interpret, critique and comment upon the British landed gentry at the end of the 18th century.',
        birthDate: '1775-12-16',
        nationality: 'British'
      },
      {
        id: 5,
        name: 'Gabriel García Márquez',
        biography: 'Gabriel José de la Concordia García Márquez was a Colombian novelist, short-story writer, screenwriter, and journalist, known affectionately as Gabo or Gabito throughout Latin America.',
        birthDate: '1927-03-06',
        nationality: 'Colombian'
      }
    ];

    this.filteredAuthors = [...this.authors];
    this.loading = false;
  }

  onSearch(): void {
    this.filterAuthors();
  }

  filterAuthors(): void {
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      this.filteredAuthors = this.authors.filter(author => 
        author.name.toLowerCase().includes(term) ||
        (author.nationality && author.nationality.toLowerCase().includes(term)) ||
        (author.biography && author.biography.toLowerCase().includes(term))
      );
    } else {
      this.filteredAuthors = [...this.authors];
    }
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }

  viewAuthorDetails(author: Author): void {
    // Navigate to author details page (to be implemented)
    this.router.navigate(['/authors', author.id]);
  }

  viewAuthorBooks(author: Author): void {
    // Navigate to books filtered by this author
    this.router.navigate(['/books'], { queryParams: { author: author.id } });
  }

  getAuthorAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  formatBirthDate(birthDate: string): string {
    return new Date(birthDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  goBackToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
