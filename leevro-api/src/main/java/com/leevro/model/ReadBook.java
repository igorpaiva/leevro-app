package com.leevro.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_table")
    @JsonBackReference
    @ToString.Exclude
    private User user;
    @OneToOne
    private Book book;
}
