import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoalModel } from '../models/GoalModel';
import { loadGoals, saveGoals } from '../helpers/localStorageHelpers';

interface GoalsContextType {
    goals: GoalModel[];
    setGoals: React.Dispatch<React.SetStateAction<GoalModel[]>>;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    newGoal: { title: string; description: string; icon: string; day: number[]; isRecurring: boolean; specificDate: string };
    setNewGoal: React.Dispatch<React.SetStateAction<{ title: string; description: string; icon: string; day: number[]; isRecurring: boolean; specificDate: string }>>;
    handleAddGoal: () => void;
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
    const [newGoal, setNewGoal] = useState({
        title: '',
        description: '',
        icon: '',
        day: [] as number[],
        isRecurring: true,
        specificDate: ''
    });

    useEffect(() => {
        setGoals(loadGoals());
    }, []);

    const handleAddGoal = () => {
        if (newGoal.title.trim()) {
            const goal: GoalModel = {
                id: Date.now().toString(),
                title: newGoal.title,
                description: newGoal.description,
                icon: newGoal.icon,
                isRecurring: newGoal.isRecurring,
                day: newGoal.day,
                specificDate: newGoal.isRecurring ? undefined : new Date(newGoal.specificDate),
                checkedDates: [],
                date: new Date()
            };
            const updatedGoals = [...goals, goal];
            setGoals(updatedGoals);
            saveGoals(updatedGoals);
            setNewGoal({ title: '', description: '', icon: '', day: [], isRecurring: true, specificDate: '' });
            setShowModal(false);
        }
    };

    return (
        <GoalsContext.Provider value={{
            goals,
            setGoals,
            showModal,
            setShowModal,
            newGoal,
            setNewGoal,
            handleAddGoal
        }}>
            {children}
        </GoalsContext.Provider>
    );
};
