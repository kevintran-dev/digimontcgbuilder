import React from "react";
import { render } from "@testing-library/react";
import { UserProvider } from "../testUtils";
import CardList from "./CardList";

it("matches snapshot", function () {

    let card = [{ artist: "ryuda_1", attribute: "Vaccine", card_sets: ["ST-7: Starter Deck Gallantmon", "BT01-03: Release Special Booster Ver.1.0", "BTC-01: Booster Ultimate Evolution", "ST-7: Starter Deck Gallantmon", "BT-01: Booster New Evolution"], cardnumber: "BT1-009", cardrarity: "Common", color: "Red", digi_type: "Mini Dragon", dp: 3000, evolution_cost: 0, image_url: "https://images.digimoncard.io/images/cards/BT1-009.jpg", level: 3, maineffect: null, name: "Monodramon", play_cost: 2, set_name: "ST-7: Starter Deck Gallantmon", soureeffect: null, stage: "Rookie", type: "Digimon" }]

    const { asFragment } = render(
        <UserProvider>
            <CardList cardData={card} />
        </UserProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
});

