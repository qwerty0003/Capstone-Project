package it.AziendaAgricolaBack.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import it.AziendaAgricolaBack.entities.ProdottoAgricolo;
import it.AziendaAgricolaBack.entities.Utente;
import it.AziendaAgricolaBack.services.ProdottoAgricoloService;
import it.AziendaAgricolaBack.services.UtenteService;
import jakarta.validation.Valid;



@RestController
@RequestMapping("/utenti")
public class UtenteController {

	@Autowired
	private UtenteService utenteService;
	@Autowired
	private ProdottoAgricoloService prodottoService;
	

	@GetMapping("/{id}/wishlist")
	public ResponseEntity<List<ProdottoAgricolo>> getWishlist(@PathVariable Long id) {
	    List<ProdottoAgricolo> wishlist = utenteService.getWishlist(id);
	    if (wishlist != null) {
	        return ResponseEntity.ok(wishlist);
	    }
	    return ResponseEntity.notFound().build();
	}

	@PostMapping("/{id}/wishlist")
	public ResponseEntity<?> addToWishlist(@PathVariable Long id, @RequestBody @Valid ProdottoAgricolo prodotto, BindingResult bindingResult) {
	    if (bindingResult.hasErrors()) {
	        return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
	    }
	    Utente utente = utenteService.findById(id);
	    if (utente == null) {
	        return ResponseEntity.notFound().build();
	    }
	    utenteService.addToWishlist(utente, prodotto);
	    return ResponseEntity.ok().build();
	}

	@DeleteMapping("/{id}/wishlist/{idProdotto}")
	public ResponseEntity<?> removeFromWishlist(@PathVariable Long id, @PathVariable Long idProdotto) {
	    Utente utente = utenteService.findById(id);
	    if (utente == null) {
	        return ResponseEntity.notFound().build();
	    }
	    ProdottoAgricolo prodotto = prodottoService.findById(idProdotto);
	    if (prodotto == null) {
	        return ResponseEntity.notFound().build();
	    }
	    utenteService.removeFromWishlist(utente, prodotto);
	    return ResponseEntity.ok().build();
	}

	
	@GetMapping("/elenco")
	public ResponseEntity<List<Map<String, Object>>> getElencoUtenti() {
	    List<Utente> utenti = utenteService.findAll();
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
