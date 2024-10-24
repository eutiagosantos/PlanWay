package com.planway.trabalhoInterdiciplinar.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User {

    @Column(name = "user_email", unique = true, nullable = false)
    @Size(min = 8, max = 254)
    private String email;

    @Column(name = "user_senha", nullable = false)
    @Size(min = 3, max = 20)
    private String password;

    public User() {

    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

}
