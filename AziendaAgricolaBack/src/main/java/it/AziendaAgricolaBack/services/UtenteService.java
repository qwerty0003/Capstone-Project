package it.AziendaAgricolaBack.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.AziendaAgricolaBack.entities.ProdottoAgricolo;
import it.AziendaAgricolaBack.entities.Utente;
import it.AziendaAgricolaBack.repos.UtenteRepo;

@Service
public class UtenteService {

    @Autowired
    private UtenteRepo utenteRepository;

    public List<Utente> findAll() {
        return utenteRepository.findAll();
    }

    public Utente findById(Long id) {
        return utenteRepository.findById(id).orElse(null);
    }

    public Utente save(Utente utente) {
        return utenteRepository.save(utente);
    }

    public void deleteById(Long id) {
        utenteRepository.deleteById(id);
    }

    public Optional<Utente> findByEmail(String email) {
        return utenteRepository.findByEmail(email);
    }

    public void addToWishlist(Utente utente, ProdottoAgricolo prodotto) {
        List<ProdottoAgricolo> wishlist = utente.getWishlist();
        if (wishlist == null) {
            wishlist = new ArrayList<>();
        }
        wishlist.add(prodotto);
        utente.setWishlist(wishlist);
        utenteRepository.save(utente);
    }

    public void removeFromWishlist(Utente utente, ProdottoAgricolo prodotto) {
        List<ProdottoAgricolo> wishlist = utente.getWishlist();
        if (wishlist == null) {
            wishlist = new ArrayList<>();
        }
        wishlist.remove(prodotto);
        utente.setWishlist(wishlist);
        utenteRepository.save(utente);
    }
    
    public List<ProdottoAgricolo> getWishlist(Long id) {
        Utente utente = findById(id);
        if (utente != null) {
            return utente.getWishlist();
        }
        return null;
    }
}
