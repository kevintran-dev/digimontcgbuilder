import React from 'react'
import BuiltCard from './BuiltCard'

const BuiltDeckList = ({ savedDeck, removeFromDeck }) => {

    return (
        <div className='BuiltDeck-list'>
            {Object.keys(savedDeck).map(data => (
                <BuiltCard
                    key={savedDeck[data].id}
                    id={savedDeck[data].id}
                    image_url={savedDeck[data].src}
                    level={savedDeck[data].level}
                    type={savedDeck[data].type}
                    cardnumber={savedDeck[data].cardnumber}
                    removeFromDeck={removeFromDeck}
                />
            ))}
        </div>
    )
}

export default BuiltDeckList