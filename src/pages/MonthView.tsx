import { useState } from "react";
import { useGoals } from "../contexts/GoalsContext.tsx";
import MonthPageHeader from "../components/MonthPageHeader.tsx";
import { useNavigate } from "react-router-dom";
import "../style/MonthView.scss";

const MonthView = () => {
    const { goals } = useGoals();
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(() => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1);
    });

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const formatMonthTitle = () => {
        return `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
    };

    const handlePrevMonth = () => {
        setCurrentMonth(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() - 1);
            return newDate;
        });
    };

    const handleNextMonth = () => {
        setCurrentMonth(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + 1);
            return newDate;
        });
    };

    const getDaysInMonth = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const days = [];

        // Add days from previous month to fill the first week
        const startDate = new Date(firstDay);
        startDate.setDate(firstDay.getDate() - firstDay.getDay());

        for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            days.push(date);
        }

        return days;
    };

    const getGoalsForDate = (date: Date) => {
        const dayIndex = (date.getDay() + 6) % 7; // 0=Monday
        return goals.filter(goal => 
            (goal.isRecurring && goal.day.includes(dayIndex)) ||
            (!goal.isRecurring && goal.specificDate && goal.specificDate.toDateString() === date.toDateString())
        ).length;
    };

    const handleDayClick = (date: Date) => {
        const dateStr = date.toISOString().split('T')[0];
        navigate(`/?date=${dateStr}`);
    };

    const days = getDaysInMonth();

    return (
        <div className="month-view-container">
            <MonthPageHeader 
                title={formatMonthTitle()} 
                selectedDate={currentMonth}
                onPrev={handlePrevMonth}
                onNext={handleNextMonth}
            />
            <div className="calendar-grid">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className="day-header">{day}</div>
                ))}
                {days.map((date, index) => {
                    const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                    const goalCount = isCurrentMonth ? getGoalsForDate(date) : 0;
                    return (
                        <div 
                            key={index} 
                            className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${goalCount > 0 ? 'has-goals' : ''}`}
                            onClick={() => isCurrentMonth && handleDayClick(date)}
                        >
                            <span className="day-number">{date.getDate()}</span>
                            {goalCount > 0 && <span className="goal-count">{goalCount}</span>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MonthView;