import React, { useState } from 'react';
import './Auth.css';
import Logo from '../../Img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, signUp } from '../../actions/AuthAction.js';

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.authReducer.loading);

    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmpass: ""
    });
    const [confirmPass, setConfirmPass] = useState(true);

    // Handle form input changes
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isSignUp) {
                // Password validation
                if (data.password === data.confirmpass) {
                    await dispatch(signUp(data));  // Sign-up action
                } else {
                    setConfirmPass(false); // Show validation message if passwords don't match
                }
            } else {
                await dispatch(logIn(data)); // Log-in action
            }
        } catch (error) {
            console.error("Error during authentication", error);
            // Optionally show an error message to the user
        }
    };

    // Reset form when toggling between login and signup
    const resetForm = () => {
        setConfirmPass(true);
        setData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmpass: ""
        });
    };

    return (
        <div className='Auth'>
            {/* Left Side */}
            <div className="a-left">
                <img src={Logo} alt="Logo" />
                <div className="Webname">
                    <h2>Welcome!</h2>
                    <h5>Explore the ideas throughout <br /> the world.</h5>
                </div>
            </div>

            {/* Right Side */}
            <div className="a-right">
                <form className='infoForm authForm' onSubmit={handleSubmit}>
                    <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>

                    {isSignUp && (
                        <div>
                            <input
                                type="text"
                                placeholder='First Name'
                                className='infoInput'
                                name='firstname'
                                onChange={handleChange}
                                value={data.firstname}
                                required
                            />
                            <input
                                type="text"
                                placeholder='Last Name'
                                className='infoInput'
                                name='lastname'
                                onChange={handleChange}
                                value={data.lastname}
                                required
                            />
                        </div>
                    )}

                    <div>
                        <input
                            type="email"
                            placeholder='Email'
                            className='infoInput'
                            name='email'
                            onChange={handleChange}
                            value={data.email}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder='Password'
                            className='infoInput'
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                            required
                        />
                        {isSignUp && (
                            <input
                                type="password"
                                placeholder='Confirm Password'
                                className='infoInput'
                                name='confirmpass'
                                onChange={handleChange}
                                value={data.confirmpass}
                                required
                            />
                        )}
                    </div>

                    {/* Password Mismatch Error */}
                    <span
                        style={{
                            display: confirmPass ? "none" : "block",
                            color: "red",
                            fontSize: "12px",
                            alignSelf: "flex-end",
                            marginRight: "5px"
                        }}
                    >
                        * Confirm Password does not match
                    </span>

                    {/* Switch between Sign Up and Log In */}
                    <div>
                        <span
                            style={{ fontSize: "12px", cursor: "pointer" }}
                            onClick={() => { setIsSignUp((prev) => !prev); resetForm(); }}
                        >
                            {isSignUp ? "Already have an account? Login here" : "Don't have an account? Sign Up here"}
                        </span>
                    </div>

                    {/* Submit Button */}
                    <button
                        className='button infoButton'
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? "Loading..." : isSignUp ? "Sign Up" : "Log In"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
