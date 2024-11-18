package com.planway.trabalhoInterdiciplinar.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.planway.trabalhoInterdiciplinar.Dto.VendasDto;
import com.planway.trabalhoInterdiciplinar.Service.VendasService;

@RestController
@RequestMapping("/api/vendas")
public class VendasController {

    @Autowired
    private VendasService vendasService;

    @PostMapping("/cadastro")
    public ResponseEntity<?> realizarVenda(@RequestBody VendasDto dto) {
        var vendas = vendasService.realizarVenda(dto);
        return ResponseEntity.ok(vendas);

    }

    public VendasController() {
        // TODO Auto-generated method stub
    }
}
