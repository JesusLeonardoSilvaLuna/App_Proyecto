import { useEffect, useState } from "react";
import "./featured.scss";

import image1 from './Imagenes/coca-cola.png';
import image2 from './Imagenes/movistar.png';

export default function Featured({ type, setGenre }) {
  const [content] = useState({ imageLinks: [image1, image2] });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % content.imageLinks.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [content]);


  return (
    <div className="featured">
      <div className="img-container">
        <img
          src="https://markrossstudio.com/wp/wp-content/uploads/2014/09/MRoss_CPowersRacingB-e1410990826225.jpg"
          alt=""
        />
      </div>
      <div className="info">
        <div className="img-container-log">
          <img src={content.imageLinks[currentImageIndex]} alt="" />
        </div>
      </div>
    </div>
  );
}