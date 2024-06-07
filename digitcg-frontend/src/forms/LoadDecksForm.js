import React from "react";

const LoadDecksForm = ({ deck, setdeckInfo, setCurrentDeckId, setCurrentDeckName }) => {

    let parsedDeck = JSON.parse(deck.deck)

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setdeckInfo(parsedDeck)
        setCurrentDeckName(deck.deckname)
        setCurrentDeckId(deck.id)
        // console.log("submited parsedDeck from currentUser from loadDecks")
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* {console.log(parsedDeck, deck.id, deck.username)} */}
                <button type="submit" className="loadBtn">Load "{deck.deckname}" Deck</button>

            </form>
        </div>
    )

}

export default LoadDecksForm
