package com.planway.trabalhoInterdiciplinar.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.planway.trabalhoInterdiciplinar.Dto.UserDto;

import com.planway.trabalhoInterdiciplinar.Service.UserService;

import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/usuarios")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("criar")
    public ResponseEntity<Object> criarUsuario(@RequestBody UserDto userDto) {
        try {
            Object usuario = userService.createUser(userDto.email(), userDto.password(), userDto.documento());
            return ResponseEntity.ok(usuario); // Retorna o usuário criado
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // Retorna mensagem de erro
        }
    }

}
