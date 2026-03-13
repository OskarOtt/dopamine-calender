export interface GoalModel {
    id: string;
    title: string,
    description?: string,
    icon: string,
    isRecurring: boolean,
    day: number[],
    specificDate?: Date,
    checkedDates: Date[],
    date: Date,
}