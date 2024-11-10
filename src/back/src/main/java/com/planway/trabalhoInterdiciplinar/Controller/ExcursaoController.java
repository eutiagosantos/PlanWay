package com.planway.trabalhoInterdiciplinar.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.planway.trabalhoInterdiciplinar.Dto.ExcursaoDto;
import com.planway.trabalhoInterdiciplinar.Entity.Excursao;
import com.planway.trabalhoInterdiciplinar.Service.ExcursaoService;

@RestController
@RequestMapping(value = "/api/excursoes")
public class ExcursaoController {

    @Autowired
    private ExcursaoService excursaoService;

    @PostMapping
    public ResponseEntity<Object> criarExcursao(@RequestBody ExcursaoDto dto) {
        try {
            Excursao excursao = excursaoService.criarExcursao(dto);
            return ResponseEntity.ok(excursao);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/listExcursoes")
    public ResponseEntity<List<Excursao>> listExcursoes() {
        List<Excursao> excursoes = excursaoService.listExcursoes();

        return ResponseEntity.ok(excursoes);
    }

    @PutMapping("/{id}")
    public void updateExcursao(@PathVariable Long id, @RequestBody ExcursaoDto dto) {
        excursaoService.updateExcursao(id, dto);
        ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExcursao(@PathVariable Long id) {
        excursaoService.deleteExcursao(id);
        return ResponseEntity.noContent().build();
    }

}
