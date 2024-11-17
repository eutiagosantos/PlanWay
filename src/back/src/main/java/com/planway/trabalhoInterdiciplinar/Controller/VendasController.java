package com.planway.trabalhoInterdiciplinar.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.planway.trabalhoInterdiciplinar.Dto.VendasDto;
import com.planway.trabalhoInterdiciplinar.Entity.Vendas;
import com.planway.trabalhoInterdiciplinar.Service.VendasService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/vendas")
public class VendasController {

    @Autowired
    private VendasService vendasService;

    @PostMapping
    public ResponseEntity<Vendas> realizarVenda(@RequestBody VendasDto dto) {
        try {
            vendasService.realizarVenda(dto);
            return ResponseEntity.status(HttpStatus.CREATED).build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public VendasController() {
        // TODO Auto-generated method stub
    }
}
