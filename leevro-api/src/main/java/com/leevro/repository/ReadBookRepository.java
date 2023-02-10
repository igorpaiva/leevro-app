package com.leevro.repository;

import com.leevro.model.Book;
import com.leevro.model.ReadBook;
import com.leevro.model.User;
import com.leevro.model.UserReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReadBookRepository extends JpaRepository<ReadBook, Long> {

    List<ReadBook> findReadBooksByUser(User user);

    List<ReadBook> findReadBooksByIsFavoriteTrueAndUser(User user);

    List<ReadBook> findReadBooksByIsWishedTrueAndUser(User user);

    List<ReadBook>findReadBooksByIsOwnedTrueAndUser(User user);

    ReadBook findReadBookByBookAndUser(User user, Book book);
}
