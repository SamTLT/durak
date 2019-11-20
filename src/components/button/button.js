import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './button.module.css';
import * as actions from '../../actions';

const Button = ({ status, endTurn, toBeat }) => {

    let label = 'End Turn';
    if (status === 'defense') {
        label = 'Take';
    }

    let btn = <button
        className={styles['button']}
        onClick={() => endTurn(status)}>
        {label}
    </button>

    return toBeat !== 0 ? btn : null;
}

const mapStateToPros = state => {
    return {
        status: state.status,
        toBeat: state.tableToBeat.length
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