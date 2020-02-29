import Table from "./table";
import { connect } from "react-redux";

const mapStateToPros = state => {
  return {
    tableToBeat: state.tableToBeat,
    tableBeated: state.tableBeated
    // tableToBeat: state.cards,
    // tableBeated: state.cards
  };
};

export default connect(mapStateToPros)(Table);
