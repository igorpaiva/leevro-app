package com.leevro.controller;

import com.leevro.dto.FavoriteBookDto;
import com.leevro.dto.UserDto;
import com.leevro.model.Book;
import com.leevro.model.FavoriteBook;
import com.leevro.model.User;
import com.leevro.service.FavoriteBookService;
import com.leevro.service.UserService;
import com.leevro.util.ModelMapperUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    FavoriteBookService favoriteBookService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        User user = userService.findById(id);
        UserDto userDto = ModelMapperUtil.mapTo(user, UserDto.class);
        return new ResponseEntity<UserDto>(userDto, HttpStatus.OK);
    }

    @GetMapping("/{userId}/favoriteBooks")
    public ResponseEntity<List<FavoriteBookDto>> getFavoriteBooksByUser(@PathVariable Long userId) {
        User user = userService.findById(userId);
        List<FavoriteBook> favoriteBooks = favoriteBookService.getFavoriteBooksByUser(user);
        List<FavoriteBookDto> favoriteBooksDto = new ArrayList<>();
        for (FavoriteBook favoriteBook: favoriteBooks) {
            FavoriteBookDto favoriteBookDto = ModelMapperUtil.mapTo(favoriteBook, FavoriteBookDto.class);
            favoriteBooksDto.add(favoriteBookDto);
        }
        return new ResponseEntity<List<FavoriteBookDto>>(favoriteBooksDto, HttpStatus.OK);
    }


    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@RequestBody @Valid User user) {
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
    public ResponseEntity<UserDto> createUser(@RequestBody @Valid User user) {
        userService.save(user);
        UserDto userDto = ModelMapperUtil.mapTo(user, UserDto.class);
        return new ResponseEntity<UserDto>(userDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable Long id) {
        userService.deleteById(id);
    }

}
