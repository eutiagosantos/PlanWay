package com.planway.trabalhoInterdiciplinar.Service;

import java.util.Optional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.planway.trabalhoInterdiciplinar.Dto.UpdateUserDto;
import com.planway.trabalhoInterdiciplinar.Entity.Agencia;
import com.planway.trabalhoInterdiciplinar.Entity.User;
import com.planway.trabalhoInterdiciplinar.Entity.UsuarioComum;
import com.planway.trabalhoInterdiciplinar.Repository.AgenciaRepository;
import com.planway.trabalhoInterdiciplinar.Repository.UserComumRepository;
import com.planway.trabalhoInterdiciplinar.util.CnpjValidator;
import com.planway.trabalhoInterdiciplinar.util.CpfValidator;

@Service
public class UserService {

    private UserComumRepository userRepository;
    private AgenciaRepository agenciaRepository;

    public UserService(AgenciaRepository agenciaRepository, UserComumRepository userRepository) {
        this.agenciaRepository = agenciaRepository;
        this.userRepository = userRepository;
    }

    public boolean validarCpf(UsuarioComum usuarioComum) {

        return CpfValidator.isValid(usuarioComum.getCpf());
    }

    public boolean validarCnpj(Agencia agencia) {

        return CnpjValidator.isValid(agencia.getCnpj());
    }

    public String identificarDocumento(String documento) {
        if (documento == null || documento.isEmpty()) {
            throw new IllegalArgumentException("Documento não pode ser nulo ou vazio.");
        }

        if (documento.length() == 11) {
            return "CPF"; // 11 dígitos corresponde ao CPF
        } else if (documento.length() == 14) {
            return "CNPJ"; // 14 dígitos corresponde ao CNPJ
        } else {
            throw new IllegalArgumentException("Documento inválido. CPF deve ter 11 dígitos e CNPJ deve ter 14 dígitos.");
        }
    }

    public Object createUser(String email, String senha, String documento) {
        String tipoDocumento = identificarDocumento(documento);

        if ("CPF".equals(tipoDocumento)) {
            return cadastrarUsuarioComum(email, senha, documento);
        } else if ("CNPJ".equals(tipoDocumento) && documento.length() == 14) {
            return cadastrarAgencia(email, senha, documento);
        }

        throw new IllegalArgumentException("Documento inválido.");
    }

    private UsuarioComum cadastrarUsuarioComum(String email, String senha, String cpf) {
        UsuarioComum usuarioComum = new UsuarioComum(email, senha, cpf);
        return userRepository.save(usuarioComum);
    }

    private Agencia cadastrarAgencia(String email, String senha, String cnpj) {
        Agencia agencia = new Agencia(email, senha, cnpj);
        return agenciaRepository.save(agencia);
    }

    public Optional<UsuarioComum> findUserByCpf(String cpf) {
        return userRepository.findByCpf(cpf);
    }

    public Optional<Agencia> findUserByCnpj(String cnpj) {
        return agenciaRepository.findByCnpj(cnpj);
    }

    public List<User> listUsers() {
        // Obtemos todos os usuários comuns
        List<UsuarioComum> usuariosComuns = userRepository.findAll();

        // Obtemos todas as agências
        List<Agencia> agencias = agenciaRepository.findAll();

        // Juntamos as listas em uma lista de User
        List<User> allUsers = new ArrayList<>();
        allUsers.addAll(usuariosComuns); // Adiciona usuários comuns
        allUsers.addAll(agencias); // Adiciona agências

        return allUsers.stream()
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

    public void updateAgencia(String cnpj, UpdateUserDto userDto) {
        var agenciaExists = agenciaRepository.findByCnpj(cnpj);

        if (agenciaExists.isPresent()) {
            var agencia = agenciaExists.get();

            if (userDto.email() != null) {
                agencia.setEmail(userDto.email());
            }

            if (userDto.password() != null) {
                agencia.setPassword(userDto.password());
            }
            agenciaRepository.save(agencia);
        }
    }

    public void deleteUser(String cpf) {
        userRepository.deleteByCpf(cpf);
    }

    public void deleteAgencia(String cnpj) {
        agenciaRepository.deleteByCnpj(cnpj);
    }

    public boolean authenticate(String email, String cpfCnpj, String password) {
        Optional<UsuarioComum> optionalUserComum = userRepository.findByEmail(email);
        Optional<Agencia> optionalAgencia = agenciaRepository.findByEmail(email);

        if (optionalUserComum.isPresent()) {
            UsuarioComum user = optionalUserComum.get();
            return user.getPassword().equals(password);
        }

        if (optionalAgencia.isPresent()) {
            Agencia agencia = optionalAgencia.get();
            return agencia.getPassword().equals(password);
        }

        return false;
    }
}
