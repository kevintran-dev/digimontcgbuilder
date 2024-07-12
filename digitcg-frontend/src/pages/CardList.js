import React from 'react'
import DigiCard from './DigiCard'

const CardList = ({ removeFromDeck, deckDiv, setDeckDiv, cardData, deckInfo, setdeckInfo }) => {
    console.log(cardData)
    return (
        <div className='DigiCard-list'>
            {Object.keys(cardData).map(data => (
                <DigiCard
                    key={cardData[data].id}
                    cardnumber={cardData[data].id}
                    attribute={cardData[data].attribute}
                    card_sets={cardData[data].pack}
                    cardrarity={cardData[data].rarity}
                    color={cardData[data].color}
                    color2={cardData[data].color2}
                    digi_type={cardData[data].digi_type}
                    digi_type2={cardData[data].digi_type2}
                    digiform={cardData[data].form}
                    dp={cardData[data].dp}
                    evolution_cost={cardData[data].evolution_cost}
                    pretty_url={cardData[data].pretty_url}
                    level={cardData[data].evolution_level}
                    xros_req={cardData[data].xros_req}
                    maineffect={cardData[data].main_effect}
                    name={cardData[data].name}
                    play_cost={cardData[data].play_cost}
                    set_name={cardData[data].pack}
                    sourceeffect={cardData[data].source_effect}
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