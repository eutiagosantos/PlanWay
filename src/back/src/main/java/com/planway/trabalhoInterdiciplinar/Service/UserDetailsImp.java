package com.planway.trabalhoInterdiciplinar.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.planway.trabalhoInterdiciplinar.Entity.UsuarioComum;
import com.planway.trabalhoInterdiciplinar.Entity.Agencia;
import com.planway.trabalhoInterdiciplinar.Repository.AgenciaRepository;
import com.planway.trabalhoInterdiciplinar.Repository.UserComumRepository;
import com.planway.trabalhoInterdiciplinar.Security.UserSpringSecurity;

@Service
public class UserDetailsImp implements UserDetailsService {

    @Autowired
    private UserComumRepository userRepository;
    @Autowired
    private AgenciaRepository agenciaRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UsuarioComum> user = this.userRepository.findByEmail(username);
        Optional<Agencia> agencia = this.agenciaRepository.findByEmail(username);

        if (agencia.isEmpty() && user.isEmpty()) {
            throw new UsernameNotFoundException("Usuario não encontrado");
        }

        if (user.isPresent()) {
            UsuarioComum usuarioComum = user.get();
            List<String> roles = List.of("ROLE_USER");
            return new UserSpringSecurity(usuarioComum.getEmail(), usuarioComum.getId(),
                    usuarioComum.getPassword(), "USUARIO", roles);
        }

        if (agencia.isPresent()) {
            Agencia agenciaEncontrada = agencia.get();
            List<String> roles = List.of("ROLE_AGENCIA");
            return new UserSpringSecurity(agenciaEncontrada.getEmail(), agenciaEncontrada.getId(),
                    agenciaEncontrada.getPassword(), "AGENCIA", roles);
        }

        throw new UsernameNotFoundException("Usuário não encontrado");
    }

}
