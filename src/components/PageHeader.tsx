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
                            ‹
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
                            ›
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
