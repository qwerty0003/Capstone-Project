package it.AziendaAgricolaBack.entities;

public class EmailResponse {
    private String message;

    public EmailResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

