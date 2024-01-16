import React from 'react';
import { useState } from 'react';

export default function Authenticate ({token}) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState('');
    const [failMessage, setFailMessage] = useState(null);

    async function handleClick () {
        try {
            //console.log("click");
            const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', {
                method: "GET",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const result = await response.json();
            //console.log(result);
            if (token !== null) {
                setSuccessMessage(result.message);
                setUserData(result.data.username);
                setFailMessage(null);
            } else {
                setFailMessage(result.message);
            }

        } catch (error) {
            setError(error.message);
            //console.log( error );
        }
    }

    return (
        <div>
            <h2>Authenticate</h2>
            {successMessage && <p className='success'>{successMessage}<br /> Welcome, {userData}.</p> }
            {error && <p>{error}</p>}
            {failMessage && <p className='fail'>{failMessage}<br/> Please Sign Up</p>}
            <button onClick={handleClick}>Authenticate Token</button>
        </div>
    );
}