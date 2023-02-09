package com.leevro.dto;

import com.leevro.model.Book;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class UserDto{
    private Long id;
    private String name;
    private Integer age;
    private LocalDate dateOfBirth;
    private List<FavoriteBookDtoIdOnly> favoriteBooks;
    private List<BookDtoIdOnly> ownedBooks;
    private List<BookDtoIdOnly> booksRead;
    private List<BookDtoIdOnly> wishlist;
}
