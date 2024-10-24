package com.planway.trabalhoInterdiciplinar.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Agencia extends User {

    @Column(name = "agencia_cnpj", unique = true, nullable = false)
    @Size(max = 14, min = 14)
    private String cnpj;

    public Agencia(String email, String password, String cnpj) {
        super(email, password);
        this.cnpj = cnpj;
    }
}
