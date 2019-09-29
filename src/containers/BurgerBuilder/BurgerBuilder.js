import React, { Component } from 'react';

import Aux from '../../hoc/Auxs/Auxs';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-order';
import { join } from 'path';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}

class BurgerBuilder extends Component {

    constructor(props){
        super(props);

        this.state = {
            ingredient : null,
            totalPrice: 0,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false
        }
    }

    componentDidMount(){
        axios.get('/ingredients.json').then( res => {
            this.setState({ingredient: res.data});
        }).catch( error => {
            this.setState({ error: true});
        })
    }

    updatePurchaseState (ingredients){
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        },0);
        
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredient[type];
        const updateCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredient
        };
        updateIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice:newPrice, ingredient: updateIngredients});
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredient[type];
        const updateCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredient
        };
        updateIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice:newPrice, ingredient: updateIngredients});
        this.updatePurchaseState(updateIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredient) {
            console.log(encodeURIComponent(i) + '======' + i);
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredient[i]));
        }
        queryParams.push('price='+ this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
                pathname:'/checkout',
                search:'?' + queryString
        });
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredient
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;   
        }

        let orderSummary;

        let burger = this.state.error ? <p>No Ingredients loaded</p> :<Spinner />;

        if(this.state.ingredient) {

            orderSummary = <OrderSummary 
                ingredients={this.state.ingredient}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice}  />;

            burger = ( <Aux>
                    <Burger ingredients={this.state.ingredient} />
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        totalPrice={this.state.totalPrice}
                    />
                </Aux>);

        }

        if(this.state.loading){
            orderSummary = <Spinner />
        } 


        return (
            <Aux>
                 

                 
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                {burger}               
            </Aux>
        )
    }
}

export default WithErrorHandler(BurgerBuilder, axios);