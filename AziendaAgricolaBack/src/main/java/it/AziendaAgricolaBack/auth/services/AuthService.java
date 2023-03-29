package it.AziendaAgricolaBack.auth.services;

import it.AziendaAgricolaBack.auth.payload.LoginDto;
import it.AziendaAgricolaBack.auth.payload.RegisterDto;

public interface AuthService {
    
	String login(LoginDto loginDto);
    String register(RegisterDto registerDto);
    
}
