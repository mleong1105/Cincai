import React from "react";
import SavingRecordTable from "./SavingRecordTable";

const ViewSavingPopup = props => {
    const nightModePopup = {
        backgroundColor: props.settings ? (props.settings.mode === "night" ? "#857861" : "#fff") : "#fff"
    };
    return (
        <div className="popup">
            <div className="popup_inner_saving" style={nightModePopup}>
                <div className="addExpenseHeader"> View Saving Record </div>
                <SavingRecordTable authUser={props.user} savings={props.savings} settings={props.settings} />
                <button id="closePopup" onClick={props.closePopup}>
                    {" "}
                    X{" "}
                </button>
            </div>
        </div>
    );
};

export default ViewSavingPopup;
