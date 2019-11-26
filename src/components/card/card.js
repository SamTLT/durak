import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './card.module.css';
import * as actions from '../../actions';

const CardToShow = ({ onClick, card, pointer, isAvailable, type, cardSize }) => {

    const setClasses = (pointer, type, isAvailable) => {
        const classes = [styles['card']];

        if (pointer) {
            classes.push(styles['pointer']);
        }

        if (type === 'player') {
            classes.push(styles['card-pop']);
        }

        if (!isAvailable) {
            classes.push(styles['card-unavailable']);
        }

        return classes.join(' ');

    };

    const setBackground = (card, type) => {

        if (type === 'enemy' || type === 'back') {
            return {
                background: `url('/img/back/back.svg')`,
                backgroundSize: "100% 100%"
            }
        }

        if (type === 'clubs' || type === 'diamonds' ||
            type === 'hearts' || type === 'spades') {
            return {
                background: `url('/img/types/${type}.svg')`,
                backgroundSize: "200% 200%",
                backgroundPosition: 'center center',
                border: 'solid 1px black',
                borderRadius: '5px'
            }
        }

        if (card.name) {
            let rank = card.name[0];
            if (rank === '1') {
                rank = 10;
            }

            let adrr = rank + card.type[0].toUpperCase();

            return {
                background: `url('/img/cards/${adrr}.svg')`,
                backgroundSize: "100% 100%",
            }
        } else {
            return {};
        }

    };

    const setSize = (size) => {
        return {
            height: `${size.height}px`,
            width: `${size.width}px`
        }
    }

    const setStyles = (card, type, size) => {
        return { ...setBackground(card, type), ...setSize(size) };
    }

    return (
        <div className={setClasses(pointer, type, isAvailable)}
            onClick={isAvailable ? () => onClick(card) : null}
            style={setStyles(card, type, cardSize)}>
            {/* {card.name} */}
        </div>)
}



const Card = ({ card, putCardOnTable, beatCardOnTable, cardsToUse, status, type, cardSize }) => {

    const selectOnClick = (status, func1, func2) => {
        let onClick;
        if (status === 'attack') {
            onClick = func1;
        }
        if (status === 'defense') {
            onClick = func2;
        }
        return onClick
    };

    let onClick = () => null;
    let isAvailable = true;
    let pointer = true;

    if (type === 'player') {
        const canIUse = cardsToUse.findIndex(item => item.key === card.key);


        if (canIUse === -1 || status === 'hold') {
            isAvailable = false;
            pointer = false;
        }

        onClick = selectOnClick(status, putCardOnTable, beatCardOnTable);

    } else {
        pointer = false;
    }


    return <CardToShow onClick={onClick} card={card} pointer={pointer} isAvailable={isAvailable} type={type} cardSize={cardSize} />

}

const mapStateToPros = state => {
    return {
        table: state.table,
        cardsToUse: state.cardsToUse,
        status: state.status,
        cardSize: state.cardSize
    }
}

const mapDispatchToProps = dispatch => {
    const { putCardOnTable, removeCard, sendCardOnServer, beatCardOnTable } = bindActionCreators(actions, dispatch);

    return {
        putCardOnTable: (card) => {
            // putCardOnTable(card);
            removeCard(card);
            sendCardOnServer(card);
        },

        beatCardOnTable: (card) => {
            // beatCardOnTable(card);
            removeCard(card);
            sendCardOnServer(card);
        }
    }
}

export default connect(mapStateToPros, mapDispatchToProps)(Card);