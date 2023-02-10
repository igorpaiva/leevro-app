package com.leevro.dto;

import com.leevro.model.Book;
import com.leevro.model.UserReview;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ReadBookDto {
    private Long id;
    private LocalDate startReadingDate;
    private LocalDate finishReadingDate;
    private Float userRating;
    private Boolean isFavorite;
    private Boolean isWished;
    private Boolean isOwned;
    private UserReview userReview;
    private Book book;
    private UserDtoIdOnly user;
}
