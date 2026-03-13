import "../style/dailyGoalStyle.scss"
import {GoalModel} from "../models/GoalModel.ts";
import { useGoals } from "../contexts/GoalsContext.tsx";
import { dayNames, formatedDate } from "../helpers/helpers.ts";
import GoalCheckbox from "../components/GoalCheckbox.tsx";

interface Props {
    goal: GoalModel;
    selectedDate: Date;
}

const DailyGoal = ({goal, selectedDate}: Props) => {
    const { goals, setGoals } = useGoals();

    const isChecked = goal.checkedDates.some(d => d.toDateString() === selectedDate.toDateString());

    const handleChange = () => {
        const goalIndex = goals.findIndex(g => g.id === goal.id);
        if (goalIndex !== -1) {
            const updatedGoals = goals.map((g, i) => {
                if (i === goalIndex) {
                    const dateStr = selectedDate.toDateString();
                    const hasDate = g.checkedDates.some(d => d.toDateString() === dateStr);
                    const newCheckedDates = hasDate
                        ? g.checkedDates.filter(d => d.toDateString() !== dateStr)
                        : [...g.checkedDates, selectedDate];
                    return { ...g, checkedDates: newCheckedDates };
                }
                return g;
            });
            setGoals(updatedGoals);
            // Also save to localStorage
            import("../helpers/localStorageHelpers.ts").then(({ saveGoals }) => saveGoals(updatedGoals));
        }
    };

    return (
        <div className={`daily-goal-container ${isChecked ? 'goal-done' : ''}`}>
            <div className="goal-header">
                <h2 className="goal-title">{goal.title}</h2>
                <div className="goal-icon">{goal.icon}</div>
            </div>
            {goal.description && (
                <div className="goal-description">
                    <p>{goal.description}</p>
                </div>
            )}
            <div className="goal-days">
                <strong>{goal.isRecurring ? 'Days' : 'Date'}:</strong> {goal.isRecurring ? goal.day.map(d => dayNames[d]).join(', ') : (goal.specificDate ? formatedDate(goal.specificDate) : 'N/A')}
            </div>
            <div className="goal-checkbox">
                <GoalCheckbox checked={isChecked} onChange={handleChange} text="Done" />
            </div>
        </div>
    );
}

export default DailyGoal;