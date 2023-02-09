package com.leevro.service;

import com.leevro.model.Book;
import com.leevro.model.FavoriteBook;
import com.leevro.model.User;
import com.leevro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    BookService bookService;

    @Autowired
    FavoriteBookService favoriteBookService;

    public User findById(Long id) {
        User retrievedUser = userRepository.findById(id).orElse(null);
        retrievedUser.setFavoriteBooks(favoriteBookService.getFavoriteBooksByUser(retrievedUser));
        return retrievedUser;
    }


    @Transactional
    public User save(User user) {
        LocalDate dateToday = LocalDate.now();
        user.setAge(calculateAge(user.getDateOfBirth(), dateToday));
        return userRepository.save(user);
    }

    @Transactional
    public User update(User user, Long id) throws Exception {
        if(!userRepository.existsById(id)) {
            throw new Exception("User not found.");
        }
        user.setId(id);
        User savedUser = userRepository.save(user);
        return savedUser;
    }

    @Transactional
    public FavoriteBook addFavoriteBook(Long userId, Long bookId, FavoriteBook favoriteBook) {
        User user = userRepository.getById(userId);
        Book book = bookService.findById(bookId);
        favoriteBook.setBook(book);
        favoriteBook.setUser(userRepository.getOne(userId));
        favoriteBookService.save(favoriteBook);
        List<FavoriteBook> favoriteBooks = user.getFavoriteBooks();
        favoriteBooks.add(favoriteBook);
        user.setFavoriteBooks(favoriteBooks);
        userRepository.save(user);
        return favoriteBook;
    }

    @Transactional
    public Book addOwnedBook(Long userId,Long bookId) {
        User user = userRepository.getOne(userId);
        Book book = bookService.findById(bookId);
        List<Book> ownedBookList = user.getOwnedBooks();
        ownedBookList.add(book);
        user.setOwnedBooks(ownedBookList);
        userRepository.save(user);
        return book;
    }

    @Transactional
    public Book addBookToWishlist(Long userId, Long bookId) {
        User user = userRepository.getOne(userId);
        Book book = bookService.findById(bookId);
        List<Book> userWishlist = user.getWishlist();
        userWishlist.add(book);
        user.setWishlist(userWishlist);
        userRepository.save(user);
        return book;
    }

    @Transactional
    public Book addBookReadToUser(Long userId, Long bookId) {
        User user = userRepository.getOne(userId);
        Book book = bookService.findById(bookId);
        List<Book> booksRead = user.getBooksRead();
        booksRead.add(book);
        user.setBooksRead(booksRead);
        userRepository.save(user);
        return book;
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public static int calculateAge(LocalDate dateOfBirth, LocalDate dateToday) {
        if ((dateOfBirth != null) && (dateToday != null)) {
            return Period.between(dateOfBirth, dateToday).getYears();
        } else {
            return 0;
        }
    }
}
