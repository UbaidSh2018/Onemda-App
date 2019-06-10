import React from 'react';
import { FilterList } from '../../components/FilterList';
import { FeedbackCard } from '../../components/FeedbackCard';
import { Formik } from 'formik';
import * as Yup from 'yup';
import "./styles.scss"

// TODO: Yup schema validation - Only appears to be checking activity/participants has a value
const FeedbackSchema = Yup.object().shape({
    participants: Yup
        .array()
        .of(
            Yup.object().required('Required')
        ).max(1),
    activity: Yup.object().required('Required'),
    feedback: {
        participant: {
            enjoyment: Yup.object().required('Required'),
        },
        trainer: {
            participantEngagement: Yup.object().required('Required'),
            participantEnjoyment: Yup.object().required('Required'),
        },
    },
});

const feedbackMutationVariablesFromParticipantFeedback = ({
    participant,
    feedback: {
        participant: {
            enjoyment: {
                value: participantFeedbackEnjoyment
            },
        },
        trainer: {
            participantEnjoyment: {
                value: participantEnjoyment
            },
            participantEngagement: {
                value: participantEngagement
            },
            comment,
        },
    }
}) => ({
    participantID: participant.id,
    participantFeedback: participantFeedbackEnjoyment,
    comment: comment,
    trainerFeedback: {
        engagement: participantEnjoyment,
        enjoyment: participantEngagement,
        assistance: {},
        //   assistance: { // TODO: assistance questions
        //     verbal: "Low",
        //     physical: "None",
        //   }
    }
})


export function FeedbackFormRender({
    activities,
    users,
    feedback,
    initialValues,
}) {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={FeedbackSchema}
            onSubmit={(values, formikBag) => {
                // TODO: rename variables related to feedback to be way less ambiguous.
                let { activity, participants, feedback: rawParticipantFeedbacks } = values
                //Values from form come in here.

                //NB. there's still a question of matching the correct IDs to the form
                //Below.

                // Mutate graphql here.
                let participantFeedbacks = participants.map(participant => ({ participant: participant, feedback: rawParticipantFeedbacks[participant.id] }))

                //TODO: validation elsewhere!
                let participantFeedbackMutationVariables = feedbackMutationVariablesFromParticipantFeedback(participantFeedbacks[0])

                feedback({
                    variables: {
                        activityID: activity.id,
                        ...participantFeedbackMutationVariables,
                    }
                });
            }}
        >{({
            values,
            errors,
            handleSubmit,
            isValid,

            setFieldValue,

            /* and other goodies */
        }) => {

            const ourHandleChange = (id) => (value) => {
                setFieldValue(id, value);
            }

            return (
                <form onSubmit={handleSubmit}>
                    {/* {JSON.stringify(errors)}\
                    {JSON.stringify(isValid)} */}
                    <p>Submit Feedback</p>
                    <div>Activities</div>
                    <FilterList options={activities.map(v => ({
                        label: v.name,
                        value: v,
                    }))}
                        handleChange={ourHandleChange('activity')} />

                    <div>Participants</div>
                    <FilterList
                        isMulti
                        options={
                            values.participants.length < 1
                                ? users.map(v => ({
                                    label: v.name,
                                    value: v,
                                }))
                                : []

                        }
                        handleChange={ourHandleChange('participants')} />

                    <div>
                        {values.participants.map(participant => <FeedbackCard participant={participant} handleChange={ourHandleChange} />)}
                    </div>

                    <button
                        className="feedback_form_submit_button"
                        disabled={!isValid}
                        type="submit"
                    >Submit</button>
                </form>
            )
        }}
        </Formik>
    );

}

