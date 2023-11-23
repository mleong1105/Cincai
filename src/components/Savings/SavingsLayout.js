import React from "react";
import Loader from "../Common/Loader";
import * as utils from "../Util";

import SavingsCard from "./SavingCard";

const SavingsLayout = props => {
    const savings = props.savings;
    const settings = props.settings;
    const currentUser = props.authUser;

    if (!savings || !currentUser) {
        return <Loader />;
    }

    if (savings && currentUser) {
        const eachSaving = utils.eachExpense(savings);
        const thisUsersSavings = utils.currentUsersSaving(eachSaving, currentUser);

        if (thisUsersSavings.length) {
            var abc = thisUsersSavings.map(function (elem, i) {
                return <SavingsCard key={i} savings={elem} authUser={currentUser} settings={settings} />;
            });

            return <div className="col-sm-12">{abc}</div>;
        } else {
            return <div>Nothing Found</div>;
        }
    }
};

export default SavingsLayout;
