import Logic from './server/logic';

export const setCards = (payload) => ({ type: 'SET_CARDS', payload });

export const setDeck = (payload) => ({ type: 'SET_DECK', payload });

export const setEnemyCards = (payload) => ({ type: 'SET_ENEMY_CARDS', payload });

export const setStatus = (payload) => ({ type: 'SET_STATUS', payload });

export const setEnemyStatus = (payload) => ({ type: 'SET_ENEMY_STATUS', payload });

export const setTrump = (payload) => ({ type: 'SET_TRUMP', payload });

export const setCardsToUse = (payload) => ({ type: 'SET_CARDS_TO_USE', payload });

export const cleanTable = () => ({ type: 'CLEAN_TABLE' });

export const putCardOnTable = (payload) => {
    return {
        type: 'PUT_CARD_ON_TABLE',
        payload
    }
};


export const beatCardOnTable = (payload) => {
    return {
        type: 'BEAT_CARD_ON_TABLE',
        payload
    }
};

export const setInitials = (deck) => (dispatch, getState) => {
    dispatch(setCards(deck.myCards));
    dispatch(setDeck(deck.deck));
    dispatch(setEnemyCards(deck._enemyCards));
    dispatch(setTrump(deck.getTrump()));
    dispatch(setCardsToUse(deck.myCards));
}

export const endTurn = (status) => (dispatch, getState) => {

    const takeCards = (cards) => {

        const { deck } = getState();

        const cardsToTake = [];
        const cardsNum = 6 - cards.length;

        for (let i = 0; i < cardsNum; i++) {
            cardsToTake.push(deck.pop());
        }

        dispatch(setDeck([...deck]));

        console.log(cardsToTake);
        console.log(cardsNum);

        return cardsToTake;

    }

    if (status === 'attack') {
        const logic = new Logic();
        console.log('hmmmm');
        const { cards, enemyCards, enemyStatus, tableToBeat, tableBeated } = getState();

        let cardsNew = [...cards, ...takeCards(cards)];
        dispatch(setCards(cardsNew));

        let enemyCardsNew;
        if (enemyStatus === 'defeated') {
            enemyCardsNew = [...enemyCards, ...tableToBeat, ...tableBeated];

            const whatCanUse = logic.cardsToUse([], [], getState().cards, getState().status);
            console.log(whatCanUse);
            dispatch(setCardsToUse(whatCanUse.cardsToUse));
            dispatch(setEnemyStatus('defense'));

        }

        if (enemyStatus === 'defense') {
            enemyCardsNew = [...enemyCards, ...takeCards(enemyCards)];
            dispatch(setStatus('defense'));
            dispatch(setEnemyStatus('attack'));
        }

        console.log([tableToBeat.length, tableBeated.length]);

        dispatch(setEnemyCards(enemyCardsNew));
        dispatch(cleanTable());
        dispatch(receiveCardFromServer());

    }

    if (status === 'defense') {
        const logic = new Logic();
        console.log('hmmmm defffff');
        const { cards, enemyCards, tableToBeat, tableBeated } = getState();

        if (tableToBeat.length === tableBeated.length) {
            let enemyCardsNew = [...enemyCards, ...takeCards(enemyCards)];
            dispatch(setEnemyCards(enemyCardsNew));

            let cardsNew = [...cards, ...takeCards(cards)];
            dispatch(setCards(cardsNew));

            const whatCanUse = logic.cardsToUse([], [], getState().cards, 'attack');
            console.log(whatCanUse);
            dispatch(setCardsToUse(whatCanUse.cardsToUse));
            dispatch(setStatus('attack'));
            dispatch(setEnemyStatus('defense'));

            dispatch(cleanTable());
        }

        if (tableToBeat.length > tableBeated.length) {
            let cardsNew = [...cards, ...tableToBeat, ...tableBeated];
            dispatch(setCards(cardsNew));

            let enemyCardsNew = [...enemyCards, ...takeCards(enemyCards)];
            dispatch(setEnemyCards(enemyCardsNew));

            dispatch(cleanTable());
            dispatch(receiveCardFromServer());
        }

        console.log([tableToBeat.length, tableBeated.length]);



    }



}

export const removeEnemyCard = (cardToRemove) => (dispatch, getState) => {

    const { enemyCards } = getState();
    const key = cardToRemove.key;
    const idx = enemyCards.findIndex(item => item.key === key);

    if (idx === -1) {
        return;
    }

    const newCards = [...enemyCards.slice(0, idx), ...enemyCards.slice(idx + 1)];

    dispatch(setEnemyCards(newCards));
}

export const removeCard = (cardToRemove) => (dispatch, getState) => {

    const { cards } = getState();
    const key = cardToRemove.key;
    const idx = cards.findIndex(item => item.key === key);

    if (idx === -1) {
        return;
    }

    const newCards = [...cards.slice(0, idx), ...cards.slice(idx + 1)];

    dispatch(setCards(newCards));
}

export const sendCardOnServer = (card) => (dispatch, getState) => {

    const logic = new Logic();

    const { enemyCards, enemyStatus, cards, tableToBeat, tableBeated, status } = getState();

    const whatCanUse = logic.cardsToUse(tableToBeat, tableBeated, cards, status);
    console.log(whatCanUse);

    dispatch(setCardsToUse(whatCanUse.cardsToUse));

    if (status === 'attack') {
        setTimeout(() => {
            const response = logic.enemyAction(enemyCards, tableToBeat, tableBeated, status, enemyStatus);

            console.log('lol');
            console.log(response);
            if (response.card) {
                dispatch(beatCardOnTable(response.card));
                dispatch(removeEnemyCard(response.card));

                const whatCanUse2 = logic.cardsToUse(getState().tableToBeat, getState().tableBeated, getState().cards, getState().status);
                console.log(whatCanUse2);
                console.log(getState().cards);

                dispatch(setCardsToUse(whatCanUse2.cardsToUse));
            } else {
                dispatch(setEnemyStatus(response.status));
            }

        }, 0);
    }

    if (status === 'defense') {
        setTimeout(() => {
            const response = logic.enemyAction(enemyCards, tableToBeat, tableBeated, status, enemyStatus);

            console.log('lol');
            console.log(response);
            if (response.card) {
                dispatch(putCardOnTable(response.card));
                dispatch(removeEnemyCard(response.card));

                const whatCanUse2 = logic.cardsToUse(getState().tableToBeat, getState().tableBeated, getState().cards, getState().status);
                console.log(whatCanUse2);
                console.log(getState().cards);

                dispatch(setCardsToUse(whatCanUse2.cardsToUse));
            } else {
                dispatch(setEnemyStatus(response.status));
            }

        }, 0);
    }
}

export const receiveCardFromServer = () => (dispatch, getState) => {

    const logic = new Logic();

    const { enemyCards, enemyStatus, cards, tableToBeat, tableBeated, status } = getState();

    // const whatCanUse = logic.cardsToUse(tableToBeat, tableBeated, cards, status);
    // console.log(whatCanUse);

    console.log('receivecard', status);

    // dispatch(setCardsToUse(whatCanUse.cardsToUse));

    if (status === 'defense') {
        setTimeout(() => {
            const response = logic.enemyAction(enemyCards, tableToBeat, tableBeated, status, enemyStatus);

            console.log('lol');
            console.log(response);
            if (response.card) {
                dispatch(putCardOnTable(response.card));
                dispatch(removeEnemyCard(response.card));

                const whatCanUse2 = logic.cardsToUse(getState().tableToBeat, [], getState().cards, getState().status);
                console.log(whatCanUse2);
                console.log(getState().cards);

                dispatch(setCardsToUse(whatCanUse2.cardsToUse));
            } else {
                dispatch(setEnemyStatus(response.status));
            }

        }, 0);
    }

}



