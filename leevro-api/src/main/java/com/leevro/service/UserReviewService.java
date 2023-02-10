package com.leevro.service;

import com.leevro.model.ReadBook;
import com.leevro.model.UserReview;
import com.leevro.repository.UserReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.google.gson.*;

import java.util.List;

@Service
public class UserReviewService {

    private static final Gson GSON = new GsonBuilder().create();

    @Autowired
    UserReviewRepository userReviewRepository;

    public UserReview saveUserReview(String userReviewBody) {
        UserReview userReview = new UserReview();
        JsonObject userReviewJson = JsonParser.parseString(GSON.toJson(userReviewBody)).getAsJsonObject();
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
