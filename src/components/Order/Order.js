import React from 'react';
import Button from '../../components/UI/Button/Button';

import './Order.css';

const Order = (props) => {



    let transformedIngredients = Object.keys(props.Ingredients).map(igKey => {
        return <span key={igKey}> {igKey} ({props.Ingredients[igKey]}) </span>
    }).reduce( (arr, el) => {
        return arr.concat(el);
    }, []);


    // const Ingredients = [];
    // console.log(props.Ingredients);

    // for( let ingredientName in props.Ingredients) {
    //     Ingredients.push({
    //         name:ingredientName,
    //         amount: props.Ingredients[ingredientName]
    //     })
    // }

    // console.log(Ingredients);
    // const ingOutput = Ingredients.map( ing => {
    //     return <span key={ing.name}>{ing.name} ({ing.amount})</span>
    // })

    

   return (
        <div className="Order">
            <p>Ingredients: {transformedIngredients} </p>
            <p>Price: <strong>USD {props.price}</strong></p>
            <Button btnType="Danger" clicked={props.delete}>Delete</Button>
        </div>
    )
};

export default Order;