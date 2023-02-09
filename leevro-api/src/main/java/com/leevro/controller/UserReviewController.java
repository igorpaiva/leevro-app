package com.leevro.controller;

import com.leevro.model.Book;
import com.leevro.model.User;
import com.leevro.model.UserReview;
import com.leevro.service.BookService;
import com.leevro.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/userReviews")
public class UserReviewController {

    @Autowired
    UserService userService;
    @Autowired
    BookService bookService;

    //@TODO: finish controller after favoriteBook refactor
    @PostMapping("/book/{bookId}/user/{userId}")
    public ResponseEntity<UserReview> createUserReview(@RequestBody String reviewBody, @PathVariable Long bookId, @PathVariable Long userId) {
        UserReview userReview = new UserReview();
        User user = userService.findById(userId);
        Book book = bookService.findById(bookId);
        userReview.setReviewBody(reviewBody);
        userReview.setAuthorName(user.getName());
        return new ResponseEntity<UserReview>(userReview, HttpStatus.CREATED);
    }

}
