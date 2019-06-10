import React from 'react';
// import { makeStyles } from '@material-ui/styles';
// import { Typography } from '@material-ui/core';
import { Field } from "formik";
import {uncamelcase} from "utilities"; 

//STOLEN FROM HERE: https://github.com/460degrees/acme-university-demo/blob/master/packages/react-common/src/lib/RecursiveFormItem.js

// const useStyles = makeStyles(theme => ({
//     parent: {
//         border: "solid 1px black",
//         margin: 10,
//         padding: 10,
//     },

//     field: {
//         display: "block",
//     },

//     label: {
//         fontSize: (keyAcc ) => {

//             return 40 / keyAcc.length;
//         }
//     }
// }));

function determineType(type) {
    switch (type) {
        case "string": return "text";
        case "number": return "number";
        case "date": return "date";
        default: return "string";
    }
}


function Leaf(
    {definition, keyAcc, disabledList}
    ) {
    const key = keyAcc.join(".");
    return (<Field
        name={key}
        placeholder={uncamelcase(keyAcc[keyAcc.length - 1])}
        // component = {TextField}
        type={determineType(definition)}
        disabled={disabledList.includes(key)}
    />)
}


function Parent({definition, keyAcc, disabledList, children}) {
    //const classes = useStyles(keyAcc);
    return (
        <div 
        //className={classes.parent}
        >
            {/* <Typography variant="body1" className={classes.label}>{uncamelcase(keyAcc[keyAcc.length - 1])} </Typography> */}
            <strong>{uncamelcase(keyAcc[keyAcc.length - 1])}</strong> 
            {children}
        </div>
    );
}


function defaultIsChildFn(element ) {
    const type = typeof element;

    switch (type) {
        case "string": return true;
        case "object": return false;
        default: throw new Error("Data Error: definitions must be composed for objects with strings as leaf nodes, this type  was " + (type));
    }
}



export function RecursiveFormItem({ definition, keyAcc, disabledList = [], renderLeaf = Leaf, renderParent = Parent, isChildFn = defaultIsChildFn } ) {

    const isChild = isChildFn(definition);

    if (isChild) {
        return renderLeaf({definition, keyAcc, disabledList});
    }
    else {
        const entries = Object.entries(definition);
        const children = entries.map((v, i) => {
            return <RecursiveFormItem
                definition={v[1]}
                key={keyAcc.join("-") + i}
                keyAcc={[...keyAcc, v[0]]}
                disabledList={disabledList}
                isChildFn={isChildFn}
                renderLeaf={renderLeaf}
                renderParent={renderParent}
            />
        });

        return renderParent({definition, keyAcc, disabledList, children});
    }
}