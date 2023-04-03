package it.AziendaAgricolaBack.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import it.AziendaAgricolaBack.entities.EmailResponse;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    public void sendEmail(String destinatario, String nome, String cognome, String email, String data) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        
        helper.setTo(destinatario);
        helper.setSubject("Nuova prenotazione");
        
        String content = "E' stata effettuata una nuova prenotazione:<br><br>";
        content += "<strong>Nome:</strong> " + nome + "<br>";
        content += "<strong>Cognome:</strong> " + cognome + "<br>";
        content += "<strong>Email:</strong> " + email + "<br>";
        content += "<strong>Data preferita:</strong> " + data + "<br>";
        
        helper.setText(content, true);
        
        mailSender.send(message);
    }
    
}

