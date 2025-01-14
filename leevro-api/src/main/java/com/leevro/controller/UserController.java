package com.leevro.controller;

import com.leevro.dto.ReadBookDto;
import com.leevro.dto.UserDto;
import com.leevro.model.Book;
import com.leevro.model.ReadBook;
import com.leevro.model.User;
import com.leevro.model.UserReview;
import com.leevro.service.BookService;
import com.leevro.service.ReadBookService;
import com.leevro.service.UserReviewService;
import com.leevro.service.UserService;
import com.leevro.util.ModelMapperUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    ReadBookService readBookService;

    @Autowired
    UserReviewService userReviewService;

    @Autowired
    BookService bookService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) throws Exception {
        User user = userService.findById(id);
        if(user == null) {
            throw new Exception("User not found");
        }
        UserDto userDto = ModelMapperUtil.mapTo(user, UserDto.class);
        return new ResponseEntity<UserDto>(userDto, HttpStatus.OK);
    }

    @GetMapping("/{userId}/readBooks")
    public ResponseEntity<List<ReadBookDto>> getReadBooksByUserId(@PathVariable Long userId) {
        User user = userService.findById(userId);
        List<ReadBook> readBooks = user.getReadBooks();
        List<ReadBookDto> readBooksDto = new ArrayList<>();
        for(ReadBook readBook: readBooks) {
            readBooksDto.add(ModelMapperUtil.mapTo(readBook, ReadBookDto.class));
        }
        return new ResponseEntity<List<ReadBookDto>>(readBooksDto, HttpStatus.OK);
    }

    @GetMapping("/{userId}/favoriteBooks")
    public ResponseEntity<List<Book>> getFavoriteBooksByUser(@PathVariable Long userId) {
        User user = userService.findById(userId);
        List<Book> favoriteBooks = readBookService.getFavoriteBooksByUser(user);
        return new ResponseEntity<List<Book>>(favoriteBooks, HttpStatus.OK);
    }

    @GetMapping("/{userId}/ownedBooks")
    public ResponseEntity<List<Book>> getOwnedBooksByUser(@PathVariable Long userId) {
        User user = userService.findById(userId);
        List<Book> books = readBookService.getOwnedBooksByUser(user);
        return new ResponseEntity<List<Book>>(books, HttpStatus.OK);
    }

    @GetMapping("/{userId}/wishlist")
    public ResponseEntity<List<Book>> getWishlistByUser(@PathVariable Long userId) {
        User user = userService.findById(userId);
        List<Book> wishlist = readBookService.getWishedBooksByUser(user);
        return new ResponseEntity<List<Book>>(wishlist, HttpStatus.OK);
    }

    @GetMapping("/{userId}/userReviews")
    public ResponseEntity<List<UserReview>> getAllUserReviews(@PathVariable Long userId) {
        User user = userService.findById(userId);
        List<UserReview> userReviews = userReviewService.getAllUserReviewsByUser(user);
        return new ResponseEntity<List<UserReview>>(userReviews, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@RequestBody @Valid User user) throws Exception {
        userService.save(user);
        UserDto userDto = ModelMapperUtil.mapTo(user, UserDto.class);
        return new ResponseEntity<UserDto>(userDto, HttpStatus.CREATED);
    }

    @PatchMapping("/{userId}/readBooks/{bookId}")
    public ResponseEntity<ReadBook> addReadBookToUser(@PathVariable Long userId, @PathVariable Long bookId, @RequestBody ReadBook book){
        userService.addReadBook(userId, bookId, book);
        return new ResponseEntity<ReadBook>(HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody @Valid User user) throws Exception {
        userService.save(user);
        UserDto userDto = ModelMapperUtil.mapTo(user, UserDto.class);
        return new ResponseEntity<UserDto>(userDto, HttpStatus.CREATED);
    }

    @PostMapping("/{userId}/userReviews/{bookId}")
    public ResponseEntity<UserReview> createReviewByUserIdAndBookId(
            @RequestBody String body, @PathVariable Long userId, @PathVariable Long bookId){
        User user = userService.findById(userId);
        Book book = bookService.findById(bookId);
        List<ReadBook> readBooks = user.getReadBooks();
        ReadBook readBook = userReviewService.getReadBookToReviewByBookId(readBooks, bookId);
        UserReview userReview = userReviewService.saveUserReview(body);
        userReview.setBook(book);
        readBook.setUserReview(userReview);
        readBookService.save(readBook);
        return new ResponseEntity<UserReview>(userReview, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable Long id) {
        userService.deleteById(id);
    }

}
