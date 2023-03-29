package it.AziendaAgricolaBack.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.AziendaAgricolaBack.entities.ProdottoAgricolo;
import it.AziendaAgricolaBack.repos.ProdottoAgricoloRepo;

@Service
public class ProdottoAgricoloService {

    @Autowired
    private ProdottoAgricoloRepo prodottoAgricoloRepository;

    public List<ProdottoAgricolo> findAll() {
        return prodottoAgricoloRepository.findAll();
    }

    public ProdottoAgricolo findById(Long id) {
        return prodottoAgricoloRepository.findById(id).orElse(null);
    }

    public ProdottoAgricolo save(ProdottoAgricolo prodottoAgricolo) {
        return prodottoAgricoloRepository.save(prodottoAgricolo);
    }

    public void deleteById(Long id) {
        prodottoAgricoloRepository.deleteById(id);
    }

    public List<ProdottoAgricolo> findByNome(String nome) {
        return prodottoAgricoloRepository.findByNomeContaining(nome);
    }
}

