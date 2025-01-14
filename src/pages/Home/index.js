import "./index.css"
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import getTask from "../../services/service-gettask";
import addTask from "../../services/service-addtask";
import Select from "react-select"

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { create } from "@mui/material/styles/createTransitions";


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
    const [selectedOption, setselectOption] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); 

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

      useEffect(() => {
        const dayName = selectedDate.toLocaleDateString("en-US", { weekday: "short" });
        setDayOfWeek(dayName);
    }, []);

    
      const addTasks = async (e) => {
        e.preventDefault();
        try {
          const data = await addTask({ selectedOption});
          setMessage(data.message);
        } catch (error) {
          console.error("Error:", error);
        }
      };
        

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

    const options = [
        {value: "AAA", label: "AAA"},
        {value: "BBB", label: "BBB"},
        {value: "CCC", label: "CCC"},
    ]

    const change = (selectedOption) => {
        setselectOption(selectedOption);
        console.log(selectedOption);
    };

    const addtask = async () => {
        if (!selectedOption) {
          alert("Please select a project before creating!");
          return;
        }
    
        setLoading(true); // Inicia o estado de carregamento
    
        try {
          const newRow = { selectedOption: selectedOption.value }; // Cria o objeto para enviar
          const response = await addTask(newRow);
          console.log("Response:", response);          // Chama a função para adicionar
          console.log("Row added successfully:", response);
          const newTask = response; // O backend agora retorna um objeto com id e content
          setTasks((prevTasks) => [...prevTasks, { id: response.id, type: newTask.content }]);
          alert("Row added successfully!");
          closeModal(); // Fecha o modal após a criação
        } catch (error) {
          console.error("Error adding row:", error);
          alert("Failed to add row. Try again.");
        } finally {
          setLoading(false); // Finaliza o estado de carregamento
        }
      };
    

    const SHW = (date) => {
        setShowCalendar(!showCalendar);
        setShowIcon(!showIcon);
        setDayOfWeek(weekday(date));
    }


    return (
        <div className="container">
            <div className={`header ${showModal ? "container-blur" : " "}`}>
                <nav>
                    <ul>
                        <li></li>
                    </ul>
                </nav>
                <div className="search-input">
                    <input 
                        className="search-ipt"
                        placeholder="Search"
                        />
                </div>
                <div className="btn-header">
                    <button className="not"><NotificationsIcon className="icon-header" fontSize="medium"/></button>
                    <button className="set"><SettingsIcon className="icon-header" fontSize="medium"/></button>
                    <button className="acc"><AccountCircleIcon className="icon-header" fontSize="large"/></button>
                </div>
            </div>
            <div className={`sidebar ${showModal ? "container-blur" : " "}`}>
                <div className="main-title">
                    <h4 className="title-area">Area Test</h4>
                    <h5 className="subtitle-area">subtitle test</h5>
                </div>
                <div className="plan-menu">
                    <p className="intro">PLANNING</p>
                    <div className="buttons">
                        <button>Board</button>
                        <button>Reports</button>
                        <button>issues</button>
                    </div>
                </div>
            </div>
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
                                {tasks.map((task, index) => ( 
                                <li className="tasks" key={index}>{task.id} {task.type}</li>
                             ))} 
                            </ul>
                        </div>
                        <button onClick={openModal} className="add-issue">+ Create issue</button>
                    </details>    
                </div>
            </div>
            <div id={showModal ? "modal-root" : ""}>
                    <div className={showModal ? "overlay" : ""}>
                        <h2 className={showModal ? "title-over" : "title-off"}>Create Task</h2>
                        <div className={showModal ? "select-options" : "select-off"}>
                            <label className="lab">Task Name</label>
                            <input 
                             className="input-select"
                             type="text"
                             placeholder="Enter a name"/>
                            <label className="lab">Project</label>
                            <Select className="custom-select"
                             classNamePrefix="custom" 
                             options={options} 
                             onChange={change} 
                             placeholder="Select one"/>
                        </div>
                        <div className={showModal ? "btn-over" : ""}>
                            <button 
                                onClick={addtask}
                                disabled={!selectedOption}
                                className={showModal ? "create" : "create-off"}>
                                Create
                            </button>
                            <button onClick={closeModal} className={showModal ? "cancel" : "cancel-off"}>Cancel</button>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Home;