package com.leevro.dto;

import com.leevro.model.Book;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
public class UserReviewDto {

    private Long id;
    private BookDtoIdOnly reviewedBook;
    private String title;
    private String reviewBody;
    private Integer userRating;
}
