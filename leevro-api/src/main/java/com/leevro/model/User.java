package com.leevro.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
    @NotNull(message = "Nickname field must not be null.")
    @NotBlank(message = "Nickname field must not be blank.")
    @NotEmpty(message = "Nickname field must not be empty.")
    @Size(max = 32, message = "Nickname field must have a maximum of 32 characters.")
    private String nickname;
    @NotNull(message = "Name field must not be null.")
    @NotBlank(message = "Name field must not be blank.")
    @NotEmpty(message = "Name field must not be empty.")
    @Size(max = 64, message = "Nickname field must have a maximum of 64 characters.")
    private String name;
    private Integer age;
    private LocalDate dateOfBirth;
    @OneToMany(fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<ReadBook> readBooks;
    @NotNull(message = "Password must not be null.")
    private String password;
    @Enumerated(EnumType.STRING)
    private UserRole role;
}
