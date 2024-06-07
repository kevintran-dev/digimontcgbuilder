import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router"
import { UserProvider } from "../testUtils";
import BuildDeck from "./BuildDeck";
import CardList from "./CardList";
import BuiltDeckList from "./BuiltDeckList";

it("renders without crashing", function () {
    let card = [{ artist: "ryuda_1", attribute: "Vaccine", card_sets: ["ST-7: Starter Deck Gallantmon", "BT01-03: Release Special Booster Ver.1.0", "BTC-01: Booster Ultimate Evolution", "ST-7: Starter Deck Gallantmon", "BT-01: Booster New Evolution"], cardnumber: "BT1-009", cardrarity: "Common", color: "Red", digi_type: "Mini Dragon", dp: 3000, evolution_cost: 0, image_url: "https://images.digimoncard.io/images/cards/BT1-009.jpg", level: 3, maineffect: null, name: "Monodramon", play_cost: 2, set_name: "ST-7: Starter Deck Gallantmon", soureeffect: null, stage: "Rookie", type: "Digimon" }]
    let savedDeck = [{ "cardnumber": "BT11-001", "level": 2, "type": "Digi-Egg", "src": "https://images.digimoncard.io/images/cards/BT11-001.jpg", "id": "dca81367-e025-4214-b04e-e86a0c0b6f9f" }, { "cardnumber": "BT11-002", "level": 2, "type": "Digi-Egg", "src": "https://images.digimoncard.io/images/cards/BT11-002.jpg", "id": "009d02a5-acee-4379-aa94-f3a70f06fcf8" }, { "cardnumber": "BT11-003", "level": 2, "type": "Digi-Egg", "src": "https://images.digimoncard.io/images/cards/BT11-003.jpg", "id": "cfeafe7f-2a3f-4036-9e18-620b4605b59f" }, { "cardnumber": "BT11-004", "level": 2, "type": "Digi-Egg", "src": "https://images.digimoncard.io/images/cards/BT11-004.jpg", "id": "0329a814-bf56-4088-bc58-a56b65d5534c" }, { "cardnumber": "BT11-005", "level": 2, "type": "Digi-Egg", "src": "https://images.digimoncard.io/images/cards/BT11-005.jpg", "id": "10defd34-d4a5-4250-8a78-0dfa2eca1a4a" }]
    render(<CardList cardData={card} />);
    render(<BuiltDeckList savedDeck={savedDeck} />)
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <BuildDeck />
            </UserProvider>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})

