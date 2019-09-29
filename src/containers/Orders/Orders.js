import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import Axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



class Orders extends Component {

    state = {
        orders:[],
        loading: true
    }

    UNSAFE_componentWillMount() {
        Axios.get('/orders.json').then(res => {

            const fetchOrders = [];
            for (let key in res.data) {
                fetchOrders.push({
                    ...res.data[key],
                    id:key
                })
            }

            this.setState({loading: false, orders: fetchOrders});

        }).catch(error => {
            this.setState({loading: false});
            console.log(error);
        })
    }


    deleteOrderHandler = () => {
        let arr = this.state.orders;
        arr.slice(0.1);
        console.log(arr);
    }

    render() {
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order Ingredients={order.ingredient} key={order.id} price={order.price} delete={this.deleteOrderHandler} />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, Axios);