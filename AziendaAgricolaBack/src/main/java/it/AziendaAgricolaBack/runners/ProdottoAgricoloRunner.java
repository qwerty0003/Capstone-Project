package it.AziendaAgricolaBack.runners;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import it.AziendaAgricolaBack.entities.ProdottoAgricolo;
import it.AziendaAgricolaBack.services.ProdottoAgricoloService;

@Component
public class ProdottoAgricoloRunner implements ApplicationRunner {
	
	@Autowired ProdottoAgricoloService ps;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println("Runner runned");
		//inserisciProdotti();
		System.out.println("Runner stopped");

	}

	public void inserisciProdotti(){
		
		//AVOCADO
		List<Integer> listAvo = new ArrayList<Integer>();
		listAvo.add(1);
		listAvo.add(2);
		listAvo.add(4);
		
		ProdottoAgricolo avocado = ProdottoAgricolo.builder()
				.nome("Avocado, al kg").descrizione("Avocado locale razza Reed")
				.prezzo(8.00).qnt_vendita(listAvo).qnt_disponibile(50.50).disponibilita(true)
				.condizioni_conservazione("Conservare in un luogo fresco e asciutto")
				.suggerimenti_uso("ottimo da mangiare o in alcune preparazioni")
				.img("https://cdn.pixabay.com/photo/2020/07/09/20/22/avocados-5388669_960_720.jpg")
				.img_mobile("https://cdn.pixabay.com/photo/2020/07/09/20/22/avocados-5388669_960_720.jpg")
				.build();
		ps.save(avocado);
		
		//LIMONE
		List<Integer> listLime = new ArrayList<Integer>();
		listLime.add(1);
		listLime.add(2);
		listLime.add(4);
		
		ProdottoAgricolo limone = ProdottoAgricolo.builder()
				.nome("Limone, al kg").descrizione("Limoni Bio, buccia edibile").prezzo(2.50).qnt_vendita(listLime)
				.condizioni_conservazione("Conservare in un luogo fresco e asciutto").qnt_disponibile(45.50)
				.suggerimenti_uso("Ideali per dare una nota di sapore deciso, con un' elevata acidità,"
						+ " ai vostri secondi piatti."
						+ " Versatile anche nella preparazione di liquori e dessert.").disponibilita(true)
				.img("https://cdn.pixabay.com/photo/2017/02/05/12/31/lemons-2039830_960_720.jpg")
				.img_mobile("https://cdn.pixabay.com/photo/2017/02/05/12/31/lemons-2039830_960_720.jpg")
				.build();
		
		ps.save(limone);
		
		//FICO
		List<Integer> listFico = new ArrayList<Integer>();
		listFico.add(1);
		listFico.add(2);
		listFico.add(4);
		
		ProdottoAgricolo fico = ProdottoAgricolo.builder().nome("Fico Dottato, al kg")
				.descrizione("Varietà di fico a buccia bianca, di forma sferica e allungata,"
						+ " polpa carnosa e dal sapore molto dolce. "
						+ "Maturazione: Agosto/Settembre").prezzo(7.00).qnt_disponibile(40.00)
				.qnt_vendita(listFico).condizioni_conservazione("Conservare in frigorifero")
				.suggerimenti_uso("Ottimo da consumare sia fresco o "
						+ "assiccato che per la preparazione di confetture").disponibilita(true)
				.img("https://cdn.pixabay.com/photo/2017/08/28/22/24/figs-2691523_960_720.jpg")
				.img_mobile("https://cdn.pixabay.com/photo/2017/08/28/22/24/figs-2691523_960_720.jpg").build();
		
		ps.save(fico);
		
		//OLIO
		List<Integer> listOil = new ArrayList<Integer>();
		listOil.add(1);
		listOil.add(2);
		listOil.add(3);
		listOil.add(4);
		
		ProdottoAgricolo olioBottiglia = ProdottoAgricolo.builder().nome("Olio extravergine di Oliva, bottiglia 0.75l")
				.descrizione("olio extravergine d'oliva biologico, molitura a freddo ")
				.prezzo(7.00).qnt_disponibile(300.00)
				.qnt_vendita(listOil).condizioni_conservazione("Conservare in un luogo fresco e asciutto"
						+ ", al riparo dalla luce").disponibilita(true)
				.suggerimenti_uso("Ottimo per condire a crudo. Grazie al suo elevato punto di fumo,"
						+ " l'olio d'oliva è l'ideale per tutti i tipi di cottura.")
				.img("https://cdn.pixabay.com/photo/2014/05/28/00/27/olive-oil-356102_960_720.jpg")
				.img_mobile("https://cdn.pixabay.com/photo/2014/05/28/00/27/olive-oil-356102_960_720.jpg")
				.build();
		
		ps.save(olioBottiglia);

		List<Integer> listOil2 = new ArrayList<Integer>();
		listOil2.add(1);
		listOil2.add(2);
		listOil2.add(3);		
		
		ProdottoAgricolo olioLatta = ProdottoAgricolo.builder().nome("Olio extravergine di Oliva, latta 5l")
				.descrizione("olio extravergine d'oliva biologico, molitura a freddo ")
				.prezzo(40.00).qnt_disponibile(100.00)
				.qnt_vendita(listOil2).condizioni_conservazione("Conservare in un luogo fresco e asciutto"
						+ ", al riparo dalla luce").disponibilita(true)
				.suggerimenti_uso("Ottimo per condire a crudo. Grazie al suo elevato punto di fumo,"
						+ " l'olio d'oliva è l'ideale per tutti i tipi di cottura.")
				.img("https://media.istockphoto.com/id/636626606/it/foto/contenitori-per-olio-doliva.jpg?s=1024x1024&w=is&k=20&c=sRfs89yHwR3lsWj36vCV1GnYfYdUALUO4_t-aXRC5FM=")
				.img_mobile("https://media.istockphoto.com/id/636626606/it/foto/contenitori-per-olio-doliva.jpg?s=1024x1024&w=is&k=20&c=sRfs89yHwR3lsWj36vCV1GnYfYdUALUO4_t-aXRC5FM=")
				.build();
		
		ps.save(olioLatta);
	}
	
}
