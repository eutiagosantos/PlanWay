package com.planway.trabalhoInterdiciplinar.Repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.planway.trabalhoInterdiciplinar.Entity.Agencia;

public interface AgenciaRepository extends JpaRepository<Agencia, String> {

    Optional<Agencia> findByCnpj(String cnpj);

    Optional<Agencia> findByEmail(String email);
}
