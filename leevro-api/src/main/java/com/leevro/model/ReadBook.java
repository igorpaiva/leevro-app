package com.leevro.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Entity
@Data
public class ReadBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate startReadingDate;
    private LocalDate finishReadingDate;
    private Float userRating;
    private Boolean isFavorite;
    private Boolean isWished;
    private Boolean isOwned;
    @OneToOne
    private UserReview userReview;
    @ManyToOne
    @JoinColumn(name = "user_table")
    private User user;
    @OneToOne
    private Book book;
}
