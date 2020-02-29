import EnemyCards from "./enemy-cards";
import { connect } from "react-redux";

const mapStateToPros = state => {
  return {
    cardSize: state.cardSize,
    num: state.enemyCardsNum
  };
};

export default connect(mapStateToPros)(EnemyCards);
