

# 🚜 Azienda Agricola - Capstone Epicode
Questo progetto è il mio capstone finale del percorso con Epicode, corso full stack intensivo di 19200 ore.

## 🌾 Descrizione del progetto

Il progetto consiste in un sito web per un'azienda agricola, con le seguenti pagine:
  

 - 🏠 Home
   
 - 🤵 Chi Siamo
 
 -  🌿 Prodotti
   
-   🛍️ Shop
   
-   📍 Vieni a trovarci
   
-   🗒️ Wishlist
   
-   🛒 Carrello

Inoltre, il sito include le seguenti funzionalità:
-   🔐 Login e registrazione utente
 
-   📜 Wishlist utente
 
-   🛍️ Shop con carrello e finto checkout

-   📅 Form per prenotare un appuntamento che invia la mail all'indirizzo prescelto

## 💻 Tecnologie utilizzate

Il progetto fa uso delle seguenti tecnologie:

Frontend: Angular 14, Angular Material UI, FakerJs, Animate.css e Bootstrap 5.2

Backend: Java 17, Spring Boot 3, Spring Security, JPA, JSON Web Token, Spring Mail e OpenAPI per documentare le API.


## 🏃 Come eseguire il progetto

Per eseguire il progetto, assicurati di avere installato sul tuo sistema Node.js, Angular CLI e Java 17. Segui i seguenti passaggi:

1.  **Clona il repository**:    
    ```
    git clone https://github.com/qwerty0003/Capstone-Project.git
    ```  
    
 2.  **Installa le dipendenze**:

	   
 **Front-end:** 
    
 -    Apri un terminale nella cartella `AziendaAgricola` e digita: 
    
        ```
        npm install
        ```  
	 
	
  **Back-end:**
       
 - Apri un terminale nella cartella `AziendaAgricolaBack` e digita:
        ```
        ./mvnw install
        ```
        
  3. **Cambiare impostazioni**
	
	
 **Database**
	
-  Apri il file  `application.properties`  nella directory  `src/main/resources`.
-  Modifica le seguenti proprietà per corrispondere alla configurazione del tuo database PostgreSQL:

```ini
spring.datasource.url=jdbc:postgresql://localhost:port/nome_database
spring.datasource.username=tuo_nome_utente
spring.datasource.password=tua_password
```

Assicurati di sostituire  `port`  e  `nome_database`  con i valori corretti per il tuo database PostgreSQL.
		           
   **Email**

-  Apri il file  `application.properties`  nella directory  `src/main/resources`.
-  Aggiungi le seguenti proprietà per configurare le impostazioni dell'email:



```
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=tuo_indirizzo_email
spring.mail.password=tua_password_email
```

Assicurati di sostituire  `tuo_indirizzo_email`  e  `tua_password_email`  con il tuo indirizzo email e la tua password reale o una password per app generata su Gmail.

Una volta apportate queste modifiche, salva il file  `application.properties`. Le nuove impostazioni del database e dell'email dovrebbero essere in vigore.

**Angular**
 
Apri la cartella `AziendaAgricola` nel tuo IDE preferito e cambia gli url con il seguente `http://localhost:3000/` lasciando gli end-point dove sono presenti, nei seguenti file:
 - utenti.service.ts
 - prodotti-service.service.ts
 - auth-service.service.ts  

4.  **Eseguire l'applicazione**
         
   
 **Back-end**

 - Apri un terminale nella directory  `AziendaAgricolaBack`  e digita il seguente comando:
    ```
    ./mvnw spring-boot:run
    ```
    
  **Front-end**: 
  - Apri un terminale nella directory  `AziendaAgricola`  e digita il seguente comando:
    
    ```scheme
    ng serve
    ```
    

6.  **Accedere al sito web**: Dopo aver eseguito il back-end e il front-end, accedi al sito web all'indirizzo  `http://localhost:4200/`  sul tuo browser preferito.
    

Spero che queste istruzioni ti aiutino ad eseguire il progetto con successo. In caso di problemi, non esitare a contattare il team di sviluppo per assistenza.
  

## 📞 Contatti

Per maggiori informazioni sul progetto, contattare il team di sviluppo all'indirizzo email: segreteriadelsito@gmail.com