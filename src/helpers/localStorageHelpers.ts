import {GoalModel} from "../models/GoalModel.ts";

export const saveGoals = (goals: GoalModel[]): void => {
    localStorage.setItem('goals', JSON.stringify(goals));
};

export const loadGoals = (): GoalModel[] => {
    const data = localStorage.getItem('goals');
    if (data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parsed = JSON.parse(data) as any[];
        return parsed.map((goal: any) => ({
            ...goal,
            id: goal.id || Date.now().toString() + Math.random(), // add id if missing
            isRecurring: goal.isRecurring !== undefined ? goal.isRecurring : true, // default to recurring
            checkedDates: goal.checkedDates ? goal.checkedDates.map((d: string) => new Date(d)) : goal.checked ? [new Date(goal.date)] : [], // migrate checked
            specificDate: goal.specificDate ? new Date(goal.specificDate) : undefined,
            date: new Date(goal.date),
        }));
    }
    return [];
};
