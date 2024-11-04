package com.planway.trabalhoInterdiciplinar.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.planway.trabalhoInterdiciplinar.Dto.RoteiroDto;
import com.planway.trabalhoInterdiciplinar.Entity.Agencia;
import com.planway.trabalhoInterdiciplinar.Entity.Roteiro;
import com.planway.trabalhoInterdiciplinar.Repository.AgenciaRepository;
import com.planway.trabalhoInterdiciplinar.Repository.RoteiroRepository;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;

@Service
public class RoteiroService {

    @Autowired
    private RoteiroRepository roteiroRepository;
    @Autowired
    private AgenciaRepository agenciaRepository;
    // @Autowired
    // private UserRepository userRepository;
    @Autowired
    private EntityManager entityManager;

    @Transactional
    public Roteiro createRoteiro(RoteiroDto roteiroDto, String usuarioCnpj) {

        Agencia usuario = agenciaRepository.findByCnpj(usuarioCnpj)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        var roteiro = new Roteiro(
                null,
                roteiroDto.titulo(),
                roteiroDto.dataFim(),
                usuario.getEmail(),
                usuario
        );

        usuario.getRoteiros().add(roteiro);
        roteiro = entityManager.merge(roteiro);

        return roteiro;
    }

    public List<Roteiro> listRoteiros() {

        List<Roteiro> roteiros = roteiroRepository.findAll();

        return roteiros.stream().distinct().collect(Collectors.toList());
    }

    public void updateRoteiro(Long roteiroId, RoteiroDto roteiroDto) {
        var roteiroExists = roteiroRepository.findById(roteiroId);

        if (roteiroExists.isPresent()) {
            var roteiro = roteiroExists.get();

            if (roteiroDto.titulo() != null) {
                roteiro.setTitulo(roteiroDto.titulo());
            }

            if (roteiroDto.local() != null) {
                // roteiro.setLocal(roteiroDto.local());
            }

            if (roteiroDto.descricao() != null) {
                // roteiro.setDescricao(roteiroDto.descricao());
            }

            if (roteiroDto.dataFim() != null) {
                roteiro.setDataFim(roteiroDto.dataFim());
            }

            roteiroRepository.save(roteiro);

        }
    }

    public void deleteRoteiro(Long roteiroId) {
        roteiroRepository.deleteById(roteiroId);
    }

    public Optional<Roteiro> findRoteiroById(Long roteiroId) {
        Optional<Roteiro> roteiro = roteiroRepository.findById(roteiroId);
        return roteiro;
    }

    private long generateRandomId() {
        // Gera um número aleatório entre 1 e Long.MAX_VALUE
        return ThreadLocalRandom.current().nextLong(1, Long.MAX_VALUE);
    }

    public void deleteAllRoteiros() {
        roteiroRepository.deleteAll();
    }
}
