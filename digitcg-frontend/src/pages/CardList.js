import React from 'react'
import DigiCard from './DigiCard'

const CardList = ({ removeFromDeck, deckDiv, setDeckDiv, cardData, deckInfo, setdeckInfo }) => {
    console.log(cardData)
    return (
        <div className='DigiCard-list'>
            {Object.keys(cardData).map(data => (
                <DigiCard
                    key={cardData[data].cardnumber}
                    cardnumber={cardData[data].cardnumber}
                    artist={cardData[data].artist}
                    attribute={cardData[data].attribute}
                    card_sets={cardData[data].card_sets}
                    cardrarity={cardData[data].cardrarity}
                    color={cardData[data].color}
                    digi_type={cardData[data].digi_type}
                    dp={cardData[data].dp}
                    evolution_cost={cardData[data].evolution_cost}
                    image_url={cardData[data].image_url}
                    level={cardData[data].level}
                    maineffect={cardData[data].maineffect}
                    name={cardData[data].name}
                    play_cost={cardData[data].play_cost}
                    set_name={cardData[data].set_name}
                    sourceeffect={cardData[data].sourceeffect}
                    stage={cardData[data].stage}
                    type={cardData[data].type}
                    deckInfo={deckInfo}
                    setdeckInfo={setdeckInfo}
                    deckDiv={deckDiv}
                    setDeckDiv={setDeckDiv}
                    removeFromDeck={removeFromDeck}
                />
            ))}
        </div>
    )
}

export default CardList