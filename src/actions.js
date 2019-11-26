import Logic from './server/logic';
import Server from './server/server';

const server = new Server();

export const setCards = (payload) => ({ type: 'SET_CARDS', payload });

export const setDeck = (payload) => ({ type: 'SET_DECK', payload });

export const setCardsLeftInDeck = (payload) => ({ type: 'SET_CARDS_LEFT_IN_DECK', payload });

export const setEnemyCards = (payload) => ({ type: 'SET_ENEMY_CARDS', payload });

export const setEnemyCardsNumber = (payload) => ({ type: 'SET_ENEMY_CARDS_NUMBER', payload });

export const setStatus = (payload) => ({ type: 'SET_STATUS', payload });

export const setEnemyStatus = (payload) => ({ type: 'SET_ENEMY_STATUS', payload });

export const setTrump = (payload) => ({ type: 'SET_TRUMP', payload });

export const setCardsToUse = (payload) => ({ type: 'SET_CARDS_TO_USE', payload });

export const cleanTable = () => ({ type: 'CLEAN_TABLE' });

export const setWinner = (payload) => ({ type: 'SET_WINNER', payload });

export const setCardSize = (payload) => ({ type: 'SET_CARD_SIZE', payload });

export const putCardsOnTable = (payload) => {
    return {
        type: 'PUT_CARDS_ON_TABLE',
        payload
    }
};

export const beatCardOnTable = (payload) => {
    return {
        type: 'BEAT_CARD_ON_TABLE',
        payload
    }
};

export const setInitials = (width) => (dispatch, getState) => {
    server.start().then(res => {
        dispatch(setCards(res.cards));
        dispatch(setEnemyCardsNumber(res.enemyCardsNum));
        dispatch(setTrump(res.trump));
        dispatch(setCardsToUse(res.cardsToUse.cardsToUse));
        dispatch(setCardsLeftInDeck(res.cardsLeft));
        dispatch(setStatus(res.status));
        dispatch(putCardsOnTable(res.tableToBeat));
        dispatch(beatCardOnTable(res.tableBeated));
        dispatch(setWinner(res.winner));
    });
    dispatch(processCardSize(width));
}

export const processCardSize = (width) => (dispatch, getState) => {

    let size = {
        height: 150,
        width: 100
    }

    if (width >= 992) {
        size.height = 150;
        size.width = 100;
    }


    if (768 <= width && width <= 991) {
        size.height = Math.round(size.height * 0.9);
        size.width = Math.round(size.width * 0.9);
    }

    if (480 <= width && width <= 767) {
        size.height = Math.round(size.height * 0.8);
        size.width = Math.round(size.width * 0.8);
    }

    if (320 <= width && width <= 479) {
        size.height = Math.round(size.height * 0.7);
        size.width = Math.round(size.width * 0.7);
    }

    if (getState().cardSize.height !== size.height) {
        dispatch(setCardSize(size));
    }


}

export const checkWinner = (user, cards) => (dispatch, getState) => {

    const { deck } = getState();

    if (deck.length === 0 && cards.length === 0) {
        dispatch(setWinner(user));
    }

}

export const endTurn = () => (dispatch, getState) => {

    server.endTurn(getState().status).then(res => {
        console.log(res);
        dispatch(setCards(res.cards));
        dispatch(setEnemyCardsNumber(res.enemyCardsNum));
        dispatch(setCardsToUse(res.cardsToUse));
        dispatch(putCardsOnTable(res.tableToBeat));
        dispatch(beatCardOnTable(res.tableBeated));
        dispatch(setStatus(res.userStatus));
        dispatch(setCardsLeftInDeck(res.cardsLeft));
        dispatch(setWinner(res.winner));
    });

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

    const { status } = getState();
    if (status === 'attack') {
        dispatch(putCardsOnTable([...getState().tableToBeat, card]));
    }

    if (status === 'defense') {
        dispatch(beatCardOnTable([...getState().tableBeated, card]));
    }

    server.sendCard(card).then(res => {
        console.log(res);
        dispatch(setCards(res.cards));
        dispatch(setEnemyCardsNumber(res.enemyCardsNum));
        dispatch(setCardsToUse(res.cardsToUse));
        dispatch(putCardsOnTable(res.tableToBeat));
        dispatch(beatCardOnTable(res.tableBeated));
        dispatch(setStatus(res.userStatus));
        dispatch(setCardsLeftInDeck(res.cardsLeft));
        dispatch(setWinner(res.winner));
    });
}

export const receiveCardFromServer = () => (dispatch, getState) => {

    const logic = new Logic();

    const { enemyCards, enemyStatus, tableToBeat, tableBeated, status } = getState();

    if (status === 'defense') {
        setTimeout(() => {
            const response = logic.enemyAction(enemyCards, tableToBeat, tableBeated, status, enemyStatus);

            if (response.card) {
                dispatch(putCardsOnTable(response.card));
                dispatch(removeEnemyCard(response.card));

                const whatCanUse2 = logic.cardsToUse(getState().tableToBeat, [], getState().cards, getState().status);

                dispatch(setCardsToUse(whatCanUse2.cardsToUse));
            } else {
                dispatch(setEnemyStatus(response.status));
            }

        }, 0);
    }

}



