package com.planway.trabalhoInterdiciplinar.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.planway.trabalhoInterdiciplinar.Dto.VendasDto;
import com.planway.trabalhoInterdiciplinar.Entity.Vendas;
import com.planway.trabalhoInterdiciplinar.Repository.VendasRepository;

import jakarta.persistence.EntityManager;

@Service
public class VendasService {

    @Autowired
    private VendasRepository vendasRepository;

    @Autowired
    private EntityManager entityManager;

    public Vendas realizarVenda(VendasDto dto) {
        var venda = new Vendas(
                null,
                dto.valor(),
                dto.emailUsuario(),
                dto.emailAgencia()
        );

        venda = entityManager.merge(venda);
        return venda;
    }

}
