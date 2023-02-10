package com.leevro.dto;

import com.leevro.model.Book;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ReadBookDto {
    private Long id;
    private LocalDate startReadingDate;
    private LocalDate finishReadingDate;
    private Float userRating;
    private Book book;
}
