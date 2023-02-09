package com.leevro.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "user_table")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Integer age;
    private LocalDate dateOfBirth;
    @OneToMany(fetch = FetchType.EAGER)
    private List<FavoriteBook> favoriteBooks;
    @OneToMany
    private List<UserReview> userReviews;
    @OneToMany
    private List<Book> wishlist;
    @OneToMany
    private List<Book> ownedBooks; //maybe redundant. Favorite book could have a boolean property called "owned"
    @OneToMany
    private List<Book> readBooks;

}
