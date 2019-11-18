import React from 'react';
import { connect } from 'react-redux';

import './table.css';

const Table = ({ tableToBeat, tableBeated }) => {

    const toBeat = tableToBeat.map(card => {
        return <li key={card.key}>{card.name}</li>;
    });

    const beated = tableBeated.map(card => {
        return <li key={card.key}>{card.name}</li>
    });

    return <ul>
        {toBeat}
        {beated}
    </ul>
}

const mapStateToPros = state => {
    return {
        tableToBeat: state.tableToBeat,
        tableBeated: state.tableBeated
    }
}

export default connect(mapStateToPros)(Table);