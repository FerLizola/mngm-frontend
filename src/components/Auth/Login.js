import React, { useState } from 'react';
import Auth from './Auth';
import Button from '../UI/Button';
import './Login.css';
import headerImg from '../../assets/backtoschool.jpg'

import { required, length, email } from '../util/validators';

const Login = (props) => {
    const [state, setState] = useState({
        loginForm: {
            email: {
                value: '',
                valid: false,
                touched: false,
                validators: [required, email]
            },
            password: {
                value: '',
                valid: false,
                touched: false,
                validators: [required, length({ min: 5 })]
            },
            formIsValid: false
        }
    });

    const inputChangeHandler = (input, value) => {
        setState(prevState => {
            //console.log(input);
            value = input.target.value;
            let isValid = true;
            for (const validator of prevState.loginForm[input.target.id].validators) {
                isValid = isValid && validator(input.target.value);
            }
            const updatedForm = {
                ...prevState.loginForm,
                [input.target.id]: {
                    ...prevState.loginForm[input.target.id],
                    valid: isValid,
                    value: value
                }
            };
            let formIsValid = true;
            for (const inputName in updatedForm) {
                formIsValid = formIsValid && updatedForm[inputName].valid;
            }
            return {
                loginForm: updatedForm,
                formIsValid: formIsValid
            };
        });
    };

    const inputBlurHandler = input => {
        setState(prevState => {
            return {
                loginForm: {
                    ...prevState.loginForm,
                    [input]: {
                        ...prevState.loginForm[input],
                        touched: true
                    }
                }
            };
        });
    };

    return (
        <Auth>
            <div className='mainImage'>
                <img src={headerImg} alt="Back to school season!"/>
                
            </div>
            <h3 className='title'>
                 <span>Retail Order Management!</span>
            </h3>
            <form
                onSubmit={e =>
                    props.onLogin(e, {
                        username: state.loginForm.email.value,
                        password: state.loginForm.password.value
                    })
                }
            >
                <div className='input'>
                {props.error && <div className='error'><span>{props.error}</span></div>}
                    <label htmlFor="email" className='labeltag'>Email</label>
                    <input
                        className={[
                            !state.loginForm['email'].valid ? 'invalid' : 'valid',
                            state.loginForm['email'].touched ? 'touched' : 'untouched'
                        ].join(' ')}
                        type="email"
                        id="email"
                        value={state.loginForm['email'].value}
                        onChange={inputChangeHandler}
                        onBlur={inputBlurHandler.bind(this, 'email')}
                    />
                </div>
                <div className='input'>
                    <label htmlFor="password" className='labeltag'>Your Password</label>
                    <input
                        className={[
                            !state.loginForm['password'].valid ? 'invalid' : 'valid',
                            state.loginForm['password'].touched ? 'touched' : 'untouched'
                        ].join(' ')}
                        type="password"
                        id="password"
                        value={state.loginForm['password'].value}
                        onChange={inputChangeHandler}
                        onBlur={inputBlurHandler.bind(this, 'password')}
                    />
                </div>
                <Button design="raised" type="submit" loading={props.loading}>
                    Login
                </Button>
            </form>
        </Auth>
    )
}

export default Login;