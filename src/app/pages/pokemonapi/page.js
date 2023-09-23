"use client"

import React, { useState, useEffect } from "react";

function MyForm() {
    const [inputValue, setInputValue] = useState('');
    const [responseData, setResponseData] = useState(null);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`);
            if (response.ok) {
                const data = await response.json();
                setResponseData(data);
            } else {
                console.error('Error:', response.status);
                setResponseData(null);
            }
        } catch (error) {
            console.error('API call error:', error);
            setResponseData(null);
        }
    };

    return (
        <div>
            <h1>Prehack App Test</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter a Pokemon name:
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            {responseData && (
                <div>
                    <h2>Pokemon Info:</h2>
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default MyForm;
