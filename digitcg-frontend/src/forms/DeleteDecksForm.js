import React, { useContext } from "react";
import DigiBackendApi from "../api/DigiBackendApi";
import UserContext from "../auth/UserContext";

const DeleteDecksForm = ({ deckInfo, setdeckInfo, setCurrentDeckId, currentDeckId }) => {

    const { update, setUpdate } = useContext(UserContext)
    const { currentUsername, setCurrentUsername } = useContext(UserContext)

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (deckInfo.length > 0) {
            try {
                await DigiBackendApi.deleteDeck(currentDeckId, { username: currentUsername })
                setdeckInfo([])
                setCurrentDeckId("")
                setUpdate(true)
            }
            catch {
                console.log("error in deleting")
            }
        }
        else {
            alert("There is nothing to delete!")
        }
    }


    return (
        <div className="delete-btn">
            <form onSubmit={handleSubmit}>
                <button type="submit">Delete Deck</button>
            </form>
        </div>
    )

}

export default DeleteDecksForm
