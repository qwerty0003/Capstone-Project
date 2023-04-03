package it.AziendaAgricolaBack.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import it.AziendaAgricolaBack.entities.ProdottoAgricolo;
import it.AziendaAgricolaBack.services.ProdottoAgricoloService;


@RestController
@RequestMapping("/prodotti-agricoli")
public class ProdottoAgricoloController {
    
    @Autowired
    private ProdottoAgricoloService prodottoAgricoloService;
    
    @GetMapping
    public List<ProdottoAgricolo> findAll() {
        return prodottoAgricoloService.findAll();
    }
    
    @GetMapping("/{id}")
    public ProdottoAgricolo findById(@PathVariable Long id) {
        return prodottoAgricoloService.findById(id);
    }
    
    @PostMapping
    public ProdottoAgricolo save(@RequestBody ProdottoAgricolo prodottoAgricolo) {
        return prodottoAgricoloService.save(prodottoAgricolo);
    }
    
    @PutMapping("/{id}")
    public ProdottoAgricolo update(@PathVariable Long id, @RequestBody ProdottoAgricolo prodottoAgricolo) {
        prodottoAgricolo.setId(id);
        return prodottoAgricoloService.save(prodottoAgricolo);
    }
    
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        prodottoAgricoloService.deleteById(id);
    }
    
    @GetMapping("/cerca-per-nome")
    public List<ProdottoAgricolo> findByNome(@RequestParam String nome) {
        return prodottoAgricoloService.findByNome(nome);
    }
}

