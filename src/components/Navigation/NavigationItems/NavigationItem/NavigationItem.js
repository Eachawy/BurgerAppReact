import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItem.css';

const NavigationItem = (props) => (
    <li className='NavigationItem'>
        <NavLink to={props.link}  exact activeClassName='active'>{props.children}</NavLink>
    </li>
    // className={ props.active ? 'active' : null}
);

export default NavigationItem;