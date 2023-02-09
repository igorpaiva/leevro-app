package com.leevro.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String nationality;
    private Integer age;
    private LocalDate dateOfBirth;
    private String biography;
    @OneToMany
    private List<Book> books;
}
