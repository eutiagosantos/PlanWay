package com.planway.trabalhoInterdiciplinar.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.planway.trabalhoInterdiciplinar.Dto.VendasDto;
import com.planway.trabalhoInterdiciplinar.Entity.Vendas;
import com.planway.trabalhoInterdiciplinar.Entity.Excursao;
import com.planway.trabalhoInterdiciplinar.Repository.VendasRepository;
import com.planway.trabalhoInterdiciplinar.Repository.ExcursaoRepository;

@Service
public class VendasService {

    @Autowired
    private VendasRepository vendasRepository;

    @Autowired
    private ExcursaoRepository excursaoRepository;

    public Vendas realizarVenda(VendasDto dto) {
        try {
            Optional<Vendas> existingVenda = vendasRepository.findByEmailUsuario(dto.emailUsuario());

            if (existingVenda.isPresent()) {
                throw new RuntimeException("Usuário já cadastrado na excursão.");
            }

            Optional<Excursao> excursao = excursaoRepository.findById(dto.excursaoId());

            if (!excursao.isPresent()) {
                throw new RuntimeException("Excursão não encontrada.");
            }

            if (excursao.get().getParticipantes().size() >= excursao.get().getQuantidadePessoas()) {
                throw new RuntimeException("Não é possível adicionar mais participantes. Limite atingido.");
            }

            var venda = new Vendas(
                    null,
                    dto.valor(),
                    dto.emailUsuario(),
                    dto.nomeExcursao(),
                    dto.excursaoId()
            );

            venda = vendasRepository.save(venda);
            excursaoRepository.save(excursao.get());

            return venda;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Erro ao realizar a venda", e);
        }
    }

    public Optional<Vendas> listarVendaUsuario(String emailUsuario) {
        return vendasRepository.findByEmailUsuario(emailUsuario);
    }

    public void deleteVenda(String email) {
        Optional<Vendas> venda = vendasRepository.findByEmailUsuario(email);
        if (venda.isPresent()) {
            vendasRepository.delete(venda.get());
        } else {
            throw new RuntimeException("Venda não encontrada para o usuário com email: " + email);
        }
    }
}
