export type TCardsItem = {
  id?: number;
  number: string;
  owner: string;
  expiry: string;
  blocked?: boolean;
}

export type TAppState = {
  cards: TCardsItem[];
  language: string;
}
