package com.planway.trabalhoInterdiciplinar.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.planway.trabalhoInterdiciplinar.Dto.RoteiroDto;
import com.planway.trabalhoInterdiciplinar.Entity.Roteiro;
import com.planway.trabalhoInterdiciplinar.Service.RoteiroService;

@RestController
@RequestMapping("/api/roteiro")
public class RoteiroController {

    @Autowired
    private RoteiroService roteiroService;

    @PostMapping("/criarRoteiro/{cnpj}")
    public ResponseEntity<Object> criarRoteiro(@RequestBody RoteiroDto roteiroDto, @PathVariable String cnpj) {

        try {
            Roteiro roteiro = roteiroService.createRoteiro(roteiroDto, cnpj);
            return ResponseEntity.ok(roteiro);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/listRoteiros")
    public ResponseEntity<List<Roteiro>> listAllRoteiros() {
        List<Roteiro> roteiros = roteiroService.listRoteiros();

        return ResponseEntity.ok(roteiros);
    }

    @PutMapping("/updateRoteiro")
    public void updateRoteiro(@PathVariable Long id, @RequestBody RoteiroDto roteirodto) {
        roteiroService.updateRoteiro(id, roteirodto);
        ResponseEntity.noContent().build();
    }

    @DeleteMapping("/deleteRoteiro/{id}")
    public ResponseEntity<Void> deleteRoteiro(@PathVariable Long id) {

        roteiroService.deleteRoteiro(id);
        return ResponseEntity.noContent().build();
    }
}
