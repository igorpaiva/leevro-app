package com.leevro.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserDto{
    private Long id;
    private String name;
    private String nickname;
    private Integer age;
    private LocalDate dateOfBirth;
    private String password;
}
