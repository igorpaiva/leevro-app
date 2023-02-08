package com.leevro.repository;

import com.leevro.model.FavoriteBook;
import com.leevro.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteBookRepository extends JpaRepository<FavoriteBook, Long> {

    public List<FavoriteBook> findFavoriteBooksByUser(User user);

}
