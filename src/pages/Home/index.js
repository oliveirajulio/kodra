import "./index.css"
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import getTask from "../../services/service-gettask";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


function Home() {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [showIcon, setShowIcon] = useState(true);
    const [open, setopen] = useState(false)
    const [open2, setopen2] = useState(false)
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [dayOfWeek, setDayOfWeek] = useState("");
    const [formattedDate, setFormattedDate] = useState("");



    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
  

    useEffect(() => {
        const fetchTasks = async () => {
          try {
            const fetchedTasks = await getTask(selectedDate);
            setTasks(fetchedTasks);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchTasks();
      }, [selectedDate]);
    


    const getFormattedDate = (date) => {
        if (!date) return "No date selected";
    
        const day = date.getDate();
        const month = date.toLocaleDateString("en-US", { month: "long" });
        const year = date.getFullYear();
        ;
    
        const getDayWithSuffix = (day) => {
          if (day % 10 === 1 && day !== 11) return `${day}ˢᵗ`; 
          if (day % 10 === 2 && day !== 12) return `${day}ⁿᵈ`;
          if (day % 10 === 3 && day !== 13) return `${day}ʳᵈ`;
          return `${day}ᵗʰ`; 
        };
    
        return `${month} ${getDayWithSuffix(day)}, ${year}`;
      };

      const weekday = (date) => {
        if (date instanceof Date && !isNaN(date)) {
            // Atualiza a data selecionada
            setSelectedDate(date);
    
            // Formata o dia da semana
            const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
            setDayOfWeek(dayName);
        }
      };

      
        
    

        const SHW = (date) => {
            setShowCalendar(!showCalendar);
            setShowIcon(!showIcon);
            setDayOfWeek(weekday(date));
        }

    return (
        <div className="container">
            <div className="header">
                <nav>
                    <ul>
                        <li></li>
                    </ul>
                </nav>
            </div>
            <div className={`sidebar ${showModal ? "container-blur" : " "}`}></div>
            <div className={`home ${showModal ? "container-blur" : " "}`}>
                <div className="info-day">
                    <h3>{getFormattedDate(selectedDate)}</h3>
                </div>
                <div className="slc">
                    <input 
                    className="input"
                    type="text"
                    value={dayOfWeek}
                    onClick={() => setShowCalendar(true)} 
                    onChange={(date) => {
                        weekday(date)
                    }}/>
                    
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
                        weekday(date)
                         }}
                            inline
                            className="custom-datepicker"/>  
                            
                        )}
                <div className='insights'>
                    <TrendingUpIcon className="icon-insight"/>
                    <button className="insights-btn">Insights</button>
                    <div className="insight-board"></div>
                </div>
                </div>
                <div className='board'>
                    <details open={open} onToggle={(e) => setopen(e.target.open)}>
                        <summary>{open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                        <h4 className="title">Work</h4>
                        <p className={open ? "lenght" : "lenght-off"}>{tasks.length > 1 ? `${tasks.length} issues` : `${tasks.length} issue`}</p>
                        </summary>
                        <div className="list">
                            <ul>
                                {tasks.map((task) => ( 
                                <li></li>
                             ))} 
                            </ul>
                        </div>
                        <button onClick={openModal} className="add-issue">+ Create issue</button>
                    </details>    
                </div>
            </div>
            <div id="modal-root">
                    <div className={showModal ? "overlay" : ""}>
                        <h2 className={showModal ? "title-over" : "title-off"}>Create Issue</h2>
                        <div className={showModal ? "btn-over" : ""}>
                            <button className={showModal ? "create" : "create-off"}>Create</button>
                            <button onClick={closeModal} className={showModal ? "cancel" : "cancel-off"}>Cancel</button>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Home;