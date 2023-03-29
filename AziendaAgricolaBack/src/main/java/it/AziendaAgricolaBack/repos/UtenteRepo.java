package it.AziendaAgricolaBack.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.AziendaAgricolaBack.entities.Utente;

@Repository
public interface UtenteRepo extends JpaRepository<Utente, Long> {

    Optional<Utente> findByEmail(String email);
	
	Optional<Utente> findByNomeOrEmail(String nome, String email);

    Optional<Utente> findByNome(String name);

    Boolean existsByNome(String nome);

    Boolean existsByEmail(String email);
	
}
