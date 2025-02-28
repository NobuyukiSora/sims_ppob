import React from "react";
import './styles.css'

const TextInput = ({ type = "text", name, value, onChange, placeholder, isError, errorMessage }) => {
    return (
        <div className="textinput-container">
            <div className="input-wrapper">
                <img
                    src={'/assets/Pulsa.png'}
                    alt={name}
                    className="input-icon"
                />
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`input-field ${isError ? 'input-error' : ''}`}
                />
            </div>
            <div className="error-message">{errorMessage}</div>
        </div>
    );
};

export default TextInput;
