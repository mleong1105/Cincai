import React, { Component } from "react";
import * as firebase from "../../firebase/firebase";
import moment from "moment";
import * as utils from "./../Util";

class SavingRecordRow extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    // deleting the loan
    handleClick(e) {
        var message = "Once deleted you cannot get back this record , are you sure you want to delete";
        if (window.confirm(message)) {
            const recordAmount = Number(this.props.savingRecord.value.recordAmount)
            
            firebase.db.ref(`savingsTable/${this.props.user.uid}/${this.props.savingId}/saving`).once("value", snapshot => {
                const data = snapshot.val();
                const goalAmount = Number(data.goalAmount);
                const savingAmount = Number(data.savingAmount);
            
                // Update the data here
                firebase.db.ref(`savingsTable/${this.props.user.uid}/${this.props.savingId}/saving`).update({
                    goalAmount: goalAmount + recordAmount,
                    savingAmount: savingAmount - recordAmount
                });
            });

            firebase.db.ref(`savingsTable/${this.props.user.uid}/${this.props.savingId}/record/${this.props.savingRecord.key}`).remove();
        }
    }

    render() {
        const savingRecord = this.props.savingRecord.value
        const conditionForDay = savingRecord.day || moment(savingRecord.date).day();

        if (conditionForDay) {
            var getDay = conditionForDay;
            var day;

            switch (getDay) {
                case 0:
                    day = "Sunday";
                    break;
                case 1:
                    day = "Monday";
                    break;
                case 2:
                    day = "Tuesday";
                    break;
                case 3:
                    day = "Wednesday";
                    break;
                case 4:
                    day = "Thursday";
                    break;
                case 5:
                    day = "Friday";
                    break;
                case 6:
                    day = "Saturday";
                    break;
                default:
                    day = "sunday";
            }
        }

        return (
            <tr key={this.props.savingRecord.key} id={this.props.savingRecord.key}>
                <td data-th="No">
                    {this.props.num + 1}
                </td>
                <td data-th="Date">
                    {savingRecord.date} <span className="expense-day"> {day || "Sunday"}</span>
                </td>
                <td data-th="Amount">
                    <i className={`fa ${utils.setCurrencyIcon(this.props.settings.currency)}`} aria-hidden="true" />{" "}
                    {savingRecord.recordAmount.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                </td>
                <td data-th="Delete">
                    <button className="delete-btn" onClick={this.handleClick}>
                        <i className="fa fa-trash-o" aria-hidden="true" /> delete
                    </button>
                </td>
            </tr>
        );
    }
}

export default SavingRecordRow;
