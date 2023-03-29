package it.AziendaAgricolaBack.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "prodotti_agricoli")
public class ProdottoAgricolo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String descrizione;

    @Column(nullable = false)
    private Double prezzo;
    
    @Column(nullable = false)
    private Boolean disponibilita;
    
    @Column(nullable = false)
    private Double qnt_disponibile;
    
    @Column(nullable = false)
    private List<Integer> qnt_vendita;
    
    @Column(nullable = false)
    private String condizioni_conservazione;
    
    @Column(nullable = false)
    private String suggerimenti_uso;
    
    @Column(nullable = false)
    private String img;
        
    @Column(nullable = false)
    private String img_mobile;
    
    private void nonDisponibile() {
    	if(this.qnt_disponibile == 0 ) {
    		this.disponibilita = false;
    	}
    }
    
}
