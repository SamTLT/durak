import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './card.module.css';
import * as actions from '../../action';

const CardToShow = ({ onClick, card, pointer, isAvailable }) => {

    return <div className={`${styles['card']} 
                            ${pointer ? styles['pointer'] : null} 
                            ${isAvailable ? null : styles['card-unavailable']}`}
        onClick={onClick ? () => onClick(card) : null}
        style={setBackground(card)}>
        {/* {card.name} */}
    </div>
}

const setBackground = (card) => {

    if (card.name) {
        let rank = card.name[0];
        if (rank === '1') {
            rank = 10;
        }

        let adrr = rank + card.type[0].toUpperCase();

        return {
            background: `url('/img/cards/${adrr}.svg')`,
            backgroundSize: "100% 100%"
        }
    } else {
        return {};
    }

}

const selectOnClick = (status, func1, func2) => {
    let onClick;
    if (status === 'attack') {
        onClick = func1;
    }
    if (status === 'defense') {
        onClick = func2;
    }
    return onClick
}

const Card = ({ card, putCardOnTable, beatCardOnTable, cardsToUse, status, type }) => {


    console.log(type);

    const canIUse = cardsToUse.findIndex(item => item.key === card.key);
    let isAvailable = true;

    if (canIUse === -1 || status === 'hold') {
        isAvailable = false;
    }

    const onClick = selectOnClick(status, putCardOnTable, beatCardOnTable);

    return <CardToShow onClick={onClick} card={card} pointer={true} isAvailable={isAvailable} />

}

const mapStateToPros = state => {
    return {
        table: state.table,
        cardsToUse: state.cardsToUse,
        status: state.status
    }
}

const mapDispatchToProps = dispatch => {
    const { putCardOnTable, removeCard, sendCardOnServer, beatCardOnTable } = bindActionCreators(actions, dispatch);

    return {
        putCardOnTable: (card) => {
            putCardOnTable(card);
            removeCard(card);
            sendCardOnServer(card);
        },

        beatCardOnTable: (card) => {
            beatCardOnTable(card);
            removeCard(card);
            sendCardOnServer(card);
        }
    }
}

export default connect(mapStateToPros, mapDispatchToProps)(Card);