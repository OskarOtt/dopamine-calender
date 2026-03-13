import React from 'react';
import '../style/GoalCheckbox.scss';

interface GoalCheckboxProps {
    checked: boolean;
    onChange: () => void;
    text?: string;
}

const GoalCheckbox: React.FC<GoalCheckboxProps> = ({ checked, onChange, text }) => {
    return (
        <label className="goal-checkbox">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            {text && <span>{text}</span>}
        </label>
    );
};

export default GoalCheckbox;
