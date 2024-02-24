"use client"
import React, { useState } from 'react';

interface DropdownProps {
    options: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    return (
        <select value={selectedOption} onChange={handleOptionChange}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;