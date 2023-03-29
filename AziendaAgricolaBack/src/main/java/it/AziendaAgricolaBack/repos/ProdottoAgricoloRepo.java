package it.AziendaAgricolaBack.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.AziendaAgricolaBack.entities.ProdottoAgricolo;

@Repository
public interface ProdottoAgricoloRepo extends JpaRepository<ProdottoAgricolo, Long> {
	
	List<ProdottoAgricolo> findByNomeContaining(String nome);
	
}