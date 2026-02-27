package com.taskloom.backend.service;

import com.taskloom.backend.entity.User;
import com.taskloom.backend.repository.UserRepository;
import com.taskloom.backend.dto.AuthRequest;

import com.taskloom.backend.exception.UserAlreadyExistsException;
import com.taskloom.backend.exception.UserNotFoundException;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;

    public void register(AuthRequest request) {
        if (userRepo.findByEmail(request.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("Email already registered");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));

        userRepo.save(user);
    }

    public boolean login(AuthRequest request) {
        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        return encoder.matches(request.getPassword(), user.getPassword());
    }
}
