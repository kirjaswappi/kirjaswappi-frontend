import { useState } from 'react';

export function useGenre() {
  const [genreName, setGenreName] = useState<string>('');
  return { genreName, setGenreName };
}
