import React from "react";
import "../../css/Transaction.css";

class TransactionCell extends React.Component {
  render() {
    const { payload } = this.props;
    const cellClassName = payload?.type === "EXPENSE" ? 
      "transaction-cell expense-cell" : "transaction-cell income-cell";
    
    return (
      <div className={cellClassName}>
        <span>{payload?.desc}</span>
        <span>₹{payload?.amount}</span>
      </div>
    );
  }
}

class Transaction extends React.Component {
  state = {
    searchText: "",
    filteredTransaction: []
  };

  componentDidMount() {
    this.setState({ filteredTransaction: this.props.transactions });
  }

  filterData = (searchText) => {
    if (!searchText || !searchText.trim().length) {
      return this.props.transactions;
    }
    
    const searchTerm = searchText.toLowerCase().trim();
    return this.props.transactions.filter(payload => 
      payload.desc.toLowerCase().includes(searchTerm)
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.transactions !== this.props.transactions) {
      this.setState({ 
        filteredTransaction: this.filterData(this.state.searchText) 
      });
    }
  }

  handleSearchChange = (e) => {
    const value = e.target.value;
    this.setState({ 
      searchText: value,
      filteredTransaction: this.filterData(value)
    });
  };

  render() {
    const { filteredTransaction } = this.state;
    
    return (
      <div className="transaction-container">
        Transactions
        <input
          placeholder="Search"
          onChange={this.handleSearchChange}
        />
        {filteredTransaction?.map((payload) => (
          <TransactionCell key={payload.id} payload={payload} />
        ))}
      </div>
    );
  }
}

export default Transaction;