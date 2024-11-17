package com.planway.trabalhoInterdiciplinar.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.planway.trabalhoInterdiciplinar.Entity.Vendas;

@Repository
public interface VendasRepository extends JpaRepository<Long, Vendas> {
}
