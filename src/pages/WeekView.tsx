import { useState, useEffect, useRef } from "react";
import { useGoals } from "../contexts/useGoalsHook";
import { GoalModel } from "../models/GoalModel.ts";
import { getWeekNumber, formatedDate } from "../helpers/helpers.ts";
import PageHeader from "../components/PageHeader.tsx";
import GoalCheckbox from "../components/GoalCheckbox.tsx";
import "../style/WeekView.scss";

const WeekView = () => {
    const { goals, setGoals } = useGoals();
    const getThisWeekMonday = () => {
        const today = new Date();
        const day = today.getDay();
        const diff = day === 0 ? -6 : 1 - day;
        const monday = new Date(today);
        monday.setDate(today.getDate() + diff);
        monday.setHours(0, 0, 0, 0);
        return monday;
    };

    const [currentWeekStart, setCurrentWeekStart] = useState(() => {
        const today = new Date();
        const day = today.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
        const diff = day === 0 ? -6 : 1 - day; // to Monday
        const monday = new Date(today);
        monday.setDate(today.getDate() + diff);
        return monday;
    });

    const isViewingCurrentWeek = useRef(true);

    // Auto-advance week at midnight (only if viewing the current week)
    useEffect(() => {
        const scheduleNextMidnight = () => {
            const now = new Date();
            const msUntilMidnight =
                new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
            return setTimeout(() => {
                if (isViewingCurrentWeek.current) {
                    setCurrentWeekStart(getThisWeekMonday());
                }
                timeoutRef = scheduleNextMidnight();
            }, msUntilMidnight);
        };
        let timeoutRef = scheduleNextMidnight();
        return () => clearTimeout(timeoutRef);
    }, []);

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
            isViewingCurrentWeek.current = false;
            return newDate;
        });
    };

    const handleNextWeek = () => {
        setCurrentWeekStart(prev => {
            const newDate = new Date(prev);
            newDate.setDate(prev.getDate() + 7);
            const thisMonday = getThisWeekMonday();
            newDate.setHours(0, 0, 0, 0);
            isViewingCurrentWeek.current = newDate.getTime() === thisMonday.getTime();
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
            <PageHeader 
                title={formatWeekTitle()} 
                selectedDate={new Date()}
                onPrev={handlePrevWeek}
                onNext={handleNextWeek}
                rightContent={`${currentWeekStart.getFullYear()}`}
            />
            <div className="week-grid">
                {weekDays.map((date, index) => (
                    <div key={index} className={`day-column ${isToday(date) ? 'today' : ''}`}>
                        <h3 className="day-header">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</h3>
                        <p className="day-date">{formatedDate(date)}</p>
                        <div className="day-goals">
                            {getGoalsForDay(index, date).map(goal => (
                                <div key={goal.id} className={`week-goal-item ${isGoalDone(goal, date) ? 'done' : ''}`} onClick={() => handleGoalToggle(goal, date)} style={{ cursor: 'pointer' }}>
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