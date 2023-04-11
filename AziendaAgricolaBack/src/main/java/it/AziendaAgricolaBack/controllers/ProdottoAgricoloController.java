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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.AziendaAgricolaBack.entities.ProdottoAgricolo;
import it.AziendaAgricolaBack.services.ProdottoAgricoloService;


@RestController
@RequestMapping("/prodotti-agricoli")
@Tag(name = "prodotti", description = "Endpoint per gestire i prodotti nel database")
public class ProdottoAgricoloController {
    
    @Autowired
    private ProdottoAgricoloService prodottoAgricoloService;
    
    @GetMapping
    @Operation(summary = "Recupera tutti i prodotti agricoli presenti nel database", tags = {"prodotti"})
    public List<ProdottoAgricolo> findAll() {
        return prodottoAgricoloService.findAll();
    }
    
    @GetMapping("/{id}") 
    @Operation(summary = "Recupera tutti i prodotti agricoli presenti nel database", tags = {"prodotti"})
    public ProdottoAgricolo findById(@PathVariable Long id) {
        return prodottoAgricoloService.findById(id);
    }
    
    @PostMapping
    @Operation(summary = "Salva un nuovo prodotto agricolo nel database", tags = {"prodotti"})
    public ProdottoAgricolo save(@RequestBody ProdottoAgricolo prodottoAgricolo) {
        return prodottoAgricoloService.save(prodottoAgricolo);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Aggiorna un prodotto agricolo esistente dato il suo id", tags = {"prodotti"})
    public ProdottoAgricolo update(@PathVariable Long id, @RequestBody ProdottoAgricolo prodottoAgricolo) {
        prodottoAgricolo.setId(id);
        return prodottoAgricoloService.save(prodottoAgricolo);
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Elimina un prodotto agricolo esistente dato il suo id", tags = {"prodotti"})
    public void deleteById(@PathVariable Long id) {
        prodottoAgricoloService.deleteById(id);
    }
    
    @GetMapping("/cerca-per-nome")
    @Operation(summary = "Recupera tutti i prodotti agricoli con un determinato nome", tags = {"prodotti"})
    public List<ProdottoAgricolo> findByNome(@RequestParam String nome) {
        return prodottoAgricoloService.findByNome(nome);
    }
}

