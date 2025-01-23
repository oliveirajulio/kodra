import "./index.css"
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import getTask from "../../services/service-gettask";
import addTask from "../../services/service-addtask";
import deleteTask from "../../services/service-deletetask";
import Select from "react-select"
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { create } from "@mui/material/styles/createTransitions";



function Home() {

    
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showIcon, setShowIcon] = useState(true);
  const [open, setopen] = useState(false)
  const [open2, setopen2] = useState(false)
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ task_id: '', type: '', name: '' });
  const [showModal, setShowModal] = useState(false);
  const [modalTask, setModalTask] = useState(false)
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [selectedOption, setselectOption] = useState(null);
  const [taskname, settaskname] = useState("");
  const [description, setdescription] = useState("")
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); 
  const [selectedTask, setSelectedTask] = useState(null); // Tarefa 

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const openModalTask = (task) => {
      setSelectedTask(task)
      setModalTask(true)
      setShowModal(true)
    }
    const closeModalTask = () => {
      setModalTask(false);
      setShowModal(false)
    } 

  

    

    const customStyles = {
        option: (styles, { data, isFocused, isSelected }) => {
          const backgroundColor = isSelected || isFocused
            ? data.priority === "URGENT"
              ? "#e63946"
              : data.priority === "HIGH"
              ? "#f77f00"
              : data.priority === "MEDIUM"
              ? "#2986cc "
              : "#2a9d8f"
            : styles.backgroundColor;
      
          return {
            ...styles,
            backgroundColor,
            color: isSelected || isFocused ? "white" : styles.color, // Ajusta a cor do texto para melhor contraste
          };
        },
        singleValue: (styles, { data }) => ({
          ...styles,
          backgroundColor:
            data.priority === "URGENT"
              ? "#e63946"
              : data.priority === "HIGH"
              ? "#f77f00"
              : data.priority === "MEDIUM"
              ? "#2986cc "
              : "#2a9d8f",
          color: "white",
          padding: "2px 8px",
          borderRadius: "4px",
          width: "6vw",
        }),
      };
      

      const getColor = (type) => {
        console.log(type); // Verifica o valor de 'type' que está chegando
        switch (type) {
          case "URGENT":
            return "#e63946";
          case "HIGH":
            return "#f77f00";
          case "MEDIUM":
            return "#2986cc ";
          case "LOW":
            return "#2a9d8f";
          default:
            return "transparent";
        }
      };
      
      
      
      const getFormattedDateBackend = (date) => {
        // Ajusta a data para o fuso horário do Brasil
        const localDate = new Date(date.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
      
        const year = localDate.getFullYear();
        const month = String(localDate.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda
        const day = String(localDate.getDate()).padStart(2, '0'); // Adiciona zero à esquerda
      
        return `${year}-${month}-${day}`; // Formato "YYYY-MM-DD"
      };
      

      const getFormattedDate = (date) => {
        // Usa o fuso horário local do Brasil
        const options = { month: "long", day: "numeric", year: "numeric", timeZone: "America/Sao_Paulo" };
        const formattedDate = date.toLocaleDateString("en-US", options);
      
        const day = date.getDate();
        const month = formattedDate.split(' ')[0]; // "January", etc.
        const year = date.getFullYear();
      
        // Função para adicionar o sufixo ao dia
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
        { value: "URGENT", label: "Urgent", priority: "URGENT" },
        { value: "HIGH", label: "High", priority: "HIGH" },
        { value: "MEDIUM", label: "Medium", priority: "MEDIUM" },
        { value: "LOW", label: "Low", priority: "LOW" },
      ];

    const clearmodal = () => {
        settaskname(""); // Limpa o nome da tarefa
        setselectOption(null); // Limpa a prioridade 
        setdescription("")
    };
    

    const change = (selectedOption) => {
        setselectOption(selectedOption);
        console.log(selectedOption);
    };

    const fetchTasks = async () => {
      const formattedDateBackend = getFormattedDateBackend(selectedDate); // Formata para "YYYY-MM-DD"
      console.log("Fetching tasks for date:", formattedDateBackend);
  
      try {
        const fetchedTasks = await getTask(formattedDateBackend);
        console.log("Fetched tasks:", fetchedTasks);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
  
    // Chama fetchTasks quando o componente é montado ou selectedDate muda
    useEffect(() => {
      fetchTasks();
    }, [selectedDate]);
  
  

    const addtask = async () => {
      if (!selectedOption) {
        alert("Please select a project before creating!");
        return;
      }
    
      setLoading(true); // Inicia o estado de carregamento
    
      try {
        const newRow = { 
          selectedOption: selectedOption.value, // Tipo de tarefa
          taskname: taskname, // Nome da tarefa
          date: getFormattedDateBackend(new Date()), // Aqui você usa a função de formatação
          description: description, // Certifique-se de enviar a data aqui
        };
    
        const response = await addTask(newRow); // Faz a requisição para o backend
        console.log("Response:", response);
    
        // Atualiza a lista de tarefas com o novo item retornado pelo backend
        setTasks((prevTasks) => [
          ...prevTasks,
          {
            id: response.id,       // ID retornado pelo backend
            type: response.type,   // Tipo de tarefa
            name: response.name,   // Nome da tarefa
            priority: response.priority || "Low", // Opcional, depende do backend
            description: response.description, // Adicionando a descrição da tarefa

          },
        ]);
    
        Swal.fire({
          position: 'bottom', // A posição do "snackbar"
          icon: 'success', // O ícone (use 'success' ou outro)
          title: 'Task created sucessfully!', // O título da notificação
          showConfirmButton: false, // Remove o botão de confirmação
          timer: 2000, // O tempo em milissegundos (3 segundos) antes de desaparecer
          toast: true, // Habilita o modo "toast" para parecer um snackbar
          background: '#4CAF50', // Cor de fundo, por exemplo, verde para sucesso
          color: '#fff', // Cor do texto
          padding: '3px 6px', // Padding para o conteúdo
          customClass: {
            popup: 'snackbar-popup', // Você pode adicionar uma classe customizada para o estilo
          },
        });

        clearmodal()
        closeModal(); // Fecha o modal após a criação
      } catch (error) {
        console.error("Error adding row:", error);
        alert("Failed to add row. Try again.");
      } finally {
        setLoading(false);
        setselectOption(null); // Finaliza o estado de 
        console.log('Selected Task Description:', newTask?.description);
      }
    };

    const deletetask = (taskId) => {
      deleteTask(taskId)
        .then(() => {
          Swal.fire({
            position: 'bottom', // Posição na tela
            icon: 'warning', // Ícone de alerta (pode ser 'error' ou 'warning')
            title: 'Task deleted sucessfully!', // Mensagem da notificação
            showConfirmButton: false, // Remover o botão de confirmação
            timer: 2000, // Duração do alerta (3 segundos)
            toast: true, // Habilita o formato toast (pop-up)
            background: '#d32f2f', // Cor de fundo vermelha (estilo MUI erro)
            color: '#fff', // Cor do texto (branco)
            padding: '10px 20px', // Padding interno do toast
            customClass: {
              popup: 'snackbar-popup', // Classe personalizada se necessário
            },
          });
          fetchTasks(); // Atualiza a lista de tarefas
          setModalTask(false)
          closeModal()
        })
        .catch((error) => {
          console.error(error);
        });
    };

    


    const DateChange = (date) => {
      setSelectedDate(date);
      setFormattedDate(getFormattedDate(date)); // Atualiza a data humanizada para exibição
      console.log("Selected Date:", date);
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
                      SHW();  // Chama a função SHW
                      weekday(date);  // Chama a função weekday
                    }}
                    inline
                    className="custom-datepicker"
                    dateFormat="yyyy-MM-dd"  // Mantém o formato de data do DatePicker
                  /> 
                            
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
                        <p className="lenght">{tasks.length > 1 ? `${tasks.length} issues` : `${tasks.length} issue`}</p>
                        </summary>
                        <div className="list">
                            <ul>
                                {tasks.map((task, index) => ( 
                                <li className="tasks" key={index}>
                                    <span className="task-id">{task.id}</span> 
                                     <span onClick={() => openModalTask(task)} className="span-name">{task.name}</span>
                                    <span className="task-type" style={{ marginLeft: "0.7vw", backgroundColor: getColor(task.type), padding: "0.1vh 6px", borderRadius: "4px"}}
                                    >{task.type}
                                    </span>
                                    <div className="man-btn">
                                      <button onClick={openModalTask} id="edit"><EditRoundedIcon className="icon-man" fontSize="medium" /></button>
                                      <button onClick={() => deletetask(task.id)} id="delete">
                                        <DeleteIcon className="icon-man" fontSize="medium" />
                                      </button>
                                    </div>
                                </li>
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
                              placeholder="Ex: Steal the moon"
                             className="input-select"
                             type="text"
                             value={taskname} 
                             onChange={(e) => settaskname(e.target.value)} 
                             />
                            <label className="lab">Priority</label>
                            <Select className="custom-select"
                             classNamePrefix="custom" 
                             options={options} 
                             onChange={change} 
                             placeholder="Select priority"
                            styles={customStyles}
                            value={selectedOption} // Garante que o valor selecionado seja controlado
                            isClearable={true} // Adiciona a opção de limpar o valor manualmente
                            />
                            <label className="labsu">Summary</label>
                            <input
                             className="input-summary"
                             type="text"
                             />
                            <div className="custom-quill">
                                <label className="lab">Description</label>
                                <ReactQuill
                                value={description} 
                                onChange={setdescription} 
                                />
                             </div> 
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
            <div id={modalTask ? "modal-task" : ""}>
              <div className={modalTask ? "overlay-task" : ""}>
               <div className={modalTask ? "navi-btn" : "navi-off"}>
                <button onClick={closeModalTask} className="cancel-mt"><CloseIcon className="ic-mt"/></button>
               </div>
               <div className={modalTask ? "ctn-task" : " " } >
                <div className={modalTask ? "info-task" : " "}>
                  <h2 className={modalTask ? "modaltask-title" : "modalTask-off"}>{selectedTask?.name}</h2>
                  <label className={modalTask ? "labss" : "off"}>Description</label>
                  <div className={ modalTask ? "description-content" : "off"}>
                  {selectedTask?.description ? (
                    <div dangerouslySetInnerHTML={{ __html: selectedTask?.description }} />
                  ) : (
                    <p>No description available.</p>
                  )}
                </div>
                </div>
                <div className={modalTask ? "state-task" : " state-off"}>
                 <div className={modalTask ? "action-task" : "off"}>
                  <Select 
                  className={modalTask ? "select-state" : "off"}
                  classNamePrefix="state"
                  placeholder="Task state"
                  
                  />
                    
                </div>        
                </div>
               </div>
              </div>
            </div>
        </div>
    )
}

export default Home;