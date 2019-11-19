import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './button.module.css';
import * as actions from '../../action';

const Button = ({ status, title, endTurn, tableToBeat }) => {

    let btn = <button className={styles['card']} onClick={() => endTurn(status)}>{title}</button>

    return tableToBeat.length !== 0 ? btn : null;
}

const mapStateToPros = state => {
    return {
        status: state.status,
        tableToBeat: state.tableToBeat
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