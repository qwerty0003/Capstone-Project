package it.AziendaAgricolaBack.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import it.AziendaAgricolaBack.services.EmailService;
import jakarta.mail.MessagingException;


@RestController
public class EmailController {
    

    @Autowired
    private EmailService emailService;

    @PostMapping("/prenotazione")
    @Operation(tags = "email-sender", summary = "Invia email di conferma prenotazione")
    public ResponseEntity<Map<String, String>> prenota(@RequestBody Map<String, String> appointmentData) {
        String nome = appointmentData.get("name");
        String cognome = appointmentData.get("surname");
        String email = appointmentData.get("email");
        String data = appointmentData.get("date");

        try {
            emailService.sendEmail("segreteriadelsito@gmail.com", nome, cognome, email, data);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Email inviata. Attendi conferma.");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (MessagingException e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Errore nell'invio dell'email di conferma");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

