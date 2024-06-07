import React, { useEffect, useState, useContext } from 'react'
import NameSearchForm from '../forms/NameSearchForm';
import axios from "axios";
import './DigiCard.css'
import CardList from './CardList';
import DigiBackendApi from '../api/DigiBackendApi';
import UserContext from "../auth/UserContext";
import BuiltDeckList from './BuiltDeckList';
import LoadDecksForm from '../forms/LoadDecksForm';
import DeleteDecksForm from '../forms/DeleteDecksForm';
import CreateDecksForm from '../forms/CreateDecksForm';
import UpdateDecksForm from '../forms/UpdateDecksForm';
import './BuildDeck.css'


const BuildDeck = () => {
    const [deckInfo, setdeckInfo] = useState([]);
    const [targetId, setTargetId] = useState("");
    const CARD_URL = "https://digimoncard.io/api-public/search.php?";
    const [cardRes, setCardRes] = useState("")
    const [deckDiv, setDeckDiv] = useState()
    const [levelCountDiv, setLevelCountDiv] = useState()
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [deckSaved, setDeckSaved] = useState(false)
    const [currentDeckId, setCurrentDeckId] = useState()
    const [currentDeckName, setCurrentDeckName] = useState()

    const [notFound, setNotFound] = useState(false);
    const [builtDeckNotFound, setBuiltDeckNotFound] = useState(false);
    const [builtDeckFound, setBuiltDeckFound] = useState(false);

    const [updateState, setUpdateState] = useState(false);

    useEffect(function () {
        setDeckSaved(false);

        if (currentUser.length > 0) {
            setBuiltDeckFound(true)
        }
        if (currentUser.length === 0) {
            setBuiltDeckFound(false)
        }

        if (!builtDeckNotFound) {
            setBuiltDeckNotFound(true)
        }
        if (updateState) {
            removeFromState()
            setUpdateState(false)
        }
    }, [deckInfo, updateState, deckSaved, currentDeckId])

    async function search(params) {
        try {
            let res = await axios.get(CARD_URL, { params });
            setCardRes(res.data)
            setNotFound(false);
            return res.data
        }
        catch {
            console.log("Not found");
            setNotFound(true);
        }
    }



    // async function searchForAllDecks() {
    //     try {
    //         let decks = await DigiBackendApi.getAllDecks();
    //         // setSavedDecks(decks)
    //     }
    //     catch {
    //         console.log("Not found");
    //     }
    // }

    // feature not added
    // const addToDeckInfoDiv = () => {
    //     const deckInfoP = document.querySelector(".built-deck-info");

    //     let levelCount = deckInfo.reduce((acc, cur) => {
    //         const level = cur.level;
    //         if (acc[level]) {
    //             acc[level]++;
    //         }
    //         else {
    //             acc[level] = 1;
    //         } return acc;
    //     }, {});

    //     let str = Object.keys(levelCount).map(key => `Level ${key}: ${levelCount[key]}`);
    //     deckInfoP.innerText = str.join(", ");
    //     console.log("new levels added to p div", deckInfoP)
    //     setLevelCountDiv(deckInfoP)
    // }


    const removeFromDeck = (e) => {
        let cardId = e.target.id;
        setTargetId(cardId);
        setUpdateState(true)

    }
    function remove(array, value) {
        return array.filter((element) => element.id !== value)
    }
    const removeFromState = () => {
        let newCopy = [...deckInfo]
        let newDeckInfo = remove(newCopy, targetId)
        setdeckInfo(newDeckInfo)
    }




    return (
        <>
            <h2>Deck Editor <img src="https://i.pinimg.com/originals/f7/a5/fd/f7a5fdaf66c24f579b8e68a6798f593c.gif" alt="calumon" width="60px" /></h2>

            <div className='searchForm'>
                <NameSearchForm searchFor={search} />
            </div>

            {builtDeckFound
                ?
                currentUser.map((deck, index) => (<LoadDecksForm key={index} deck={deck} deckInfo={deckInfo} setdeckInfo={setdeckInfo} setCurrentDeckId={setCurrentDeckId} setCurrentDeckName={setCurrentDeckName} />))
                :
                <div className='LoadDecksForm'>
                </div>
            }


            {!notFound
                ?

                <CardList removeFromDeck={removeFromDeck} deckDiv={deckDiv} setDeckDiv={setDeckDiv} cardData={cardRes} deckInfo={deckInfo} setdeckInfo={setdeckInfo} />

                : <p className="lead">Sorry, no results were found!</p>
            }

            <div className="built-deck">
                <p className="built-deck-info"></p>
                <div className="deck-btns">
                    <CreateDecksForm deckInfo={deckInfo} setDeckSaved={setDeckSaved} currentDeckId={currentDeckId} currentDeckName={currentDeckName} />
                    <DeleteDecksForm deckInfo={deckInfo} setdeckInfo={setdeckInfo} setCurrentDeckId={setCurrentDeckId} currentDeckId={currentDeckId} />
                </div>
                <BuiltDeckList savedDeck={deckInfo} removeFromDeck={removeFromDeck} />

            </div>
        </>

    )
}

export default BuildDeck