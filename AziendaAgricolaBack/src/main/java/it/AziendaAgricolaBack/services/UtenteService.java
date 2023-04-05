package it.AziendaAgricolaBack.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import it.AziendaAgricolaBack.entities.ProdottoAgricolo;
import it.AziendaAgricolaBack.entities.Utente;
import it.AziendaAgricolaBack.repos.UtenteRepo;

@Service
public class UtenteService {
	    @Autowired
	    private UtenteRepo utenteRepository;

	    public List<Utente> getUtenti() {
	        return utenteRepository.findAll();
	    }

	    public Utente getUtenteById(Long id) {
	        return utenteRepository.findById(id)
	                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utente non trovato"));
	    }

	    public Utente aggiungiUtente(Utente nuovoUtente) {
	        if (utenteRepository.findByEmail(nuovoUtente.getEmail()).isPresent()) {
	            throw new ResponseStatusException(HttpStatus.CONFLICT, "L'indirizzo email è già in uso");
	        }
	        return utenteRepository.save(nuovoUtente);
	    }

	    public void eliminaUtente(Long id) {
	        utenteRepository.deleteById(id);
	    }

	    public Utente aggiungiProdottoAllaWishlist(Long idUtente, Long idProdotto) {
	        Utente utente = getUtenteById(idUtente);
	        utente.getWishlist().add(idProdotto);
	        return utenteRepository.save(utente);
	    }

	    public Utente rimuoviProdottoDallaWishlist(Long idUtente, Long idProdotto) {
	        Utente utente = getUtenteById(idUtente);
	        utente.getWishlist().remove(idProdotto);
	        return utenteRepository.save(utente);
	    }
	    
	    public Set<Long> getWishlist(Long id) {
	        Optional<Utente> optionalUtente = utenteRepository.findById(id);
	        if (optionalUtente.isPresent()) {
	            Utente utente = optionalUtente.get();
	            return utente.getWishlist();
	        }
	        return new HashSet<>();
	    }

	}

