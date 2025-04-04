import React from "react";
import "../../css/Overview.css";

class AddTransactionView extends React.Component {
  state = {
    amount: "",
    desc: "",
    type: "EXPENSE"
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    const { amount, desc, type } = this.state;
    if (amount && desc) {
      this.props.addTransaction({
        id: Date.now(),
        amount: Number(amount),
        desc,
        type,
      });
      this.setState({
        amount: "",
        desc: ""
      });
    }
  };

  render() {
    const containerClassName = this.props.isAddTxnVisible ? 
      "add-transaction-container visible" : "add-transaction-container";
    
    return (
      <div className={containerClassName}>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            placeholder="Amount"
            type="number"
            name="amount"
            value={this.state.amount}
            onChange={this.handleInputChange}
            required
          />
          <input
            placeholder="Description"
            name="desc"
            value={this.state.desc}
            onChange={this.handleInputChange}
            required
          />
          <div className="radio-box">
            <input
              type="radio"
              id="expense"
              name="type"
              value="EXPENSE"
              checked={this.state.type === "EXPENSE"}
              onChange={this.handleInputChange}
            />
            <label htmlFor="expense">Expense</label>
            <input
              type="radio"
              id="income"
              name="type"
              value="INCOME"
              checked={this.state.type === "INCOME"}
              onChange={this.handleInputChange}
            />
            <label htmlFor="income">Income</label>
          </div>
        </form>
        <div 
          className="add-transaction-btn"
          onClick={this.handleSubmit}
        >
          Add Transaction
        </div>
      </div>
    );
  }
}

class Overview extends React.Component {
  state = {
    isAddTxnVisible: false
  };

  toggleAddTXn = () => {
    this.setState((prevState) => ({
      isAddTxnVisible: !prevState.isAddTxnVisible
    }));
  };

  render() {
    const { income, expense } = this.props;
    const balance = income - expense;
    
    return (
      <div className="overview-container">
        <div className="balance-box">
          Balance: ₹{balance}
          <div className="add-transaction-btn" onClick={this.toggleAddTXn}>
            {this.state.isAddTxnVisible ? "CANCEL" : "ADD"}
          </div>
        </div>
        {this.state.isAddTxnVisible && (
          <AddTransactionView
            isAddTxnVisible={this.state.isAddTxnVisible}
            addTransaction={(payload) => {
              this.props.addTransaction(payload);
              this.toggleAddTXn();
            }}
          />
        )}
        <div className="expense-container">
          <div className="expense-box">
            Expense<span> ₹{expense}</span>
          </div>
          <div className="expense-box income">
            Income<span> ₹{income}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Overview;