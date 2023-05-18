package com.leevro.controller;

import com.leevro.dto.ChangePasswordDto;
import com.leevro.dto.UserDto;
import com.leevro.dto.UserDtoNicknameOnly;
import com.leevro.model.User;
import com.leevro.service.UserService;
import com.leevro.util.ModelMapperUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class HomeController {

    @Autowired
    UserService userService;

    @GetMapping("/")
    public String home() {
        return "Hello, Home!";
    }

    @GetMapping("/secured")
    public String secured() {
        return "Hello, Secured!";
    }

    @PostMapping("/registration")
    public ResponseEntity<UserDtoNicknameOnly> createUser(@RequestBody @Valid UserDto userDto) throws Exception{
        User user = userService.save(ModelMapperUtil.mapTo(userDto, User.class));
        UserDtoNicknameOnly userNickname = ModelMapperUtil.mapTo(user, UserDtoNicknameOnly.class);
        return new ResponseEntity<>(userNickname, HttpStatus.CREATED);
    }

    @PostMapping("/change-password")
    public ResponseEntity<Object> changePassword(@RequestBody ChangePasswordDto changePasswordDto) throws Exception {
        this.userService.changePassword(changePasswordDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
