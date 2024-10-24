package com.planway.trabalhoInterdiciplinar.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class UsuarioComum extends User {

    @Column(name = "usuario_cpf", unique = true, nullable = false)
    private String cpf;

    public UsuarioComum(String email, String password, String cpf) {
        super(email, password);
        this.cpf = cpf;
    }
}
