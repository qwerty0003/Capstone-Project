export class WishlistItem {
  id: number;
  nome: string;
  descrizione: string;
  prezzo: number;
  disponibilita: boolean;
  qnt_disponibile: number;
  qnt_vendita: number[];
  condizioni_conservazione: string;
  suggerimenti_uso: string;
  img: string;
  img_mobile: string;

  constructor(
    id: number,
    nome: string,
    descrizione: string,
    prezzo: number,
    disponibilita: boolean,
    qnt_disponibile: number,
    qnt_vendita: number[],
    condizioni_conservazione: string,
    suggerimenti_uso: string,
    img: string,
    img_mobile: string
  ) {
    this.id = id;
    this.nome = nome;
    this.descrizione = descrizione;
    this.prezzo = prezzo;
    this.disponibilita = disponibilita;
    this.qnt_disponibile = qnt_disponibile;
    this.qnt_vendita = qnt_vendita;
    this.condizioni_conservazione = condizioni_conservazione;
    this.suggerimenti_uso = suggerimenti_uso;
    this.img = img;
    this.img_mobile = img_mobile;
  }
}
