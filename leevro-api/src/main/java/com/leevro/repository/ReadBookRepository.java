package com.leevro.repository;

import com.leevro.model.Book;
import com.leevro.model.ReadBook;
import com.leevro.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReadBookRepository extends JpaRepository<ReadBook, Long> {

    public List<ReadBook> findReadBooksByUser(User user);

    public List<ReadBook> findReadBooksByIsFavoriteTrueAndUser(User user);

    public List<ReadBook> findReadBooksByIsWishedTrueAndUser(User user);

    public List<ReadBook>findReadBooksByIsOwnedTrueAndUser(User user);

    public ReadBook findReadBookByBookAndUser(User user, Book book);

}
