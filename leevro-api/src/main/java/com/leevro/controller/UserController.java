package com.leevro.controller;

import com.leevro.dto.UserDto;
import com.leevro.model.Book;
import com.leevro.model.FavoriteBook;
import com.leevro.model.User;
import com.leevro.service.UserService;
import com.leevro.util.ModelMapperUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> findById(@PathVariable Long id) {
        User user = userService.findById(id);
        UserDto userDto = ModelMapperUtil.mapTo(user, UserDto.class);
        return new ResponseEntity<UserDto>(userDto, HttpStatus.OK);
    }


    @PutMapping("/{id}")
    public ResponseEntity<UserDto> update(@RequestBody @Valid User user) {
        userService.save(user);
        UserDto userDto = ModelMapperUtil.mapTo(user, UserDto.class);
        return new ResponseEntity<UserDto>(userDto, HttpStatus.CREATED);
    }

    @PatchMapping("/{userId}/favoriteBooks/{bookId}")
    public ResponseEntity<FavoriteBook> addFavoriteBookToUser(@PathVariable Long userId, @PathVariable Long bookId, @RequestBody FavoriteBook book){
        userService.addFavoriteBook(userId, bookId, book);
        return new ResponseEntity<FavoriteBook>(HttpStatus.OK);
    }

    @PatchMapping("/{userId}/ownedBooks/{bookId}")
    public ResponseEntity<Book> addOwnedBookToUser(@PathVariable Long userId, @PathVariable Long bookId){
        userService.addOwnedBook(userId, bookId);
        return new ResponseEntity<Book>(HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<UserDto> save(@RequestBody @Valid User user) {
        userService.save(user);
        UserDto userDto = ModelMapperUtil.mapTo(user, UserDto.class);
        return new ResponseEntity<UserDto>(userDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        userService.deleteById(id);
    }

}
