import "./MovieCard.css";

interface MovieCardProps {
  title: string;
  year: number;
  genre: string;
  ocena: number;
  ocenFilm: (ocena: number) => void;
  usunOcene: () => void;
  czyObejrzane: boolean;
  dodajDoObejrzanych: () => void;
}

function MovieCard(props : MovieCardProps) {
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
      <p>Oceń film:
      <button onClick={() => props.ocenFilm(1)} className={props.ocena >= 1 ? "selected" : ""}>★</button>
      <button onClick={() => props.ocenFilm(2)} className={props.ocena >= 2 ? "selected" : ""}>★</button>
      <button onClick={() => props.ocenFilm(3)} className={props.ocena >= 3 ? "selected" : ""}>★</button>
      <button onClick={() => props.ocenFilm(4)} className={props.ocena >= 4 ? "selected" : ""}>★</button>
      <button onClick={() => props.ocenFilm(5)} className={props.ocena >= 5 ? "selected" : ""}>★</button>
      </p>
    </div>
    {props.ocena && (
    <div>
    <p>Twoja ocena: {props.ocena}/5
    <button onClick={props.usunOcene}>
       Usuń ocenę
    </button>
    </p>
    </div>
    )}

      <button className={props.czyObejrzane ? "watched" : ""} onClick={props.dodajDoObejrzanych} disabled={props.czyObejrzane}>
        {props.czyObejrzane ? "Obejrzane" : "Dodaj do obejrzanych"}
      </button>
    </div>
  );
}

export default MovieCard;
