package com.leevro.dto;

import com.leevro.model.Book;
import lombok.Data;

import java.time.LocalDate;

@Data
public class FavoriteBookDto{
    private Long id;
    private LocalDate startReadingDate;
    private LocalDate finishReadingDate;
    private Float userRating;
    private BookDtoIdOnly book;
}
