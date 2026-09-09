import "./MovieCard.css";

interface MovieCardProps {
  title: string;
  year: number;
  genre: string;
  ocena?: number;
  ocenFilm: (ocena: number) => void;
  czyObejrzane: boolean;
  dodajDoObejrzanych: () => void;
}

function MovieCard(props: MovieCardProps) {
  const gwiazdki = [1, 2, 3, 4, 5];

  return (
    <div className="movie-card">
      <h2>{props.title}</h2>

      <p className="movie-info">
        Rok: {props.year}
      </p>

      <p className="movie-info">
        Gatunek: {props.genre}
      </p>

      <div className="stars">
        <p>
          Oceń film:

          {gwiazdki.map((gwiazdka) => (
            <button
              key={gwiazdka}
              onClick={() => props.ocenFilm(gwiazdka)}
              className={
                props.ocena && props.ocena >= gwiazdka
                  ? "selected"
                  : ""
              }
            >
              ★
            </button>
          ))}
        </p>
      </div>

      {props.ocena && (
        <p>
          Twoja ocena: {props.ocena}/5
        </p>
      )}

      <button
        className={props.czyObejrzane ? "watched" : ""}
        onClick={props.dodajDoObejrzanych}
      >
        {props.czyObejrzane
          ? "Usuń z obejrzanych"
          : "Dodaj do obejrzanych"}
      </button>
    </div>
  );
}

export default MovieCard;