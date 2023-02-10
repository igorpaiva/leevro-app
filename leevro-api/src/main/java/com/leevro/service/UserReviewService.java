package com.leevro.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.leevro.model.ReadBook;
import com.leevro.model.User;
import com.leevro.model.UserReview;
import com.leevro.repository.UserReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserReviewService {

    private static final Gson GSON = new GsonBuilder().create();

    @Autowired
    UserReviewRepository userReviewRepository;

    @Autowired
    ReadBookService readBookService;

    public List<UserReview> getAllUserReviewsByUser(User user){
        List<UserReview> userReviews = new ArrayList<>();
        List<ReadBook> readBooks = readBookService.getReadBooksByUser(user);
        for(ReadBook readBook: readBooks) {
            userReviews.add(readBook.getUserReview());
        }
        return userReviews;
    }

    public UserReview saveUserReview(String userReviewBody) {
        UserReview userReview = new UserReview();
        JsonObject userReviewJson = JsonParser.parseString(userReviewBody).getAsJsonObject();
        userReview.setReviewTitle(userReviewJson.get("reviewTitle").getAsString());
        userReview.setReviewBody(userReviewJson.get("reviewBody").getAsString());
        userReview.setReviewUpvotes(userReviewJson.get("reviewUpvotes").getAsInt());
        return userReviewRepository.save(userReview);
    }

    public ReadBook getReadBookToReviewByBookId(List<ReadBook> readBooks, Long bookId) {
        for(ReadBook readBook: readBooks) {
            if (readBook.getBook().getId().equals(bookId)) {
                return readBook;
            }
        }
        return null;
    }
}
