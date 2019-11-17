import React from 'react';
import { connect } from 'react-redux';

import './table.css';

const Table = ({ tableToBeat, tableBeated }) => {
    return <div>
        {tableToBeat.map(card => {
            return card.name;
        })}
        {tableBeated.map(card => {
            return card.name;
        })}
    </div>
}

const mapStateToPros = state => {
    return {
        tableToBeat: state.tableToBeat,
        tableBeated: state.tableBeated
    }
}

export default connect(mapStateToPros)(Table);