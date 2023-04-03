package it.AziendaAgricolaBack.auth.runner;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import it.AziendaAgricolaBack.auth.payload.RegisterDto;
import it.AziendaAgricolaBack.auth.services.AuthService;
import it.AziendaAgricolaBack.entities.ERole;
import it.AziendaAgricolaBack.entities.Roles;
import it.AziendaAgricolaBack.repos.RoleRepo;
import it.AziendaAgricolaBack.repos.UtenteRepo;



@Component
public class AuthRunner implements ApplicationRunner {
	
	@Autowired RoleRepo roleRepository;
	@Autowired UtenteRepo userRepository;
	@Autowired PasswordEncoder passwordEncoder;
	@Autowired AuthService authService;
	
	private Set<Roles> adminRole;
	private Set<Roles> moderatorRole;
	private Set<Roles> userRole;
	
	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println("Run...");
		//setRoleDefault();
		//setUserDefault();
		
	}
	
	private void setRoleDefault() {
		Roles admin = new Roles();
		admin.setRoleName(ERole.ROLE_ADMIN);
		roleRepository.save(admin);
		
		Roles user = new Roles();
		user.setRoleName(ERole.ROLE_USER);
		roleRepository.save(user);
		
		Roles moderator = new Roles();
		moderator.setRoleName(ERole.ROLE_MODERATOR);
		roleRepository.save(moderator);
		
		adminRole = new HashSet<Roles>();
		adminRole.add(admin);
		adminRole.add(moderator);
		adminRole.add(user);
		
		moderatorRole = new HashSet<Roles>();
		moderatorRole.add(moderator);
		moderatorRole.add(user);
		
		userRole = new HashSet<Roles>();
		userRole.add(user);
	}
	
	private void setUserDefault() {
		

		Set<String> roleAdmin = new HashSet<>(
				adminRole.stream()
						.map(r -> r.getRoleName().toString())
						.collect(Collectors.toList())
				);
		Set<String> roleModerator = new HashSet<>(
				moderatorRole.stream()
						.map(r -> r.getRoleName().toString())
						.collect(Collectors.toList())
				);
		Set<String> roleUser = new HashSet<>(
				userRole.stream()
						.map(r -> r.getRoleName().toString())
						.collect(Collectors.toList())
				);
		
		
		RegisterDto userAdmin = new RegisterDto();
		userAdmin.setNome("Admin");
		userAdmin.setCognome("Guy");
		userAdmin.setEmail("admin@example.com");
		userAdmin.setPassword(passwordEncoder.encode("admin00"));
		userAdmin.setRoles(roleAdmin);
		System.out.println(authService.register(userAdmin));
		
		RegisterDto simpleUser = new RegisterDto();
		simpleUser.setNome("Mario");
		simpleUser.setCognome("Rossi");
		simpleUser.setEmail("m.rossi@example.com");
		simpleUser.setPassword(passwordEncoder.encode("123456"));
		simpleUser.setRoles(roleUser);
		System.out.println(authService.register(simpleUser));
		
		RegisterDto userModerator = new RegisterDto();
		userModerator.setNome("Giuseppe");
		userModerator.setCognome("Verdi");
		userModerator.setEmail("g.verdi@example.com");
		userModerator.setPassword(passwordEncoder.encode("qwertyyy"));
		userModerator.setRoles(roleModerator);
		System.out.println(authService.register(userModerator));
	}

}
