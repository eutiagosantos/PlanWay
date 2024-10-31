package com.planway.trabalhoInterdiciplinar.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.planway.trabalhoInterdiciplinar.Dto.RoteiroDto;
import com.planway.trabalhoInterdiciplinar.Entity.Roteiro;
import com.planway.trabalhoInterdiciplinar.Repository.RoteiroRepository;

@Service
public class RoteiroService {

    @Autowired
    private RoteiroRepository roteiroRepository;

    public Roteiro createRoteiro(RoteiroDto roteiroDto) {
        var roteiro = new Roteiro(
                generateRandomId(),
                roteiroDto.local(),
                roteiroDto.titulo(),
                roteiroDto.descricao(),
                roteiroDto.dataFim(),
                LocalDateTime.now()
        );

        if (roteiroRepository.findById(roteiro.getId()).isPresent()) {
            throw new RuntimeException("O roteiro ja existe");
        }

        return roteiroRepository.save(roteiro);
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
                roteiro.setLocal(roteiroDto.local());
            }

            if (roteiroDto.descricao() != null) {
                roteiro.setDescricao(roteiroDto.descricao());
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

    private long generateRandomId() {
        // Gera um número aleatório entre 1 e Long.MAX_VALUE
        return ThreadLocalRandom.current().nextLong(1, Long.MAX_VALUE);
    }

    public void deleteAllRoteiros() {
        roteiroRepository.deleteAll();
    }
}
