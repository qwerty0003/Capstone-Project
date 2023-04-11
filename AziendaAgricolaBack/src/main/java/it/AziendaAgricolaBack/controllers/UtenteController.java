package it.AziendaAgricolaBack.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.AziendaAgricolaBack.entities.ProdottoAgricolo;
import it.AziendaAgricolaBack.entities.Utente;
import it.AziendaAgricolaBack.services.ProdottoAgricoloService;
import it.AziendaAgricolaBack.services.UtenteService;
import jakarta.validation.Valid;



@RestController
@RequestMapping("/utenti")
@Tag(name = "wishlist", description = "Endpoint per gestire le wishlist degli utenti")
public class UtenteController {

    @Autowired
    private UtenteService utenteService;

    @GetMapping("/{id}/wishlist")
    @Operation(summary = "Recupera la wishlist di un utente", tags = {"wishlist"})
    public ResponseEntity<Set<Long>> getWishlist(@PathVariable("id") Long id) {
        Set<Long> wishlist = utenteService.getWishlist(id);
        return ResponseEntity.ok(wishlist);
    }

    @PostMapping("/{id}/add/{productId}")
    @Operation(summary = "Aggiunge un prodotto alla wishlist di un utente", tags = {"wishlist"})

    public ResponseEntity<Utente> addProductToWishlist(@PathVariable("id") Long id,
    		@PathVariable("productId") Long productId) {
        Utente utente = utenteService.aggiungiProdottoAllaWishlist(id, productId);
        System.out.println("prodotto aggiunto");
        return ResponseEntity.ok(utente);
    }

    @PostMapping("/{id}/remove/{productId}")
    @Operation(summary = "Rimuove un prodotto dalla wishlist di un utente", tags = {"wishlist"})

    public ResponseEntity<Utente> deleteProductFromWishlist(@PathVariable("id") Long id,
                                                            @PathVariable("productId") Long productId) {
        Utente utente = utenteService.rimuoviProdottoDallaWishlist(id, productId);
        System.out.println("prodotto rimosso");
        return ResponseEntity.ok(utente);
    }

    @GetMapping("/elenco")
    @Operation(summary = "Recupera l'elenco degli utenti", tags = {"wishlist"})
    public ResponseEntity<List<Map<String, Object>>> getElencoUtenti() {
        List<Utente> utenti = utenteService.getUtenti();
        List<Map<String, Object>> elenco = new ArrayList<>();
        for (Utente utente : utenti) {
            Map<String, Object> mappa = new HashMap<>();
            mappa.put("id", utente.getId());
            mappa.put("email", utente.getEmail());
            elenco.add(mappa);
        }
        return ResponseEntity.ok(elenco);
    }
}

