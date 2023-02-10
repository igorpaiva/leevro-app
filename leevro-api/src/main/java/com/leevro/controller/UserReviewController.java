package com.leevro.controller;

import com.leevro.model.ReadBook;
import com.leevro.model.User;
import com.leevro.model.UserReview;
import com.leevro.service.BookService;
import com.leevro.service.ReadBookService;
import com.leevro.service.UserReviewService;
import com.leevro.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserReviewController {

    @Autowired
    UserReviewService userReviewService;

    @Autowired
    BookService bookService;

    @Autowired
    UserService userService;

    @Autowired
    ReadBookService readBookService;

    @PostMapping("/users/{userId}/userReviews/{bookId}")
    public ResponseEntity<UserReview> createReviewByUserIdAndBookId(
            @RequestBody String body, @PathVariable Long userId, @PathVariable Long bookId){
        User user = userService.findById(userId);
        List<ReadBook> readBooks = user.getReadBooks();
        ReadBook readBook = userReviewService.getReadBookToReviewByBookId(readBooks, bookId);
        UserReview userReview = userReviewService.saveUserReview(body);
        readBook.setUserReview(userReview);
        readBookService.save(readBook);
        return new ResponseEntity<UserReview>(userReview, HttpStatus.CREATED);
    }
}
