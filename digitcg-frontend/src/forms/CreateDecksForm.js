import React, { useState, useContext } from "react";
import DigiBackendApi from "../api/DigiBackendApi";
import UserContext from "../auth/UserContext";
import UpdateDecksForm from "./UpdateDecksForm";

const CreateDecksForm = ({ deckInfo, setDeckSaved, currentDeckId, currentDeckName }) => {
    const [formData, setFormData] = useState("");


    const { currentUsername, setCurrentUsername } = useContext(UserContext)

    const { update, setUpdate } = useContext(UserContext)

    const handleChange = (evt) => {
        setFormData(evt.target.value);
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let deckstring = JSON.stringify(deckInfo);
        let deckName = formData.trim()


        let data = { deck: deckstring, username: currentUsername, deckname: deckName };


        if (deckInfo.length > 0) {
            try {
                await DigiBackendApi.createDeck(data);
                setDeckSaved(true);
                setUpdate(true);

            }
            catch { console.log("error in posting") }
        }
        else {
            alert("Please add cards.")
        }


    }


    return (
        <div className="create-new-button">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="DeckName"></label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="DeckName"
                        placeholder="Name your deck!"
                        value={formData}
                        id="submit"
                    />
                </div>
                <button type="submit">Create New Deck</button>
            </form>
            <UpdateDecksForm deckInfo={deckInfo} setDeckSaved={setDeckSaved} currentDeckId={currentDeckId} deckname={formData} currentDeckName={currentDeckName} />

        </div>
    )

}

export default CreateDecksForm
