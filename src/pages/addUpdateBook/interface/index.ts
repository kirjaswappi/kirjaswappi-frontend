export interface IAddBookInterface {
  ownerId?: string;
  title?: string | undefined | null;
  author?: string | undefined | null;
  description?: string | undefined | null;
  language?: string | undefined | null;
  favGenres: string[];
  condition?: string;
}