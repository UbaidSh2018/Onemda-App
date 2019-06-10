import React from "react";
import SelectableButtonGroup from "../common/SelectableButtonGroup";

const FeedbackRating = Object.freeze({
    Low: 'Low',
    Minimal: 'Minimal',
    Average: 'Average',
    High: 'High',
})
export function FeedbackRatingSelector({
    id,
    handleSelect,
    label
}) {
    return <div>
        <div className="question-group__label">{label}</div>
        <SelectableButtonGroup
            id={id}
            handleSelect={handleSelect}
            values={[FeedbackRating.Low, FeedbackRating.Minimal, FeedbackRating.Average, FeedbackRating.High]} />
    </div>
}