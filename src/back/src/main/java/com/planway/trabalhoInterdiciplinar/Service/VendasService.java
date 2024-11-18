package com.planway.trabalhoInterdiciplinar.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.planway.trabalhoInterdiciplinar.Dto.VendasDto;
import com.planway.trabalhoInterdiciplinar.Entity.Vendas;
import com.planway.trabalhoInterdiciplinar.Repository.VendasRepository;

@Service
public class VendasService {

    @Autowired
    private VendasRepository vendasRepository;

    public Vendas realizarVenda(VendasDto dto) {
        try {
            Optional<Vendas> existingVenda = vendasRepository.findByEmailUsuario(dto.emailUsuario());

            if (existingVenda.isPresent()) {
                throw new RuntimeException("Usuário já cadastrado na excursão.");
            }

            var venda = new Vendas(
                    null,
                    dto.valor(),
                    dto.emailUsuario()
            );

            venda = vendasRepository.save(venda);
            return venda;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Erro ao realizar a venda", e);
        }
    }

}
