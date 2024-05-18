import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import axios from "axios";
import { useEffect, useState } from "react";
import "./featured.scss";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  console.log(content);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Categorías"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option></option>
            <option value="adventure">Expertos</option>
            <option value="comedy">Avanzados</option>
            <option value="crime">Intermedio</option>
            <option value="fantasy">Femenil</option>
            <option value="historical">Titan</option>
            <option value="horror">Bicicletas eletrónicamente asistidas</option>
            <option value="romance">Novatos</option>
            <option value="sci-fi">Contrarreloj</option>
          </select>
        </div>
      )}
      <img style={{ backgroundImage: `url('https://markrossstudio.com/wp/wp-content/uploads/2014/09/MRoss_CPowersRacingB-e1410990826225.jpg')` }} alt="" />
      <div className="info">
        <img src={content.imgTitle} alt="" />
        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <button className="play">
            <ControlPointIcon />
            <span>Ver más</span>
          </button>
          <button className="more">
            <InfoOutlinedIcon />
            <span>Acerca de nosotros </span>
          </button>
        </div>
      </div>
    </div>
  );
}