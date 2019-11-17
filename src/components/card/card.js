import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './card.css';
import * as actions from '../../action';

const Card = ({ card, putCardOnTable }) => {
    return <div onClick={() => putCardOnTable(card)}>{card.name}</div>
}

const mapStateToPros = state => {
    return {
        table: state.table
    }
}

const mapDispatchToProps = dispatch => {
    const { putCardOnTable, removeCard } = bindActionCreators(actions, dispatch);

    return {
        putCardOnTable: (card) => {
            putCardOnTable(card);
            removeCard(card);
        }
    }
}

export default connect(mapStateToPros, mapDispatchToProps)(Card);