import React from 'react';

interface DailyGoalGroupProps {
    children: React.ReactNode;
}

const DailyGoalGroup = ({children}: DailyGoalGroupProps) => {
    return (
        <div className="daily-goal-group-container">
            {children}
        </div>
    );
};

export default DailyGoalGroup;
