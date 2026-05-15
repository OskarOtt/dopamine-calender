import React, { useState, useEffect } from 'react';
import { GoalModel } from '../models/GoalModel';
import { loadGoals, saveGoals } from '../helpers/localStorageHelpers';
import { GoalsContext } from './GoalsContext';

const GoalsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [goals, setGoals] = useState<GoalModel[]>([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setGoals(loadGoals());
    }, []);

    const handleAddGoal = (data: { title: string; description: string; icon: string; day: number[]; isRecurring: boolean; specificDate: string }) => {
        const goal: GoalModel = {
            id: Date.now().toString(),
            title: data.title,
            description: data.description,
            icon: data.icon,
            isRecurring: data.isRecurring,
            day: data.day,
            specificDate: data.isRecurring ? undefined : new Date(data.specificDate),
            checkedDates: [],
            date: new Date()
        };
        const updatedGoals = [...goals, goal];
        setGoals(updatedGoals);
        saveGoals(updatedGoals);
        setShowModal(false);
    };

    return (
        <GoalsContext.Provider value={{
            goals,
            setGoals,
            showModal,
            setShowModal,
            handleAddGoal
        }}>
            {children}
        </GoalsContext.Provider>
    );
};

export default GoalsProvider;
