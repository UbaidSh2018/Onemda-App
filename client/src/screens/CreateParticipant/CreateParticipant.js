import React from 'react';
import { Formik } from 'formik';
import Select from 'react-select';
import * as Yup from "yup";
const CreateUserSchema = Yup.object().shape({

    userType: Yup.object().required('Required'),
    username: Yup.string().required('Required'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required')


});

const USER_TYPES = [
    {
        value: "Trainer",
        label: "Trainer",
    },
    {
        value: "Participant",
        label: "Participant",
    },
    {
        value: "Admin",
        label: "Admin",
    },
    {
        value: "Supporter",
        label: "Supporter",
    }
]

export function CreateParticipant() {

    return (<div>
        <Formik
            initialValues={{
                //Initial values go here.
            }}
            validationSchema={CreateUserSchema}
            onSubmit={(values, formikBag) => {
            }}>{({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                isValid,

                setFieldValue,

                /* and other goodies */
            }) => {
                return (
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: "flex",
                            flexFlow: "column nowrap",
                        }}
                    >
                        <h3>Create Participant</h3>
                        <Select
                            options={USER_TYPES}
                            onChange={v => setFieldValue("userType", v)
                            }
                            id="userType"
                        />
                        <input type="text"
                            name="firstName"
                            placeholder="First Name"
                            onChange={handleChange}
                        />
                        <input type="text"
                            name="lastName"
                            placeholder="Last Name"
                            onChange={handleChange}
                        />
                        <input type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                        />
                        <input type="text"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                        />


                        <button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                        >Submit</button>
                    </form>
                )
            }}</Formik>

    </div>
    );

}

