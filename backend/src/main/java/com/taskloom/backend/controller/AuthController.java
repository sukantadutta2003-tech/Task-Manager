package com.taskloom.backend.controller;

import com.taskloom.backend.dto.AuthResponse;
import com.taskloom.backend.service.AuthService;
import com.taskloom.backend.dto.AuthRequest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody AuthRequest request) {
        authService.register(request);
        return "Registered";
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        String email = authService.login(request);
        return new AuthResponse(null, email); // token later (JWT)
    }

}
