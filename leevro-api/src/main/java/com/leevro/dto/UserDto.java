package com.leevro.dto;

import com.leevro.model.ReadBook;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class UserDto{
    private Long id;
    private String name;
    private Integer age;
    private LocalDate dateOfBirth;
    private List<ReadBook> readBooks;
}
