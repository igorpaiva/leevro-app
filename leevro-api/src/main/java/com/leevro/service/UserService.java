package com.leevro.service;

import com.leevro.dto.ChangePasswordDto;
import com.leevro.model.Book;
import com.leevro.model.ReadBook;
import com.leevro.model.User;
import com.leevro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Service
public class UserService {

    private final int PASSWORD_MIN_SIZE = 8;

    private final int PASSWORD_MAX_SIZE = 80;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BookService bookService;

    @Autowired
    ReadBookService readBookService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User findById(Long id) {
        User retrievedUser = userRepository.findById(id).orElse(null);
        retrievedUser.setReadBooks(readBookService.getReadBooksByUser(retrievedUser));
        return retrievedUser;
    }


    @Transactional
    public User save(User user) throws Exception {
        validateNickname(user.getNickname());
        validatePassword(user);
        LocalDate dateToday = LocalDate.now();
        user.setAge(calculateAge(user.getDateOfBirth(), dateToday));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Transactional
    public User update(User user, Long id) throws Exception {
        if(!userRepository.existsById(id)) {
            throw new Exception("User not found.");
        }
        user.setId(id);
        validatePassword(user);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
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



    private void validateNickname(String nickname) throws Exception{
        List<User> allUsers = userRepository.findAll();

        for(User user: allUsers) {
            if(nickname.equals(user.getNickname())) {
                throw new Exception("Nickname is already taken.");
            }
        }
    }

    private void validatePassword(User user) throws Exception {
        if(user.getPassword().length() < this.PASSWORD_MIN_SIZE) {
            throw new Exception("Password must be at least 8 characters.");
        } else if (user.getPassword().length() > this.PASSWORD_MAX_SIZE) {
            throw new Exception("Password length must be under 80 characters.");
        }
    }

    public void changePassword(ChangePasswordDto changePassword) throws Exception {
        List<User> users = this.userRepository.findAll();
        for (User user: users) {
            if (passwordEncoder.matches(changePassword.getPassword(), user.getPassword())) {
                user.setPassword(changePassword.getNewPassword());
                this.update(user, user.getId());
            } else {
                throw new Exception("Invalid password");
            }
        }
    }
}
