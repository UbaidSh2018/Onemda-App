import React from 'react';
import { Link } from 'react-router-dom';


export function NavLink({to, label }) {

    return (<Link style = {{
        display: "inline-block", 
        margin: "1em", 
        padding: "1em", 
    }}  onClick={(e) => this.props.onClick(e)} to ={to} >{label}</Link>
        );

}

NavLink.defaultProps = {
    onClick: () => {}
}

