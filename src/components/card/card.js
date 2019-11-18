import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './card.module.css';
import * as actions from '../../action';

const Card = ({ card, putCardOnTable, whatCanUse, status }) => {

    const canIUse = whatCanUse.findIndex(item => item.key === card.key);

    if (canIUse === -1 || status === 'hold') {
        return <div className={styles['card-unavable']} >{card.name}</div>
    }




    return <div className={styles['card']} onClick={() => putCardOnTable(card)}>{card.name}</div>
}

const mapStateToPros = state => {
    return {
        table: state.table,
        whatCanUse: state.whatCanUse,
        status: state.status
    }
}

const mapDispatchToProps = dispatch => {
    const { putCardOnTable, removeCard, sendCardOnServer } = bindActionCreators(actions, dispatch);

    return {
        putCardOnTable: (card) => {
            putCardOnTable(card);
            removeCard(card);
            sendCardOnServer(card);
        }
    }
}

export default connect(mapStateToPros, mapDispatchToProps)(Card);