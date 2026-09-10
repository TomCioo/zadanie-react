import { useState } from "react";
import "./AddMovie.css";

interface AddMovieProps {
  dodajFilm: (title: string, year: number, genre: string[]) => void;
}

function AddMovie({ dodajFilm }: AddMovieProps) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState<string[]>([""]);

  function obsluzFormularz(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  if (title.trim() === "" || title.trim().length < 3) {
    return;
  }

  if ( year === "" ||Number(year) > 2026 ||Number(year) < 1900) {
    return;
  }

  const poprawneGatunki = genre.every((gatunek) => gatunek.trim().length >= 3);

  if (!poprawneGatunki) {
    return;
  }

  const oczyszczoneGatunki = genre.map(
    (gatunek) => gatunek.trim()
  );

  dodajFilm(
    title.trim(),
    Number(year),
    oczyszczoneGatunki
  );

  setTitle("");
  setYear("");
  setGenre([""]);
}

  function dodajGatunek() {
    setGenre([...genre, ""]);
  }

function zmienGatunek(index: number, wartosc: string) {
    const noweGatunki = [...genre];
    noweGatunki[index] = wartosc;

    setGenre(noweGatunki);
}

  return (
    <form onSubmit={obsluzFormularz}>
      <div>
        <label>Tytuł:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          minLength={2}
        />
      </div>

      <div>
        <label>Rok:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          min={1900}
          max={2026}
        />
      </div>

      <div>
        <label>Gatunki:</label>

        {genre.map((gatunek, index) => (
            <div key={index}>
            <input value={gatunek} onChange={(e) => zmienGatunek(index, e.target.value)} required minLength={2}/>
            {index === genre.length - 1 && (
                <button type="button" onClick={dodajGatunek}>
                +
                </button>
            )}
            </div>
        ))}
     </div>

      <button type="submit">
        Dodaj film
      </button>
    </form>
  );
}

export default AddMovie;