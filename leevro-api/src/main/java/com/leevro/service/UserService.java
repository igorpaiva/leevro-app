package com.leevro.service;

import com.leevro.model.Book;
import com.leevro.model.ReadBook;
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
    ReadBookService readBookService;

    public User findById(Long id) {
        User retrievedUser = userRepository.findById(id).orElse(null);
        retrievedUser.setReadBooks(readBookService.getReadBooksByUser(retrievedUser));
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
    public ReadBook addReadBook(Long userId, Long bookId, ReadBook readBook) {
        User user = userRepository.getById(userId);
        Book book = bookService.findById(bookId);
        readBook.setBook(book);
        readBook.setUser(userRepository.getOne(userId));
        readBookService.save(readBook);
        List<ReadBook> readBooks = user.getReadBooks();
        readBooks.add(readBook);
        user.setReadBooks(readBooks);
        userRepository.save(user);
        return readBook;
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
