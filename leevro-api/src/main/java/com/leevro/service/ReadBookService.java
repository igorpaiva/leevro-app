package com.leevro.service;

import com.leevro.model.Book;
import com.leevro.model.ReadBook;
import com.leevro.model.User;
import com.leevro.repository.ReadBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReadBookService {

    @Autowired
    ReadBookRepository readBookRepository;

    public ReadBook save(ReadBook readBook) {
        return readBookRepository.save(readBook);
    }

    public ReadBook getReadBookByUserAndBook(User user, Book book) {
        return readBookRepository.findReadBookByBookAndUser(user, book);
    }
    public List<ReadBook> getReadBooksByUser(User user) {
        return readBookRepository.findReadBooksByUser(user);
    }

    public List<Book> getFavoriteBooksByUser(User user) {
        List<ReadBook> favoriteReadBooks = readBookRepository.findReadBooksByIsFavoriteTrueAndUser(user);
        List<Book> favoriteBooks = new ArrayList<>();
        for(ReadBook favoriteReadBook: favoriteReadBooks) {
            favoriteBooks.add(favoriteReadBook.getBook());
        }
        return favoriteBooks;
    }

    public List<Book> getOwnedBooksByUser(User user) {
        List<ReadBook> ownedReadBooks = readBookRepository.findReadBooksByIsOwnedTrueAndUser(user);
        List<Book> ownedBooks = new ArrayList<>();
        for(ReadBook ownedReadBook: ownedReadBooks) {
            ownedBooks.add(ownedReadBook.getBook());
        }
        return ownedBooks;
    }

    public List<Book> getWishedBooksByUser(User user) {
        List<ReadBook> wishedReadBooks = readBookRepository.findReadBooksByIsWishedTrueAndUser(user);
        List<Book> wishedBooks = new ArrayList<>();
        for(ReadBook wishedReadBook: wishedReadBooks) {
            wishedBooks.add(wishedReadBook.getBook());
        }
        return wishedBooks;
    }
}
