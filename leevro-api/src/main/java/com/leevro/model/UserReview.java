package com.leevro.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class UserReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String authorName;
    @OneToOne
    private Book reviewedBook;
    private String title;
    private String reviewBody;
    private Integer userRating; //book has already a "rating" variable, maybe this here is redundant
    private Integer upvotes;
    @OneToOne
    private User user;
}
