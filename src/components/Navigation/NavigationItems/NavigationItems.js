import React from 'react';


import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className='NavigationItems'>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        {/* <NavigationItem link={{pathname:'/checkout', hash:'#test', search:'?quick=true'}}>Checkout</NavigationItem> */}
        <NavigationItem link='/orders'>Orders</NavigationItem>
    </ul>
);

export default navigationItems;