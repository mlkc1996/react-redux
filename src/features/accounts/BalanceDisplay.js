import { connect } from "react-redux";


function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default connect((state) => ({ balance: state?.account?.balance }))(BalanceDisplay);
