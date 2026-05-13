import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoalModel } from '../models/GoalModel';
import { loadGoals, saveGoals } from '../helpers/localStorageHelpers';

interface GoalsContextType {
    goals: GoalModel[];
    setGoals: React.Dispatch<React.SetStateAction<GoalModel[]>>;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    handleAddGoal: (data: { title: string; description: string; icon: string; day: number[]; isRecurring: boolean; specificDate: string }) => void;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export const useGoals = () => {
    const context = useContext(GoalsContext);
    if (!context) {
        throw new Error('useGoals must be used within a GoalsProvider');
    }
    return context;
};

export const GoalsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
