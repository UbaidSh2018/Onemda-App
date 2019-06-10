import React from 'react';
import { AssistanceRatingSelector } from './AssistanceRatingSelector';
import { FeedbackRatingSelector } from './FeedbackRatingSelector';

export function FeedbackCard({
    participant,
    handleChange,
}) {
    // Id prefix allows Formik to automatically handle changes in feedback for a user. Currently all feedback is stored in a feedback object indexed
    // by participant id's. Ideally these would be stored in an array, perhaps with the actual participants objects but using objects in this way
    // plays well with Formik.
    let inputIdPrefix = `feedback.${participant.id}`

    return (
        <div className="feedback-card" key={participant.id}>
            <div className="feedback-card__participant-name">{participant.name || "John Doe"}</div>
            <div className="question-group">
                <div className="question-group__title"> Participant Question (Optional)</div>
                <FeedbackRatingSelector
                    id={`${inputIdPrefix}.participant.enjoyment`}
                    handleSelect={handleChange(`${inputIdPrefix}.participant.enjoyment`)}
                    label="How happy were you with today’s program? "
                />
            </div>
            <div className="question-group">
                <div className="question-group__title">Trainer Questions</div>
                <FeedbackRatingSelector
                    id={`${inputIdPrefix}.trainer.participantEnjoyment`}
                    handleSelect={handleChange(`${inputIdPrefix}.trainer.participantEnjoyment`)}
                    label="What level of engagement did the participant show in the program?"
                />

                <FeedbackRatingSelector
                    id={`${inputIdPrefix}.trainer.participantEngagement`}
                    handleSelect={handleChange(`${inputIdPrefix}.trainer.participantEngagement`)}
                    label="What level of happiness did the participant show with today’s program?"
                />


                <div className="question-group">
                    <div className="question-group__title">Assistance Provided</div>
                    <AssistanceRatingSelector
                        id={`${inputIdPrefix}.trainer.assistance.physical`}
                        handleSelect={handleChange(`${inputIdPrefix}.trainer.assistance.physical`)}
                        label="How much physical assistance did the participant require?"
                    />

                    <AssistanceRatingSelector
                        id={`${inputIdPrefix}.trainer.assistance.verbal`}
                        handleSelect={handleChange(`${inputIdPrefix}.trainer.assistance.verbal`)}
                        label="How much verbal prompting did they require to participate in the program?"
                    />
                </div>
                <div className="question-group__label">Comments (Optional)</div>
                <textarea
                    className="question-group__comment"
                    id={`${inputIdPrefix}.trainer.comment`}
                    onChange={(e) => handleChange(`${inputIdPrefix}.trainer.comment`)(e.target.value)} />
            </div>
        </div>
    );
}

