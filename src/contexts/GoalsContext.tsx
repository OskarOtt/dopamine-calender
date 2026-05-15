import React, { createContext } from 'react';
import { GoalModel } from '../models/GoalModel';

export interface GoalsContextType {
    goals: GoalModel[];
    setGoals: React.Dispatch<React.SetStateAction<GoalModel[]>>;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    handleAddGoal: (data: { title: string; description: string; icon: string; day: number[]; isRecurring: boolean; specificDate: string }) => void;
}

export const GoalsContext = createContext<GoalsContextType | undefined>(undefined);
