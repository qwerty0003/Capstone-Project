export interface Prodotto {
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
}
