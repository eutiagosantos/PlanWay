package com.planway.trabalhoInterdiciplinar.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Vendas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double valor;

    private String emailUsuario;

    public Vendas() {

    }

    public Vendas(Long id, double valor, String emailUsuario) {
        this.id = id;
        this.valor = valor;
        this.emailUsuario = emailUsuario;

    }

}
