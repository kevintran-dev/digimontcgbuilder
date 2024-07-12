import React, { useState } from "react";
import { Popover } from 'antd';
import { v4 as uuid } from "uuid";


import './DigiCard.css'

function DigiCard({ removeFromDeck, deckDiv, setDeckDiv, deckInfo, setdeckInfo, cardnumber, attribute, card_sets, cardrarity, color, color2, digi_type, digi_type2, digiform, dp, xros_req, evolution_cost, image_url, level, maineffect, name, play_cost, set_name, sourceeffect, stage, type
}) {


    const [jsonData, setJSONData] = useState([])
    let imgURL = `https://images.digimoncard.io/images/cards/${cardnumber}.jpg`;

    const contentDIV = (
        <div className="hover-info">
            <div >
                <h3>{name}</h3>
                <div className="card-img">
                </div>
                <div className="card-desc">
                    {level ? <p>Level: {level}</p> : <div></div>}
                    {play_cost ? <p>Play Cost: {play_cost}</p> : <div></div>}
                    {dp ? <p>DP: {dp}</p> : <div></div>}
                    {evolution_cost ? <p>Evolution Cost: {evolution_cost}</p> : <div></div>}
                    <div>
                        {!color2 ? <p> Colors: {color}</p> : <p>Colors: {color} / {color2}</p>}
                    </div>
                    {attribute ? <p>Attribute: {attribute}</p> : <div></div>}
                    {type ? <p>Type: {type}</p> : <div></div>}

                    <div>
                        {!digi_type2 ? <p> Digi-Type: {digi_type}</p> : <p>Digi-Type: {digi_type} / {digi_type2}</p>}
                    </div>
                    {digiform ? <p>Form: {digiform}</p> : <div></div>}
                    {cardrarity ? <p>Card Rarity: {cardrarity}</p> : <div></div>}
                    {stage ? <p>Stage: {stage}</p> : <div></div>}
                    {xros_req ? <p>Xros Requirement: {xros_req}</p> : <div></div>}

                </div>


                {maineffect ? <p>Main Effect: {maineffect}</p> : <div></div>}
                {sourceeffect ? <p>Source Effect: {sourceeffect}</p> : <div></div>}
                {set_name ? <p>Set: {set_name}</p> : <div></div>}
                {card_sets ? <p>Card Set: {card_sets}</p> : <div></div>}
            </div>

        </div>
    )


    const addToDeck = async () => {
        const BuiltDeck = document.querySelector(".BuiltDeck-list")
        let cardID = uuid()
        console.log("builddeck", BuiltDeck)
        let card = { cardnumber: cardnumber, level: level, type: type, src: imgURL, id: cardID }
        setdeckInfo([...deckInfo, card])

    }


    return (
        <div>


            <Popover placement="top" content={contentDIV} overlayStyle={{

            }}>
                <img onClick={addToDeck} src={imgURL} alt={name} className="DigiCard-img" />
            </Popover>

        </div>


    );
}



export default DigiCard;

