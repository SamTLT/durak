import React from 'react';
import { connect } from 'react-redux';

import Card from '../card';

import styles from './table.module.css';

const Table = ({ tableToBeat, tableBeated }) => {

    const toBeat = tableToBeat.map(card => {
        return <div key={card.key} className={styles['card-to-beat']}><Card card={card} /></div>;
    });

    const beated = tableBeated.map(card => {
        return <div key={card.key} className={styles['card-beated']}><Card card={card} /></div>
    });

    const toShow = toBeat.map((cardToBeat, i) => {
        return <div className='couple' key={cardToBeat.key}>{cardToBeat} {beated[i] ? beated[i] : null}</div>
    })

    return (<div className={styles['table']}>

        <div className={styles['couples']}>
            {toShow}
        </div>
    </div >
    )
}

const mapStateToPros = state => {
    return {
        tableToBeat: state.tableToBeat,
        tableBeated: state.tableBeated
    }
}

export default connect(mapStateToPros)(Table);