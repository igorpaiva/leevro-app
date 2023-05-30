package com.leevro.util;

import com.leevro.model.CurrentUser;
import com.leevro.service.CurrentUserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SessionFilter extends OncePerRequestFilter {
    private final SessionRegistry sessionRegistry;
    private final CurrentUserService currentUserService;

    @Autowired
    public SessionFilter(final SessionRegistry sessionRegistry,
                         final CurrentUserService currentUserService) {
        this.sessionRegistry = sessionRegistry;
        this.currentUserService = currentUserService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        final String requestPath = request.getRequestURI();
        final String sessionId = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (!requestPath.equals("/api/login") && (sessionId == null || sessionId.length() == 0)) {
            filterChain.doFilter(request, response);
        }

        final String username = sessionRegistry.getUsernameForSession(sessionId);

        if (username == null) {
            filterChain.doFilter(request, response);
            return;
        }

        final CurrentUser currentUser = currentUserService.loadUserByUsername(username);

        final UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                currentUser,
                null,
                currentUser.getAuthorities()
        );

        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(auth);
        filterChain.doFilter(request, response);
    }
}

