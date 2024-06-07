import React, { useState, useContext } from "react";
import DigiBackendApi from "../api/DigiBackendApi";
import UserContext from "../auth/UserContext";


const UpdateDecksForm = ({ deckInfo, setDeckSaved, currentDeckId, deckname, currentDeckName }) => {

    const { currentUsername, setCurrentUsername } = useContext(UserContext)

    const { update, setUpdate } = useContext(UserContext)


    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let deckstring = JSON.stringify(deckInfo);
        let deckNameFromBar = deckname.trim()
        let data = {}

        if (deckNameFromBar === "") {
            data = { deck: deckstring, deckname: currentDeckName };
        }
        else {

            data = { deck: deckstring, deckname: deckNameFromBar };
        }



        if (deckInfo.length > 0) {
            try {
                await DigiBackendApi.updateDeck(currentDeckId, data);
                setDeckSaved(true);
                setUpdate(true);
            }
            catch { console.log("error in patching") }
        }
        else {
            alert("Error in saving.")
        }


    }


    return (
        <div>
            <form onSubmit={handleSubmit}>

                <button type="submit">Update Deck</button>

            </form>
        </div>
    )

}

export default UpdateDecksForm
