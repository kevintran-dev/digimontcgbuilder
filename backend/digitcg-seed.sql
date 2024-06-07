-- both test users have the password "password"

INSERT INTO users (username, password)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q');

INSERT INTO decks (deck, username, deckname)
VALUES ('[{"cardnumber":"BT11-001","level":2,"type":"Digi-Egg","src":"https://images.digimoncard.io/images/cards/BT11-001.jpg","id":"dca81367-e025-4214-b04e-e86a0c0b6f9f"},{"cardnumber":"BT11-002","level":2,"type":"Digi-Egg","src":"https://images.digimoncard.io/images/cards/BT11-002.jpg","id":"009d02a5-acee-4379-aa94-f3a70f06fcf8"},{"cardnumber":"BT11-003","level":2,"type":"Digi-Egg","src":"https://images.digimoncard.io/images/cards/BT11-003.jpg","id":"cfeafe7f-2a3f-4036-9e18-620b4605b59f"},{"cardnumber":"BT11-004","level":2,"type":"Digi-Egg","src":"https://images.digimoncard.io/images/cards/BT11-004.jpg","id":"0329a814-bf56-4088-bc58-a56b65d5534c"},{"cardnumber":"BT11-005","level":2,"type":"Digi-Egg","src":"https://images.digimoncard.io/images/cards/BT11-005.jpg","id":"10defd34-d4a5-4250-8a78-0dfa2eca1a4a"}]',
'testuser', 'minimal')

-- , ('[{"cardId":"BT1-011","level":3,"type":"Digimon"}]','testuser'


-- [{cardnumber: 'BT11-001', level: 2, type: 'Digi-Egg', src: 'https://images.digimoncard.io/images/cards/BT11-001.jpg', id: 'dca81367-e025-4214-b04e-e86a0c0b6f9f'},
-- {cardnumber: 'BT11-002', level: 2, type: 'Digi-Egg', src: 'https://images.digimoncard.io/images/cards/BT11-002.jpg', id: '009d02a5-acee-4379-aa94-f3a70f06fcf8'},
-- {cardnumber: 'BT11-003', level: 2, type: 'Digi-Egg', src: 'https://images.digimoncard.io/images/cards/BT11-003.jpg', id: 'cfeafe7f-2a3f-4036-9e18-620b4605b59f'},
-- {cardnumber: 'BT11-004', level: 2, type: 'Digi-Egg', src: 'https://images.digimoncard.io/images/cards/BT11-004.jpg', id: '0329a814-bf56-4088-bc58-a56b65d5534c'},
-- {cardnumber: 'BT11-005', level: 2, type: 'Digi-Egg', src: 'https://images.digimoncard.io/images/cards/BT11-005.jpg', id: '10defd34-d4a5-4250-8a78-0dfa2eca1a4a'}]