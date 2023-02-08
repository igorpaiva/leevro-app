package com.leevro.service;

import com.leevro.model.Book;
import com.leevro.model.FavoriteBook;
import com.leevro.model.User;
import com.leevro.repository.FavoriteBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteBookService {

    @Autowired
    FavoriteBookRepository favoriteBookRepository;

    public FavoriteBook save(FavoriteBook favoriteBook) {
        return favoriteBookRepository.save(favoriteBook);
    }

    public List<FavoriteBook> getFavoriteBooksByUser(User user) {
        return favoriteBookRepository.findFavoriteBooksByUser(user);
    }
}
