import { useState } from "react";
import "./App.css";
import movies from "./data/movies.json";
import MovieCard from "./components/MovieCard";

function App() {
  const [obejrzane, setObejrzane] = useState<number[]>([]);
  const [filtr, setFiltr] = useState("wszystkie");
  const [oceny, setOceny] = useState<Record<number, number>>({});

  function dodajDoObejrzanych(id) {
    setObejrzane((poprzednie) => {
      if (poprzednie.includes(id)) {
        return poprzednie;
      }

      return [...poprzednie, id];
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
  }

  function dodajOcene(id,ocena){
      setOceny((poprzednie) => ({...poprzednie,[id]: ocena}));
  }

  function usunOcene(id) {
    setOceny((poprzednie) => {
    const noweOceny = { ...poprzednie };
    delete noweOceny[id];
    return noweOceny;
  });
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
          Wyczysc    </button>
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
              dodajDoObejrzanych={() => dodajDoObejrzanych(movie.id)}
              ocenFilm={(ocena) => dodajOcene(movie.id, ocena)}
              ocena={oceny[movie.id]}
              usunOcene={() => usunOcene(movie.id)}
            />
          </li>
        ))}
      </ul>
      )}
    </>
  );
}

export default App;
