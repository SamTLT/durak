import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './button.module.css';
import * as actions from '../../actions';

const Button = ({ status, endTurn, toBeat, isActive }) => {

    let label = 'End Turn';
    if (status === 'defense') {
        label = 'Take';
    }

    let onClick = () => endTurn(status);
    let inactive = null;
    if (toBeat === 0) {
        inactive = styles['button-inactive'];
        onClick = null;
        label = 'Your Turn';
    }

    if (!isActive) {
        onClick = null;
    }

    return (
        <button
            className={`${styles['button']} ${inactive}`}
            onClick={onClick}>
            {label}
        </button>
    )
}

const mapStateToPros = state => {
    return {
        status: state.status,
        toBeat: state.tableToBeat.length,
        isActive: state.isBtnActive
    }
}

const mapDispatchToProps = dispatch => {
    const { endTurn } = bindActionCreators(actions, dispatch);

    return {
        endTurn: (status) => {
            endTurn(status)
        }
    }
}

export default connect(mapStateToPros, mapDispatchToProps)(Button);