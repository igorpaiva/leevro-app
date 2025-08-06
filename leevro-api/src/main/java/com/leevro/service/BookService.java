package com.leevro.service;

import com.leevro.model.Book;
import com.leevro.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    BookRepository bookRepository;

    public Book findById(Long id) {
        return bookRepository.findById(id).orElse(null);
    }

    public List<Book> findAllBooks() {
        return bookRepository.findAll();
    }

    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    public void saveBooksList(List<Book> books) {
        bookRepository.saveAll(books);
    }

    public void deleteBookById(Long id) {
        bookRepository.deleteById(id);
    }

}
