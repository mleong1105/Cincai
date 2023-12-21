import React from "react";
import SavingRecord from "./SavingRecord";

import "../../assets/css/table.css";

const SavingRecordTable = props => {
    const nightMode = { background: props.settings ? (props.settings.mode === "night" ? "#212529" : "auto") : "auto" };

    return (
        <table
            className="table table-striped table-bordered table-dark rwd-table loan-table mobileNoPadding"
            style={nightMode}
        >
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <SavingRecord
                    savings={props.savings}
                    authUser={props.authUser}
                    key={Math.random() * 100}
                    settings={props.settings}
                />
            </tbody>
        </table>
    );
};

export default SavingRecordTable;
