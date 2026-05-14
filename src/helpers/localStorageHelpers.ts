import {GoalModel} from "../models/GoalModel.ts";

export const saveGoals = (goals: GoalModel[]): void => {
    localStorage.setItem('goals', JSON.stringify(goals));
};

export const loadGoals = (): GoalModel[] => {
    const data = localStorage.getItem('goals');
    if (data) {
        const parsed = JSON.parse(data) as Record<string, unknown>[];
        return parsed.map((goal: Record<string, unknown>) => ({
            ...goal,
            id: (goal.id as string) || Date.now().toString() + Math.random(), // add id if missing
            isRecurring: goal.isRecurring !== undefined ? (goal.isRecurring as boolean) : true, // default to recurring
            checkedDates: goal.checkedDates ? (goal.checkedDates as string[]).map((d: string) => new Date(d)) : goal.checked ? [new Date(goal.date as string)] : [], // migrate checked
            specificDate: goal.specificDate ? new Date(goal.specificDate as string) : undefined,
            date: new Date(goal.date as string),
        } as GoalModel));
    }
    return [];
};
