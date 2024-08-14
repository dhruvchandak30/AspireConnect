"use client"
import { useState } from 'react';
import './sigin.css'; // Assuming global CSS
import { useRouter } from 'next/navigation';
import {url} from '@/utils/utils';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../store/atoms/userState';

const Signin = () => {
    const navigate = useRouter();
    const setUser = useSetRecoilState(userState);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [warning, setWarning] = useState<string>('');

    const toggleSignUp = () => {
        navigate.push('/signup');
    };

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${url}/storeprofile/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (
                    data.message === 'Invalid credentials' ||
                    data.message === 'User not found'
                ) {
                    setWarning(data.message);
                    return;
                }

                setUser(data.user);

                navigate.push('/');
            } else {
                const errorData = await response.json();
                console.error('Signin failed:', errorData.message);
                setWarning('Failed to sign in. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error signing in:', error);
            setWarning('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className="page-wrapper">
            <div className="container" id="container">
                <div className={`form-container sign-in-container`}>
                    <form
                        onSubmit={formSubmitHandler}
                        action="#"
                        className="form1 flex flex-col justify-between"
                    >
                        <div className="text-2xl font-bold">Sign in</div>
                        <div>
                            <input
                                className="input1"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                className="input1"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {warning && (
                            <div className="text-red-500">{warning}</div>
                        )}
                        <div className="flex flex-col ">
                            <a href="#" className="text-[16px]">
                                Forgot your password?
                            </a>
                            <button
                                type="submit"
                                className="w-full py-2 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                                style={{
                                    background:
                                        'linear-gradient(to right, #ff4b2b, #ff4160)',
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.background =
                                        'linear-gradient(to right, #ff4160, #ff4b2b)')
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.background =
                                        'linear-gradient(to right, #ff4b2b, #ff4160)')
                                }
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <div className="text-2xl text-white font-bold">
                                Hello Friends!
                            </div>
                            <p className="p1">
                                Enter your personal details and start your
                                journey with us
                            </p>
                            <button className="ghost" onClick={toggleSignUp}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
