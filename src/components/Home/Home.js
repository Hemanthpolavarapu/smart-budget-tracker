import React from "react";
import Overview from "../Overview/Overview";
import Transaction from "../Transaction/Transaction";
import "../../css/Home.css";

class Home extends React.Component {
    state = {
        transactions: [],
        expense: 0,
        income: 0
    };

    calculateBalance = () => {
        let exp = 0;
        let inc = 0;
        this.state.transactions.forEach((payload) => {
            if (payload.type === "EXPENSE") {
                exp += payload.amount;
            } else {
                inc += payload.amount;
            }
        });
        this.setState({
            expense: exp,
            income: inc
        });
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.transactions !== this.state.transactions) {
            this.calculateBalance();
        }
    }

    addTransaction = (payload) => {
        this.setState({
            transactions: [...this.state.transactions, payload]
        });
    };

    render() {
        return (
            <div className="home-container">
                <Overview
                    expense={this.state.expense}
                    income={this.state.income}
                    addTransaction={this.addTransaction}
                />
                {this.state.transactions?.length ? (
                    <Transaction transactions={this.state.transactions} />
                ) : null}
            </div>
        );
    }
}

export default Home;