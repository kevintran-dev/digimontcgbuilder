import React, { useState } from "react";
import { Popover } from 'antd';
import { v4 as uuid } from "uuid";


import './DigiCard.css'

function DigiCard({ removeFromDeck, deckDiv, setDeckDiv, deckInfo, setdeckInfo, cardnumber, artist, attribute, card_sets, cardrarity, color, digi_type, dp, evolution_cost, image_url, level, maineffect, name, play_cost, set_name, sourceeffect, stage, type
}) {


    const [jsonData, setJSONData] = useState([])


    const contentDIV = (
        <div className="hover-info">
            <div >
                <h3>{name}</h3>
                <div className="card-img">
                    <h6>Artist: {artist}</h6>
                </div>
                <div className="card-desc">
                    <p>Level: {level}</p>
                    <p>Play Cost: {play_cost}</p>
                    <p>DP: {dp}</p>
                    <p>Evolution Cost: {evolution_cost}</p>
                    <p>Color: {color}</p>
                    <p>Attribute: {attribute}</p>
                    <p>Type: {type}</p>
                    <p>Digi-Type: {digi_type}</p>
                    <p>Card Rarity: {cardrarity}</p>
                    <p>Stage: {stage}</p>
                </div>


                <p>
                    Main Effect: {maineffect}
                </p>
                <p>
                    Source Effect: {sourceeffect}
                </p>
                <p>
                    Set: {set_name}
                </p>
                <p>
                    Card Set: {card_sets}
                </p>
            </div>

        </div>
    )


    const addToDeck = async () => {
        const BuiltDeck = document.querySelector(".BuiltDeck-list")
        let url = Object.values({ image_url })
        let cardID = uuid()
        console.log("builddeck", BuiltDeck)
        let card = { cardnumber: cardnumber, level: level, type: type, src: image_url, id: cardID }
        setdeckInfo([...deckInfo, card])

    }


    return (
        <div>


            <Popover placement="top" content={contentDIV} overlayStyle={{

            }}>
                <img onClick={addToDeck} src={image_url} alt={name} className="DigiCard-img" />
            </Popover>

        </div>


    );
}



export default DigiCard;

