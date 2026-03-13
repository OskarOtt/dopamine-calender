import React from 'react';
import '../style/AddGoalForm.scss';
import { dayNames } from '../helpers/helpers';
import { useGoals } from '../contexts/GoalsContext';

const iconOptions = [
    { label: 'Workout', value: '🏋️' },
    { label: 'Running', value: '🏃' },
    { label: 'Eat', value: '🍽️' },
    { label: 'List', value: '📝' },
    { label: 'Supplements', value: '💊' },
    { label: 'Read', value: '📖' },
    { label: 'Sleep', value: '😴' },
    { label: 'Water', value: '💧' },
    { label: 'Concert', value: '🎤' },
    { label: 'Party', value: '🎉' },
    { label: 'Gathering', value: '👥' },
    { label: 'Study', value: '📚' },
];

const AddGoalForm: React.FC = () => {
    const { newGoal, setNewGoal, handleAddGoal } = useGoals();

    const handleDayChange = (day: number, checked: boolean) => {
        setNewGoal(prev => ({
            ...prev,
            day: checked ? [...prev.day, day] : prev.day.filter(d => d !== day)
        }));
    };

    return (
        <div className="add-goal-form">
            <input
                type="text"
                placeholder="Title"
                value={newGoal.title}
                onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                className="form-input"
            />
            <input
                type="text"
                placeholder="Description"
                value={newGoal.description}
                onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                className="form-input"
            />
            <div className="goal-type">
                <label>
                    <input
                        type="radio"
                        name="goalType"
                        checked={newGoal.isRecurring}
                        onChange={() => setNewGoal(prev => ({ ...prev, isRecurring: true }))}
                    />
                    Recurring
                </label>
                <label>
                    <input
                        type="radio"
                        name="goalType"
                        checked={!newGoal.isRecurring}
                        onChange={() => setNewGoal(prev => ({ ...prev, isRecurring: false }))}
                    />
                    One-time
                </label>
            </div>
            {newGoal.isRecurring ? (
                <div className="days-selection">
                    <label>Days:</label>
                    <div className="day-buttons">
                        <button type="button" onClick={() => setNewGoal(prev => ({ ...prev, day: [0,1,2,3,4,5,6] }))} className="select-all-button">Select All Days</button>
                        <button type="button" onClick={() => setNewGoal(prev => ({ ...prev, day: [] }))} className="clear-all-button">Clear All</button>
                    </div>
                    {dayNames.map((dayName, i) => (
                        <label key={i} className="day-checkbox">
                            <input
                                type="checkbox"
                                checked={newGoal.day.includes(i)}
                                onChange={(e) => handleDayChange(i, e.target.checked)}
                            />
                            {dayName}
                        </label>
                    ))}
                </div>
            ) : (
                <div className="date-selection">
                    <label>Date:</label>
                    <input
                        type="date"
                        value={newGoal.specificDate}
                        onChange={(e) => setNewGoal(prev => ({ ...prev, specificDate: e.target.value }))}
                        className="form-input"
                    />
                </div>
            )}
            <div className="icon-selection">
                <label>Icon:</label>
                <div className="icon-options">
                    {iconOptions.map(option => (
                        <button
                            key={option.value}
                            type="button"
                            className={`icon-button ${newGoal.icon === option.value ? 'selected' : ''}`}
                            onClick={() => setNewGoal(prev => ({ ...prev, icon: option.value }))}
                        >
                            {option.value}
                        </button>
                    ))}
                </div>
            </div>
            <button onClick={handleAddGoal} className="add-button">Add Goal</button>
        </div>
    );
};

export default AddGoalForm;
