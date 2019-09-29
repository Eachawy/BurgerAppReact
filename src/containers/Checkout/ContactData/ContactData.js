import React, { Component } from 'react';

import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';

import './ContactData.css';

class ContactData extends Component {
    
    state = {
        orderForm: {
            name:{
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'ZIP Code'
                },
                value:'',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength:5
                },
                valid: false,
                touched: false
            },
            country:{
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            email:{
                elementType: 'input',
                elementConfig: {
                    type:'email',
                    placeholder:'Your E-mail'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod:{
                elementType: 'select',
                elementConfig: {
                    option: [
                        {id: '1', value: 'fastest', displayValue: 'Fastest'},
                        {id: '2', value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value:'cheapest',
                validation:{
                    required: false
                },
                valid: true,
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    }



    orderHandler = (event) => {
        event.preventDefault();
        
        this.setState({loading: true});

        const formData = {};
        for( let formEleIdentifier in this.state.orderForm){
            formData[formEleIdentifier] = this.state.orderForm[formEleIdentifier].value;
        }

        const order = {
            ingredient: this.props.ingredient,
            price: this.props.price,
            orderData: formData
        }

        axios.post('/orders.json', order)
        .then(res => {

            this.setState({
                loading: false
            });

            this.props.history.push('/');

        }).catch((error) => {
            this.setState({loading: false});
            console.log(error);
        })

    }

    checkValidity(value, rules) {
        let isValid = true;

            if(rules.required){
                isValid = value.trim() !== '' && isValid;
            }
    
            if(rules.minLength){
                isValid = value.length >= rules.minLength && isValid;
            }
    
            if(rules.maxLength){
                isValid = value.length <= rules.maxLength && isValid;
            }
        

        return isValid;
    }
    
    inputChangeHandler = (event, elementIdentifier) => {
        const updateOrderForm = {
            ...this.state.orderForm
        }

        const updateFormElement = {
            ...updateOrderForm[elementIdentifier]
        }

        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
        updateFormElement.touched = true;
        updateOrderForm[elementIdentifier] = updateFormElement;

        let formsValid = true;
        for(let inputIdentifier in updateOrderForm) {
            formsValid = updateOrderForm[inputIdentifier].valid && formsValid;
        }

        this.setState({orderForm: updateOrderForm, formIsValid: formsValid});
    }








    render() {

        const formElementArray = [];
        for ( let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input  key={formElement.id} 
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig} 
                            value={formElement.config.value}
                            inValid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            isTouched={formElement.config.touched}
                            changed={(event) => this.inputChangeHandler(event, formElement.id)} />
                ))}

                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        )

            if(this.state.loading){
                form = <Spinner/>
            }

        return (
            <div className="ContactData">
                <h1>Enter your Contact Data</h1>
                    {form}
            </div>
        );
    }
}

export default ContactData;