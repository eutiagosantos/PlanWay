package com.planway.trabalhoInterdiciplinar.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.planway.trabalhoInterdiciplinar.Dto.UserDto;
import com.planway.trabalhoInterdiciplinar.Dto.LoginRequest;
import com.planway.trabalhoInterdiciplinar.Service.UserService;

import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/usuarios")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<Object> criarUsuario(@RequestBody UserDto userDto) {
        try {
            Object usuario = userService.createUser(userDto.email(), userDto.password(), userDto.documento());
            return ResponseEntity.ok(usuario);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        boolean isAuthenticated = userService.authenticate(loginRequest.email(), loginRequest.password());

        if (isAuthenticated) {
            return ResponseEntity.ok("Login bem sucedido");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
        }
    }

}
