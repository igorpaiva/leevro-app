package com.leevro.service;

import com.leevro.model.CurrentUser;
import com.leevro.model.User;
import com.leevro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CurrentUserService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;


    @Override
    public CurrentUser loadUserByUsername(String username) throws UsernameNotFoundException {

        final User user = userRepository.findByNickname(username);
        if (user != null) {
            CurrentUser currentUser = new CurrentUser();
            currentUser.setUsername(user.getNickname());
            currentUser.setPassword(user.getPassword());

            return currentUser;
        }
        throw new UsernameNotFoundException("Failed to find user with username: " + username);
    }

}

