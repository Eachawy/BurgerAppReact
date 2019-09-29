import React from 'react';

import './Button.css';

const button = (props) => {

    const classes = ['Button', props.btnType].join(' ');

    return (  <button className={classes} onClick={props.clicked} disabled={props.disabled}>{props.children}</button> );
}




export default button;