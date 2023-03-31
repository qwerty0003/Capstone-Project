package it.AziendaAgricolaBack.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import it.AziendaAgricolaBack.services.EmailService;
import jakarta.mail.MessagingException;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class EmailController {
    
    @Autowired
    private EmailService emailService;
    
    @PostMapping("/prenotazione")
    public String prenota(@RequestParam String nome, @RequestParam String cognome,
    		@RequestParam String email, @RequestParam String data) {
    try {
    emailService.sendEmail("vinrossiandrea@gmail.com", nome, cognome, email, data);
    return "Email inviata. Attendi conferma.";
    } catch (MessagingException e) {
    return "Errore nell'invio dell'email di conferma";
    }
    }
}

