import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import '../style/AddGoalForm.scss';
import { dayNames } from '../helpers/helpers';
import { useGoals } from '../contexts/useGoalsHook';

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

interface FormValues {
    title: string;
    description: string;
    icon: string;
    isRecurring: boolean;
    day: number[];
    specificDate: string;
}

const AddGoalForm: React.FC = () => {
    const { handleAddGoal } = useGoals();
    const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<FormValues>({
        defaultValues: { title: '', description: '', icon: '', isRecurring: true, day: [], specificDate: '' }
    });

    const isRecurring = watch('isRecurring');
    const selectedDays = watch('day');
    const selectedIcon = watch('icon');

    const toggleDay = (i: number) => {
        const current = selectedDays ?? [];
        setValue('day', current.includes(i) ? current.filter(d => d !== i) : [...current, i], { shouldValidate: true });
    };

    return (
        <form className="add-goal-form" onSubmit={handleSubmit(handleAddGoal)}>
            <input
                {...register('title', { required: 'Title is required.' })}
                type="text"
                placeholder="Title"
                className={`form-input${errors.title ? ' form-input--error' : ''}`}
            />
            {errors.title && <p className="form-error">{errors.title.message}</p>}

            <input
                {...register('description')}
                type="text"
                placeholder="Description"
                className="form-input"
            />

            <div className="goal-type">
                <label>
                    <input type="radio" {...register('isRecurring')} value="true" defaultChecked onChange={() => setValue('isRecurring', true)} checked={isRecurring} />
                    Recurring
                </label>
                <label>
                    <input type="radio" {...register('isRecurring')} value="false" onChange={() => setValue('isRecurring', false)} checked={!isRecurring} />
                    One-time
                </label>
            </div>

            {isRecurring ? (
                <Controller
                    name="day"
                    control={control}
                    rules={{ validate: v => (v && v.length > 0) || 'Please select at least one day.' }}
                    render={() => (
                        <div className={`days-selection${errors.day ? ' days-selection--error' : ''}`}>
                            <label>Days:</label>
                            <div className="day-buttons">
                                <button type="button" onClick={() => setValue('day', [0,1,2,3,4,5,6], { shouldValidate: true })} className="select-all-button">Select All Days</button>
                                <button type="button" onClick={() => setValue('day', [], { shouldValidate: true })} className="clear-all-button">Clear All</button>
                            </div>
                            {dayNames.map((dayName, i) => (
                                <label key={i} className="day-checkbox">
                                    <input type="checkbox" checked={(selectedDays ?? []).includes(i)} onChange={() => toggleDay(i)} />
                                    {dayName}
                                </label>
                            ))}
                            {errors.day && <p className="form-error">{errors.day.message}</p>}
                        </div>
                    )}
                />
            ) : (
                <div className="date-selection">
                    <label>Date:</label>
                    <input
                        {...register('specificDate', { required: !isRecurring ? 'Please select a date.' : false })}
                        type="date"
                        className={`form-input${errors.specificDate ? ' form-input--error' : ''}`}
                    />
                    {errors.specificDate && <p className="form-error">{errors.specificDate.message}</p>}
                </div>
            )}

            <Controller
                name="icon"
                control={control}
                rules={{ required: 'Please select an icon.' }}
                render={() => (
                    <div className={`icon-selection${errors.icon ? ' icon-selection--error' : ''}`}>
                        <label>Icon:</label>
                        <div className="icon-options">
                            {iconOptions.map(option => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={`icon-button${selectedIcon === option.value ? ' selected' : ''}`}
                                    onClick={() => setValue('icon', option.value, { shouldValidate: true })}
                                >
                                    {option.value}
                                </button>
                            ))}
                        </div>
                        {errors.icon && <p className="form-error">{errors.icon.message}</p>}
                    </div>
                )}
            />

            <button type="submit" className="add-button">Add Goal</button>
        </form>
    );
};

export default AddGoalForm;
