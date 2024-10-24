package com.planway.trabalhoInterdiciplinar.Service;

import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.planway.trabalhoInterdiciplinar.Dto.UpdateUserDto;
import com.planway.trabalhoInterdiciplinar.Entity.Agencia;
import com.planway.trabalhoInterdiciplinar.Entity.User;
import com.planway.trabalhoInterdiciplinar.Entity.UsuarioComum;
import com.planway.trabalhoInterdiciplinar.Repository.UserComumRepository;
import com.planway.trabalhoInterdiciplinar.util.CnpjValidator;
import com.planway.trabalhoInterdiciplinar.util.CpfValidator;

@Service
public class UserService {

    private UserComumRepository userRepository;

    @Autowired
    public UserService(UserComumRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean validarCpf(UsuarioComum user) {

        return CpfValidator.isValid(user.getCpf());
    }

    public boolean validarCnpj(Agencia agencia) {

        return CnpjValidator.isValid(agencia.getCnpj());
    }

    public User createUser(String email, String senha, String documento) {
        User usuario;
        if (documento.length() == 11) {
            usuario = new UsuarioComum(email, senha, documento);
        } else if (documento.length() == 14) {
            usuario = new Agencia(email, senha, documento);
        } else {
            throw new IllegalArgumentException("Documento inválido. CPF deve ter 11 dígitos e CNPJ deve ter 14 dígitos.");
        }

        return userRepository.save(usuario);
    }

    public Optional<UsuarioComum> findUserByCpf(String cpf) {

        return userRepository.findByCpf(cpf);

    }

    public List<User> listUsers() {
        List<User> users = userRepository.findAll();

        return users.stream()
                .distinct()
                .collect(Collectors.toList());
    }

    public void updateUser(String cpf, UpdateUserDto userDto) {
        var userExists = userRepository.findByCpf(cpf);

        if (userExists.isPresent()) {
            var user = userExists.get();

            if (userDto.email() != null) {
                user.setEmail(userDto.email());
            }

            if (userDto.password() != null) {
                user.setPassword(userDto.password());
            }
            userRepository.save(user);
        }
    }

    public void deleteUser(String cpf) {
        userRepository.deleteByCpf(cpf);
    }

}
