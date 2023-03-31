package it.AziendaAgricolaBack.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import it.AziendaAgricolaBack.services.UtenteService;


@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/utenti")
public class UtenteController {

	@Autowired
	private UtenteService utenteService;

	@GetMapping("/{id}/wishlist")
	public ResponseEntity<List<ProdottoAgricolo>> getWishlist(@PathVariable Long id) {
		List<ProdottoAgricolo> wishlist = utenteService.getWishlist(id);
		if (wishlist != null) {
			return ResponseEntity.ok(wishlist);
		}
		return ResponseEntity.notFound().build();
	}

	@PostMapping("/{id}/wishlist")
	public ResponseEntity<?> addToWishlist(@PathVariable Long id, @RequestBody ProdottoAgricolo prodotto) {
		Utente utente = utenteService.findById(id);
		if (utente == null) {
			return ResponseEntity.notFound().build();
		}
		utenteService.addToWishlist(utente, prodotto);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/{id}/wishlist")
	public ResponseEntity<?> removeFromWishlist(@PathVariable Long id, @RequestBody ProdottoAgricolo prodotto) {
		Utente utente = utenteService.findById(id);
		if (utente == null) {
			return ResponseEntity.notFound().build();
		}
		utenteService.removeFromWishlist(utente, prodotto);
		return ResponseEntity.ok().build();
	}
}
