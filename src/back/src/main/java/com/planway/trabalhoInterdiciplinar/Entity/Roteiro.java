package com.planway.trabalhoInterdiciplinar.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "roteiro")
@Getter
@Setter
public class Roteiro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private String dataFim;

    private String agenciaEmail;

    // @ManyToOne
    // @JoinColumn(name = "agencia_cnpj")
    // private Agencia agencia;
    public Roteiro() {
    }

    public Roteiro(Long id, String titulo, String dataFim, String agenciaEmail) {
        this.id = id;
        // this.local = local;
        this.titulo = titulo;
        // this.descricao = descricao;
        this.dataFim = dataFim;
        // this.dataInicio = dataInicio;
        this.agenciaEmail = agenciaEmail;
    }

}
