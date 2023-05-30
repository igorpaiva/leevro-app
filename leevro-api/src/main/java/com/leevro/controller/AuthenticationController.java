package com.leevro.controller;

import com.leevro.dto.CurrentUserDto;
import com.leevro.dto.ResponseDto;
import com.leevro.util.SessionRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthenticationController {

    @Autowired
    public AuthenticationManager authenticationManager;
    @Autowired
    public SessionRegistry sessionRegistry;

    @PostMapping("/login")
    public ResponseEntity<ResponseDto> login(@RequestBody CurrentUserDto currentUserDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(currentUserDTO.getNickname(), currentUserDTO.getPassword())
        );
        final String sessionId = sessionRegistry.registerSession(currentUserDTO.getNickname());
        ResponseDto responseDTO = new ResponseDto();
        responseDTO.setSessionId(sessionId);

        return ResponseEntity.ok(responseDTO);
    }
}
