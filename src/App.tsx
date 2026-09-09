import { useState } from "react";
import "./App.css";
import movies from "./data/movies.json";
import MovieCard from "./components/MovieCard";

type Filtr = "wszystkie" | "obejrzane" | "nieobejrzane";

function App() {
  const [obejrzane, setObejrzane] = useState<number[]>([]);
  const [filtr, setFiltr] = useState<Filtr>("wszystkie");
  const [oceny, setOceny] = useState<Record<number, number>>({});

  function przelaczObejrzane(id: number) {
    setObejrzane((poprzednie) => {
      if (poprzednie.includes(id)) {
        return poprzednie.filter((movieId) => movieId !== id);
      }

      return [...poprzednie, id];
    });
  }

  function obsluzOcene(id: number, ocena: number) {
    setOceny((poprzednie) => {
      if (poprzednie[id] === ocena) {
        const noweOceny = { ...poprzednie };
        delete noweOceny[id];
        return noweOceny;
      }

      return {
        ...poprzednie,[id]: ocena
      };
    });
  }

  const filtruj = movies.filter((movie) => {
    if (filtr === "obejrzane") {
      return obejrzane.includes(movie.id);
    }

    if (filtr === "nieobejrzane") {
      return !obejrzane.includes(movie.id);
    }

    return true;
  });

  function wyczysc() {
    setObejrzane([]);
    setOceny({})
  }

  return (
    <>
      <h1>
        Obejrzane: {obejrzane.length} / {movies.length}
      </h1>

      <div>
        <button onClick={() => setFiltr("wszystkie")}>
          Wszystkie
        </button>

        <button onClick={() => setFiltr("obejrzane")}>
          Obejrzane
        </button>

        <button onClick={() => setFiltr("nieobejrzane")}>
          Nieobejrzane
        </button>

        <button onClick={wyczysc}>
          Wyczyść
        </button>
      </div>

      {filtruj.length === 0 ? (
        <p>Brak filmów do wyświetlenia.</p>
      ) : (
        <ul>
          {filtruj.map((movie) => (
            <li key={movie.id}>
              <MovieCard
                title={movie.title}
                year={movie.year}
                genre={movie.genre}
                czyObejrzane={obejrzane.includes(movie.id)}
                dodajDoObejrzanych={() =>
                  przelaczObejrzane(movie.id)
                }
                ocenFilm={(ocena: number) =>
                  obsluzOcene(movie.id, ocena)
                }
                ocena={oceny[movie.id]}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;