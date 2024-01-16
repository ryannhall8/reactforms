import React from 'react';
import { useState} from 'react';

export default function SignUpForm ({setToken}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    async function handleSubmit (event) {
        event.preventDefault ();
        
        try {
            //console.log(username, password);
            const response = await fetch( 'https://fsa-jwt-practice.herokuapp.com/signup', {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({ 
                    username, 
                    password
                }),
            });
            const result = await response.json();
            //console.log(result);
            setToken(result.token);
        } catch (error) {
            setError(error.message);
        }
        setUsername('');
        setPassword('');

    }
       
    return (
        <>
            <h2>Sign Up</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username: 
                    <input 
                        value={username} 
                        required={true}
                        pattern="(?=.*[A-Za-z]).{4,16}"
                        title="Must be between 4-16 characters"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <p className="requirements">Username should be between 4-16 characters</p>
                
                <label>
                    Password: 
                    <input 
                        type="password" 
                        value={password} 
                        required 
                        pattern="(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain at least 8 characters"
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </label>
                <p className="requirements">Password should be a minimum of 8 characters and inclued at least 1 lowercase and 1 capital letter</p>
                
                <button type='submit'>Submit</button>
            </form>
        </>
    );
}