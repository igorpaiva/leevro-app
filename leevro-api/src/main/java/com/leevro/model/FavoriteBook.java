package com.leevro.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class FavoriteBook{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate startReadingDate;
    private LocalDate finishReadingDate;
    private Float userRating;
    @ManyToOne
    @JoinColumn(name = "user_table")
    private User user;
    @OneToOne
    private Book book;
}
