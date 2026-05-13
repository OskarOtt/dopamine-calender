import { useState, useEffect } from "react";
import { useGoals } from "../contexts/GoalsContext.tsx";
import DailyGoal from "../components/DailyGoal.tsx";
import DailyGoalGroup from "../components/DailyGoalGroup.tsx";
import PageHeader from "../components/PageHeader.tsx";
import "../style/DayView.scss"
import "../style/DayPageHeader.scss"
import {getDayName} from "../helpers/helpers.ts";
import { useSearchParams } from "react-router-dom";

const DayView = () => {
    const { goals } = useGoals();
    const [searchParams] = useSearchParams();
    const dateParam = searchParams.get('date');
    const [selectedDate, setSelectedDate] = useState(() => {
        if (dateParam) {
            return new Date(dateParam);
        }
        return new Date();
    });

    useEffect(() => {
        if (dateParam) {
            setSelectedDate(new Date(dateParam));
        }
    }, [dateParam]);

    // Auto-advance to next day at midnight
    useEffect(() => {
        if (dateParam) return; // Don't auto-advance if a specific date is pinned via URL
        const scheduleNextMidnight = () => {
            const now = new Date();
            const msUntilMidnight =
                new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
            return setTimeout(() => {
                setSelectedDate(new Date());
                timeoutRef = scheduleNextMidnight();
            }, msUntilMidnight);
        };
        let timeoutRef = scheduleNextMidnight();
        return () => clearTimeout(timeoutRef);
    }, [dateParam]);

    const currentDay = (selectedDate.getDay() + 6) % 7; // 0=Monday, 1=Tuesday, ..., 6=Sunday
    const filteredGoals = goals.filter(goal => 
        (goal.isRecurring && goal.day.includes(currentDay)) ||
        (!goal.isRecurring && goal.specificDate && goal.specificDate.toDateString() === selectedDate.toDateString())
    );

    return (
        <div className="day-view-container">
            <PageHeader 
                title={getDayName(selectedDate)} 
                selectedDate={selectedDate}
                onPrev={() => setSelectedDate(prev => new Date(prev.getTime() - 24*60*60*1000))}
                onNext={() => setSelectedDate(prev => new Date(prev.getTime() + 24*60*60*1000))}
            />
            <DailyGoalGroup>
                {filteredGoals.map((goal) => (
                    <DailyGoal key={goal.id} goal={goal} selectedDate={selectedDate} />
                ))}
            </DailyGoalGroup>
        </div>
    );
}

export default DayView;
