import { useGoals } from "../contexts/GoalsContext.tsx";
import "../style/Statistics.scss";

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Statistics = () => {
    const { goals } = useGoals();

    const recurringGoals = goals.filter(g => g.isRecurring);
    const oneTimeGoals = goals.filter(g => !g.isRecurring && g.specificDate);

    // Top 10 recurring goals by check count
    const top10 = [...recurringGoals]
        .sort((a, b) => b.checkedDates.length - a.checkedDates.length)
        .slice(0, 10);

    const maxChecks = top10[0]?.checkedDates.length || 1;

    // One-time goals completed
    const oneTimeCompleted = oneTimeGoals.filter(g =>
        g.specificDate && g.checkedDates.some(d => d.toDateString() === g.specificDate!.toDateString())
    ).length;

    // Total check-ins across all goals
    const totalCheckIns = goals.reduce((sum, g) => sum + g.checkedDates.length, 0);

    // Most active day of week (from recurring goals)
    const dayCounts = Array(7).fill(0);
    recurringGoals.forEach(g => {
        g.checkedDates.forEach(d => {
            dayCounts[new Date(d).getDay()]++;
        });
    });
    const mostActiveDay = dayCounts.indexOf(Math.max(...dayCounts));

    // Current streak (consecutive days with at least one check-in)
    const checkDateStrings = new Set(
        goals.flatMap(g => g.checkedDates.map(d => new Date(d).toDateString()))
    );
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        if (checkDateStrings.has(d.toDateString())) {
            streak++;
        } else {
            break;
        }
    }

    // Goals created this month
    const now = new Date();
    const createdThisMonth = goals.filter(g => {
        const d = new Date(g.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    // Completion rate this week for recurring goals
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const checksThisWeek = goals.reduce((sum, g) => {
        return sum + g.checkedDates.filter(d => new Date(d) >= startOfWeek).length;
    }, 0);

    return (
        <div className="stats-container">
            <div className="stats-summary-grid">
                <div className="stat-card">
                    <span className="stat-value">{totalCheckIns}</span>
                    <span className="stat-label">Total Check-ins</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{streak} 🔥</span>
                    <span className="stat-label">Day Streak</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{oneTimeCompleted}</span>
                    <span className="stat-label">One-time Goals Done</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{checksThisWeek}</span>
                    <span className="stat-label">Check-ins This Week</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{createdThisMonth}</span>
                    <span className="stat-label">Goals Created This Month</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{dayCounts[mostActiveDay] > 0 ? dayLabels[mostActiveDay] : "—"}</span>
                    <span className="stat-label">Most Active Day</span>
                </div>
            </div>

            <section className="stats-section">
                <h2 className="stats-section-title">Top 10 Goals by Check-ins</h2>
                {top10.length === 0 && <p className="stats-empty">No recurring goals tracked yet.</p>}
                <div className="top-goals-list">
                    {top10.map((goal, index) => (
                        <div key={goal.id} className="top-goal-row">
                            <span className="top-goal-rank">#{index + 1}</span>
                            <span className="top-goal-icon">{goal.icon}</span>
                            <div className="top-goal-info">
                                <span className="top-goal-title">{goal.title}</span>
                                <div className="top-goal-bar-wrap">
                                    <div
                                        className="top-goal-bar"
                                        style={{ width: `${(goal.checkedDates.length / maxChecks) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <span className="top-goal-count">{goal.checkedDates.length}×</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="stats-section">
                <h2 className="stats-section-title">Activity by Day of Week</h2>
                <div className="day-bar-chart">
                    {dayLabels.map((label, i) => (
                        <div key={label} className="day-bar-col">
                            <div
                                className="day-bar"
                                style={{ height: `${dayCounts[i] > 0 ? Math.max(8, (dayCounts[i] / Math.max(...dayCounts)) * 100) : 4}%` }}
                            />
                            <span className="day-bar-label">{label}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Statistics;
