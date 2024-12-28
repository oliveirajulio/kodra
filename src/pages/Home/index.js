import "./index.css"
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function Home() {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [showIcon, setShowIcon] = useState(true);



    const getFormattedDate = (date) => {
        if (!date) return "No date selected";
    
        const day = date.getDate();
        const month = date.toLocaleDateString("en-US", { month: "long" });
        const year = date.getFullYear();
    
        const getDayWithSuffix = (day) => {
          if (day % 10 === 1 && day !== 11) return `${day}ᵗˢ`; 
          if (day % 10 === 2 && day !== 12) return `${day}ⁿᵈ`;
          if (day % 10 === 3 && day !== 13) return `${day}ʳᵈ`;
          return `${day}ᵗʰ`; 
        };
    
        return `${month} ${getDayWithSuffix(day)}, ${year}`;
      };

        const SHW = () => {
            setShowCalendar(!showCalendar);
            setShowIcon(!showIcon);
        }

    return (
        <div className="container">
            <div className="header"></div>
            <div className="sidebar"></div>
            <div className="home">
                <div className="info-day">
                    <h3>{getFormattedDate(selectedDate)}</h3>
                </div>
                <div className="slc">
                    <input 
                    className="input"
                    type="text"
                    onClick={() => setShowCalendar(true)} />
                    {showIcon && (
                        <button 
                        className="calendar"
                        onClick={SHW}>
                            <CalendarMonthIcon 
                            className="icon"/>
                        </button>
                    )}
                    {showCalendar && (
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => {
                        setSelectedDate(date);
                        SHW();
                         }}
                            inline
                            className="custom-datepicker"/>  
                        )}
                </div>
            </div>
        </div>
    )
}

export default Home;