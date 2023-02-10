package com.leevro.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class UserReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 64, message = "Review title field is limited to 64 characters.")
    private String reviewTitle;
    @Size(max = 2048, message = "The review must have less than 2048 characters.")
    private String reviewBody;
    private Integer reviewUpvotes;
    @OneToOne
    private Book book;
}
