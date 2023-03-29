package it.AziendaAgricolaBack.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import it.AziendaAgricolaBack.entities.ERole;
import it.AziendaAgricolaBack.entities.Roles;

public interface RoleRepo extends JpaRepository<Roles, Long> {
	Optional<Roles> findByRoleName(ERole roleName);

}
