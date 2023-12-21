import React from "react";
import SavingRecordRow from "./SavingRecordRow";
import Loader from "../Common/Loader";
import * as utils from "../Util";

const SavingRecord = props => {
    const savings = props.savings;
    const currentUser = props.authUser;
    const settings = props.settings;

    if (!savings || !currentUser || !settings) {
        return (
            <tr>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
                <td>
                    <Loader />
                </td>
            </tr>
        );
    }

    if (savings && currentUser && settings) {
        const eachExpense = utils.eachExpense(savings.value.record);
        const thisSavingRecord = utils.currentUsersExpenses(eachExpense, currentUser)

        if (thisSavingRecord.length) {
            return thisSavingRecord.map(function (elem, i) {

                return (
                    <SavingRecordRow
                        user={props.authUser}
                        savingRecord={elem}
                        num={i}
                        key={i}
                        savingId={savings.key}
                        settings={props.settings}
                    />
                );
            });
        } else {
            return (
                <tr>
                    <td>
                        <div className="alert alert-info" role="alert">
                            You haven't made any savings to this saving card , add a saving by inserting an amount and press 
                            Save icon button in the saving card
                        </div>
                    </td>
                </tr>
            );
        }
    }
};

export default SavingRecord;
