import React from "react";
import SelectableButtonGroup from "../common/SelectableButtonGroup";

const AssistanceRatings = Object.freeze({
    None: 'None',
    Low: 'Low',
    High: 'High',
})

export function AssistanceRatingSelector({
    id,
    handleSelect,
    label
}) {
    return <div>
        <div className="question-group__label">{label}</div>
        <SelectableButtonGroup
            id={id}
            handleSelect={handleSelect}
            values={[AssistanceRatings.None, AssistanceRatings.Low, AssistanceRatings.High]} />
    </div>
}