import "./index.css"
import React, { useState, useEffect, useRef} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createArea, getAreas, deleteArea } from "../../services/service-area";
import getUser from "../../services/service-getuser";
import getTask from "../../services/service-gettask";
import addTask from "../../services/service-addtask";
import deleteTask from "../../services/service-deletetask";
import updateTaskState from "../../services/service-state";
import Select from "react-select"
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import loadingIcon from "./loading.svg";





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
import CheckIcon from '@mui/icons-material/Check';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import CropSquareOutlinedIcon from '@mui/icons-material/CropSquareOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareIcon from '@mui/icons-material/Share';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import AddLinkIcon from '@mui/icons-material/AddLink';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AddIcon from '@mui/icons-material/Add';


function Home() {

    
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showIcon, setShowIcon] = useState(true);
  const [open, setopen] = useState(false)
  const [openboard, setopenboard] = useState(false)
  const [tasks, setTasks] = useState([]);
  const [user, setuser] = useState(false)
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
  const [loadingtask, setLoadingTask] = useState(false); 
  const [selectedTask, setSelectedTask] = useState(null); // Tarefa 
  const [tempState, setTempState] = useState(selectedTask?.state || "Not done"); // Armazenar temporariamente o estado selecionado
  const [btnClick, setBtnClick] = useState(false);
  const [menuUser, setmenuUser] = useState(false)
  const [placeholder, setPlaceholder] = useState("Planeje seu dia de forma eficaz. Comece selecionando uma data:");  // Adiciona um estado para a frase
  const [areas, setAreas] = useState([]);
  const [isEditingArea, setIsEditingArea] = useState(false);
  const [tempAreaId, setTempAreaId] = useState(null);
  const [newAreaName, setNewAreaName] = useState(" ");
  const newAreaRef = useRef(null); 
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);



    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const openModalTask = (task) => {
      setSelectedTask(task)
      setTempState(task.state)
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
              ? "#6600cc"
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
              ? "#6600cc"
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

      const StateStyles = {
        control: (styles, { data, selectProps }) => ({
          ...styles,
          backgroundColor:
           selectProps.value?.value === "Done"
              ? "#2ac082" // Verde para "Done"
              : selectProps.value?.value === "Doing"
              ? "#2196F3" 
              : selectProps.value?.value === "Not done"// Azul para "Doing"
              ? "#F44336"
             : "#1d2125", 
          color: "white",
          border: "none",
          boxShadow: "none"
        }),
      
        singleValue: (styles, { data }) => ({
          ...styles,
          color: "282c30", // Contraste do texto
        }),
      
        option: (styles, { data, isFocused, isSelected }) => {
          const backgroundColor =
            isSelected
              ? data.value === "Done"
                ? "#2ac082" // Verde
                : data.value === "Doing"
                ? "#2196F3" // Azul
                : data.value === "Not done"
                ? "#F44336"
                : "#1d2125" 
                : isFocused
                ? "#2a2f34" // Cor de hover para todas as opções
                : styles.backgroundColor;
      
          return {
            ...styles,
            backgroundColor,
            color: isSelected ? "282c30" : styles.color,
            cursor: "pointer",
          };
        },

        dropdownIndicator: (styles) => ({
          ...styles,
          color: "#282c30", // Cor da setinha
          "&:hover": {
            color: "#282c30", // Cor da setinha ao passar o mouse
          },
        }),
      
        indicatorSeparator: () => ({
          display: "none", // Remove o traço vertical
        }),

      };
            

      const getColor = (type) => {
        console.log(type); // Verifica o valor de 'type' que está chegando
        switch (type) {
          case "URGENT":
            return "#6600cc";
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
            const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
            setDayOfWeek(dayName);
        }
      };

      const options = [
        { value: "URGENT", label: "Urgent", priority: "URGENT" },
        { value: "HIGH", label: "High", priority: "HIGH" },
        { value: "MEDIUM", label: "Medium", priority: "MEDIUM" },
        { value: "LOW", label: "Low", priority: "LOW" },
      ];

      const statesOptions = [
        { value: "Done", label: "Done"},
        { value: "Doing", label: "Doing" },
        { value: "Not done", label: "Not done"},
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
      // Verifique se selectedDate é válido antes de chamar getFormattedDateBackend
      if (!selectedDate || !(selectedDate instanceof Date) || isNaN(selectedDate)) {
        console.log("Data inválida, não foi possível buscar as tarefas.");
        return; // Não tenta buscar as tarefas se a data for inválida
      }
    
      const formattedDateBackend = getFormattedDateBackend(selectedDate); // Formata para "YYYY-MM-DD"
      console.log("Fetching tasks and user for date:", formattedDateBackend);
    
      setLoadingTask(true); // Começa o carregamento

      try {
        // Buscar tasks e user ao mesmo tempo
        const [fetchedTasks, fetchedUser] = await Promise.all([
          getTask(formattedDateBackend),
          getUser(),
        ]);
    
        console.log("Fetched tasks:", fetchedTasks);
        console.log("Fetched user:", fetchedUser);
    
        setTasks(fetchedTasks);
        setuser(fetchedUser);
      } catch (error) {
        console.error("Error fetching tasks or user:", error);
      } finally {
        setLoadingTask(false); // Finaliza o carregamento
      }
    };

    useEffect(() => {
      loadAreas();
    }, []);

    
    useEffect(() => {
      fetchTasks();
    }, [selectedDate]); // Isso só será chamado se selectedDate for válido
    
    
    const AddArea = async () => {
      if (newAreaName.trim()) {
        try {
          // Chama a API para criar a nova área
          const newArea = await createArea(newAreaName);
    
          // Atualiza a lista com a resposta da API
          setAreas([...areas, newArea]);
    
          // Limpa os estados de input
          setNewAreaName("");
          setIsEditingArea(false);
        } catch (error) {
          console.error("Erro ao criar área:", error);
        }
      }
    };
    
  
    const startEditing = (area) => {
      setTempAreaId(area.id);
      setNewAreaName(area.name);

      setIsEditingArea(true);
    };
  
    // UseEffect para carregar as áreas ao montar o componente
    useEffect(() => {
      loadAreas();
    }, []);

    const cancelEditing = () => {
      setIsEditingArea(false);
      setNewAreaName(""); // Limpa o campo de edição
    };
  
    // UseEffect para carregar as áreas ao montar o componente
    useEffect(() => {
      loadAreas();
    }, []);
  

    const loadAreas = () => {
      getAreas()
        .then((data) => {
          setAreas(data);
        })
        .catch((err) => {
          console.error("Erro ao carregar áreas:", err);
        });
    };

    const selectFilter = (area) => {
      setSelectedFilter(area.id);
    };
    

    const addtask = async () => {
      if (!selectedOption) {
        alert("Please select a project before creating!");
        return;
      }

      if (!selectedArea) { // Verifica se a área foi selecionada
        alert("Please select an area before creating!");
        return;
      }
    
      setLoading(true); // Inicia o estado de carregamento
    
      try {
        const newRow = { 
          selectedOption: selectedOption.value, // Tipo de tarefa
          taskname: taskname, // Nome da tarefa
          date: selectedDate ? getFormattedDateBackend(selectedDate) : null, // Usa a data selecionada
          description: description, // Certifique-se de enviar a data aqui
          state: "Not Done", // Valor inicial do estado
          area: selectedArea, // Adiciona a área ao objeto

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
            state: response.state || "Not done", // Certifique-se de que o estado esteja 
            area: response.area || "General", // Adicionando a área na tarefa (caso retornada pelo backend)

          },
        ]);
    
        Swal.fire({
          position: 'bottom',
          title: 'Task created successfully!', // O título da notificação
          showConfirmButton: false,
          timer: 2000,
          toast: true,
          background: '#1ed760',
          color: '#fff',
          customClass: {
            popup: 'custom-alert', // Classe customizada para o estilo
          },
          padding: '1px', // Adiciona padding para ajustar o espaçamento interno
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
            position: 'bottom',
            title: 'Task deleted successfully!', // O título da notificação
            showConfirmButton: false,
            timer: 2000,
            toast: true,
            background: '#d32f2f',
            color: '#fff',
            customClass: {
              popup: 'custom-alert', // Classe customizada para o estilo
            },
            padding: '1px', // Adiciona padding para ajustar o espaçamento interno
          });
          fetchTasks(); // Atualiza a lista de tarefas
          setModalTask(false)
          closeModal()
        })
        .catch((error) => {
          console.error(error);
        });
    };

    function StateChange(taskId, newState) {
      // Atualize o estado local para refletir a mudança da tarefa específica
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, state: newState } // Atualiza o estado da tarefa específica
            : task // Deixa as outras tarefas inalteradas
        )
      );
    
      // Atualize no backend
      updateTaskState(taskId, newState)
        .then((response) => {
          console.log("Estado atualizado com sucesso:", response.state);
    
          // Mostra o alerta com SweetAlert2
          Swal.fire({
            position: 'top-right', // Posição no canto inferior direito
            icon: 'success', // Ícone de sucesso
            showConfirmButton: false,
            title: "Confirmed!", // Remove o botão de confirmação
            timer: 1500, // Duração do alerta (em milissegundos)
            toast: true,
            background: 'transparent', // Remove o fundo
            border: 'none',
            customClass: {
              popup: 'custom-confirm', // Classe customizada para efeito
            },
            didOpen: () => {
              // Remove qualquer margem padrão
              document.querySelector('.custom-confirm').style.margin = '0';
            },
          });
        })
        .catch((error) => {
          console.error("Erro ao atualizar estado:", error);
    
          // Opcional: Reverte a mudança local em caso de erro
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === taskId
                ? { ...task, state: task.state } // Reverte para o valor original
                : task
            )
          );
    
          // Alerta de erro
          Swal.fire({
            position: 'bottom-right',
            icon: 'error',
            title: 'Failed to update state!',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
          });
        });
    }
    const SignOut = () => {
      localStorage.removeItem("token");     
      localStorage.removeItem("authToken"); 
      window.location.href = "/login";      
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
    
      // Atualize a data somente quando o usuário selecionar uma data
      if (date instanceof Date && !isNaN(date)) {
        setSelectedDate(date);  // Atualiza com a data correta
        setPlaceholder(getFormattedDate(date));  // Atualiza a frase para a data formatada
      }
    };
    

    const MenuUser = () => {
      setmenuUser(!menuUser)
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
                    <button onClick={MenuUser }className="acc"><AccountCircleIcon className="icon-header" fontSize="large"/></button>
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
                        <details className="btn-details" open={openboard} onToggle={(e) => setopenboard(e.target.open)}>
                          <summary className="arrow-board"><span className="info-view">Board</span> {openboard ? <KeyboardArrowDownIcon className="icon-board"/> : <KeyboardArrowRightIcon className="icon-board" />}</summary>
                            <div className={openboard ? "btn-view-enable" : "btn-view"}>
                              <button>Kanban</button>
                              <button>Scrum</button>
                            </div>
                        </details>
                        <button>Binder</button>
                        <button>Calendar</button>
                        <button>Reports</button>
                    </div>
                </div>
            </div>
            <div className={`home ${showModal ? "container-blur" : " "}`}>
               <div className={menuUser ? "menu-user" : "off"}>
                <div className="user">
                  <span><AccountCircleIcon className="icon-user"/></span>
                  <span className="user-name">{user?.username}</span>
                </div>
                <div className="btn-menu">
                  <button className="darkmode">Dark Mode</button>
                  <button onClick={SignOut} className={menuUser ? "signout" : "off"}>Sign Out <PowerSettingsNewIcon className="ic-user"/></button>
                </div>
               </div>
                <div className="info-day">
                  <h3>{selectedDate instanceof Date && !isNaN(selectedDate) ? getFormattedDate(selectedDate) : placeholder}</h3>
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
                            className="icon-calendar"/>
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
                
                <div className="task-section">
                  <nav className="nav-section">
                    <ul>
                      {areas.map((area) => (
                        <li key={area.id}>
                          <button
                            onClick={() => selectFilter(area)}
                            className={selectedFilter === area.id ? "selected" : " "}
                          >
                            {area.name}
                          </button>
                        </li>
                      ))}

                      {isEditingArea ? (
                        <li>
                          <div
                            ref={newAreaRef}
                            contentEditable="true"
                            suppressContentEditableWarning={true}
                            className="editable-button"
                            onBlur={(e) => {
                              const text = e.currentTarget.textContent.trim();
                              if (text) {
                                setNewAreaName(text);
                                AddArea();
                              } else {
                                setIsEditingArea(false); // Cancela se o usuário não digitar nada
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault(); // Impede a quebra de linha
                                const text = e.currentTarget.textContent.trim();
                                if (text) {
                                  setNewAreaName(text);
                                  AddArea();
                                }
                              }
                            }}
                            autoFocus
                          />
                        </li>
                      ) : (
                        <li>
                          <button onClick={() => setIsEditingArea(true)}><AddIcon className="ic-section"/>Add Filter</button>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>

                
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
                        <p className="length">
                          {loadingtask ? "Loading..." : tasks.length > 1 ? `${tasks.length} tasks` : `${tasks.length} task`}
                        </p>
                        <span>
                          {loadingtask && <img src={loadingIcon} alt="Carregando..." className="loading-icon" />}
                        </span>
                        </summary>
                        <div className="list">
                            <ul>
                                {tasks.map((task, index) => ( 
                                <li className="tasks" key={index}>
                                  <span
                                      className={`task-state-icon ${task.state.replace(" ", "-").toLowerCase()}`}
                                    >
                                      {task.state === "Done" && <CheckIcon className="ic-state" fontSize="small"/>}
                                      {task.state === "Doing" && <CropSquareOutlinedIcon className="ic-state" fontSize="small"/> }
                                      {task.state === "Not done"&& <FiberManualRecordIcon className="ic-state" fontSize="small"/>}
                                    </span>
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
                        <button onClick={openModal} className="add-issue">+ Create task</button>
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
            {modalTask && (
  <div id="modal-task">
    <div className="overlay-task">
      <div className="navi-btn">
        <button className="share-mt"><ShareIcon className="ic-mt"/></button>
        <button className="more-mt"><MoreHorizIcon className="ic-mt"/></button>
        <button onClick={closeModalTask} className="cancel-mt">
          <CloseIcon className="ic-mt" />
        </button>
      </div>
      <div className="ctn-task">
        <div className="info-task">
          <h2 className="modaltask-title">{selectedTask?.name}</h2>
          <ul className="list-btn-mt">
            <button className="attach"><AttachFileIcon className="ic-mt-list"/>Attach</button>
            <button className="subtask"><LibraryAddCheckOutlinedIcon className="ic-mt-list"/> Create subtask</button>
            <button className="link"><AddLinkIcon className="ic-mt-list"/> Link issue</button>
          </ul>
          <label className="labss">Description</label>
          <div className="description-content">
            {selectedTask?.description ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedTask?.description,
                }}
              />
            ) : (
              <p>No description available.</p>
            )}
          </div>
        </div>
        <div className="state-task">
          <div className="action-task">
          <Select
            className={modalTask ? "select-state" : "off"}
            classNamePrefix="state"
            placeholder="State"
            options={statesOptions}
            styles={StateStyles}
            value={{
              value: tempState, // Usa o estado temporário
              label: tempState,
            }}
            onChange={(option) => {
              setTempState(option?.value); // Atualiza o estado temporário com a nova opção
            }}
          />

          
          <button className={modalTask ? "btn-send" : "off"}
                  onClick={() => {
                    if (selectedTask?.id) {
                      // Atualiza o estado local e também no backend
                      setTasks((prevTasks) =>
                        prevTasks.map((task) =>
                          task.id === selectedTask.id
                            ? { ...task, state: tempState } // Atualiza a tarefa no estado local
                            : task
                        )
                      );
                      StateChange(selectedTask.id, tempState); // Envia a alteração para o backend
                    }
                  }}
              >

            Save <CheckIcon fontSize="small" className="ic-confirm" />
          </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

        </div>
    )
}

export default Home;