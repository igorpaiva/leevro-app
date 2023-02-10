package com.leevro.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class UserReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String reviewTitle;
    private String reviewBody;
    private Integer reviewUpvotes;
    @OneToOne
    private Book book;
}
