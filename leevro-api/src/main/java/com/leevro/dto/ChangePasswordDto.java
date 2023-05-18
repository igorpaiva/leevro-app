package com.leevro.dto;

import lombok.Data;

@Data
public class ChangePasswordDto {
    private String password;
    private String newPassword;
}
