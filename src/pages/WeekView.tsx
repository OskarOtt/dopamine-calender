import { useState } from "react";
import { useGoals } from "../contexts/GoalsContext.tsx";
import { GoalModel } from "../models/GoalModel.ts";
import { getWeekNumber, formatedDate } from "../helpers/helpers.ts";
import WeekPageHeader from "../components/WeekPageHeader.tsx";
import GoalCheckbox from "../components/GoalCheckbox.tsx";
import "../style/WeekView.scss";

const WeekView = () => {
    const { goals, setGoals } = useGoals();
    const [currentWeekStart, setCurrentWeekStart] = useState(() => {
        const today = new Date();
        const day = today.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
        const diff = day === 0 ? -6 : 1 - day; // to Monday
        const monday = new Date(today);
        monday.setDate(today.getDate() + diff);
        return monday;
    });

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentWeekStart);
        date.setDate(currentWeekStart.getDate() + i);
        weekDays.push(date);
    }

    const formatWeekTitle = () => {
        return `Week ${getWeekNumber(currentWeekStart)}`;
    };

    const handlePrevWeek = () => {
        setCurrentWeekStart(prev => {
            const newDate = new Date(prev);
            newDate.setDate(prev.getDate() - 7);
            return newDate;
        });
    };

    const handleNextWeek = () => {
        setCurrentWeekStart(prev => {
            const newDate = new Date(prev);
            newDate.setDate(prev.getDate() + 7);
            return newDate;
        });
    };

    const getGoalsForDay = (dayIndex: number, date: Date) => {
        return goals.filter(goal => 
            (goal.isRecurring && goal.day.includes(dayIndex)) ||
            (!goal.isRecurring && goal.specificDate && goal.specificDate.toDateString() === date.toDateString())
        );
    };

    const isGoalDone = (goal: GoalModel, date: Date) => {
        return goal.checkedDates.some((d: Date) => d.toDateString() === date.toDateString());
    };

    const isToday = (date: Date) => {
        return date.toDateString() === new Date().toDateString();
    };

    const handleGoalToggle = (goal: GoalModel, date: Date) => {
        const goalIndex = goals.findIndex(g => g.id === goal.id);
        if (goalIndex !== -1) {
            const updatedGoals = goals.map((g, i) => {
                if (i === goalIndex) {
                    const dateStr = date.toDateString();
                    const hasDate = g.checkedDates.some(d => d.toDateString() === dateStr);
                    const newCheckedDates = hasDate
                        ? g.checkedDates.filter(d => d.toDateString() !== dateStr)
                        : [...g.checkedDates, date];
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
        <div className="week-view-container">
            <WeekPageHeader 
                title={formatWeekTitle()} 
                selectedDate={new Date()}
                onPrev={handlePrevWeek}
                onNext={handleNextWeek}
            />
            <div className="week-grid">
                {weekDays.map((date, index) => (
                    <div key={index} className={`day-column ${isToday(date) ? 'today' : ''}`}>
                        <h3 className="day-header">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</h3>
                        <p className="day-date">{formatedDate(date)}</p>
                        <div className="day-goals">
                            {getGoalsForDay(index, date).map(goal => (
                                <div key={goal.id} className={`week-goal-item ${isGoalDone(goal, date) ? 'done' : ''}`}>
                                    <span className="goal-icon">{goal.icon}</span>
                                    <span className="goal-title">{goal.title}</span>
                                    <GoalCheckbox checked={isGoalDone(goal, date)} onChange={() => handleGoalToggle(goal, date)} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeekView;