import {formatedDate, getWeekNumber} from "../helpers/helpers.ts";
import "../style/DayPageHeader.scss";

interface props {
    title: string,
    selectedDate?: Date,
    onPrev?: () => void,
    onNext?: () => void,
    rightContent?: string,
}

const PageHeader = ({title, selectedDate, onPrev, onNext, rightContent}: props) => {
    const date = selectedDate || new Date();
    const defaultRight = `Week ${getWeekNumber(date)}`;
    const right = rightContent || defaultRight;

    return (
        <header className="page-header-container">
            <div className="page-header">
                <div className="header-left">
                    <p>{formatedDate(date)}</p>
                </div>
                <div className="header-center">
                    {onPrev && (
                        <button 
                            onClick={onPrev} 
                            className="nav-button" 
                            aria-label="Previous"
                            title="Previous"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                        </button>
                    )}
                    <h1>{title}</h1>
                    {onNext && (
                        <button 
                            onClick={onNext} 
                            className="nav-button" 
                            aria-label="Next"
                            title="Next"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                        </button>
                    )}
                </div>
                <div className="header-right">
                    <p>{right}</p>
                </div>
            </div>
        </header>
    );
}

export default PageHeader;
