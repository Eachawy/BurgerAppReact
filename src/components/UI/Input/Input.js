import React from 'react';

import './Input.css';

const input = (props) => {

    let inputElement = null;
    const inputClasses = ['InputElement'];
    if(props.inValid && props.shouldValidate && props.isTouched){
        inputClasses.push('Invalid');
    }
    

    switch (props.elementType) {
        case 'input':
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        case 'textarea':
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        case 'select':
                inputElement =  <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                                    {props.elementConfig.option.map( option => (
                                        <option key={option.id} value={option.value}>{option.displayValue}</option>
                                    ))}
                                </select>
                break;

        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
    }

    return(
        <div className='Input'>
            <label className='Label'> { props.label } </label>
            {inputElement}
        </div>
    );

};

export default input;