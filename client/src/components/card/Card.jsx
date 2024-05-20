import React from 'react';
import './card.scss';

const Card = ({ title, src, description }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={src} alt={title} />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;