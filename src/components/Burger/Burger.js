import React from 'react';
import './Burger.css';

import BurgerIngredient from "./Burgeringredient/Burgeringredient";

const burger = (props) => {

    if(props.ingredients === null) {
        return false;
    }

    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map( (_,i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        })
    }).reduce( (arr, el) => {
        return arr.concat(el);
    }, []);

    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add your ingredients!</p>;
    }

    return(
        <div className='Burger'>
            <BurgerIngredient type='bread-top' />
                {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
}

export default burger;