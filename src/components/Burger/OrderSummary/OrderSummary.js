import React,{ Component } from 'react';

import Aux from '../../../hoc/Auxs/Auxs';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    
    componentDidUpdate () {
            console.log('[OrderSummary] wilUpdate');
    }


    render() {

        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return (<li key={igKey + 1}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>);
        })

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>
                    A delicious burger with the following ingredients:
                </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>total price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    };
}


export default OrderSummary;