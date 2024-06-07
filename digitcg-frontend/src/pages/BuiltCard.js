import React from "react";


import './DigiCard.css'

function BuiltCard({ id, image_url, level, type, cardnumber, removeFromDeck }) {


    return (
        <img onClick={removeFromDeck} src={image_url} alt={cardnumber} id={id} className="DigiCard-img" />
    );
}



export default BuiltCard;