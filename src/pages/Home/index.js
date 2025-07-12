import "./index.css"
import React, { useState, useEffect, useRef} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createArea, getAreas, deleteArea } from "../../services/service-area";
import { useTaskRefresh } from "../../contexts/RefreshContext";
import GetTasksStatus from "../../services/service-gettaskstatus";
import GetTasksProgress from "../../services/service-taskprogress";
import GetProductivity from "../../services/service-productivity";
import getUser from "../../services/service-getuser";
import getTask from "../../services/service-gettask";
import getEvent from "../../services/service-getevents";
import addTask from "../../services/service-addtask";
import editTask from "../../services/servoce-edittask";
import deleteTask from "../../services/service-deletetask";
import addEvent from "../../services/service-addevent";
import updateTaskState from "../../services/service-state";
import useCalendar from "../../components/Calendar";
import TasksByStatusChart from "../../components/Charts/StatusType";
import TaskProgressBar from "../../components/Charts/ProgressBar";
import ProductivityLineChart from "../../components/Charts/ProductivityLine";
import { format, isSameDay } from 'date-fns';
import Select from "react-select"
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import loadingIcon from "./loading.svg";
import Switch from '@mui/material/Switch';



import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
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
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import ViewArrayIcon from '@mui/icons-material/ViewArray';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { FastForward } from "@mui/icons-material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import SsidChartOutlinedIcon from '@mui/icons-material/SsidChartOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import ScoreOutlinedIcon from '@mui/icons-material/ScoreOutlined';

function Home() {

    
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showIcon, setShowIcon] = useState(true);
  const [open, setopen] = useState(true);
  const [openboard, setopenboard] = useState(true);
  const [opentask, setopentask] = useState(true);
  const [openevent, setopenevent] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([])
  const [user, setuser] = useState(false)
  const [newTask, setNewTask] = useState({ task_id: '', type: '', name: '' });
  const [showModal, setShowModal] = useState(false);
  const [showModalEvent, setShowModalEvent] = useState(false);
  const [modalTask, setModalTask] = useState(false)
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [selectedOption, setselectOption] = useState(null);
  const [taskname, settaskname] = useState("");
  const [description, setdescription] = useState("")
  const [titleevent, settitleevent] = useState("");
  const [everyday, seteveryday] = useState(false); // ou false
  const [onrepeat, setonrepeat] = useState(false);
  const [starttime, setstarttime] = useState("");
  const [endtime, setendtime] = useState("");
  const [colorevent, setcolorevent] = useState("#b54cff");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); 
  const [loadingtask, setLoadingTask] = useState(false); 
  const [selectedTask, setSelectedTask] = useState(null); // Tarefa 
  const [tempState, setTempState] = useState(selectedTask?.state || "Not done"); // Armazenar temporariamente o estado selecionado
  const [btnClick, setBtnClick] = useState(false);
  const [menuUser, setmenuUser] = useState(false)
  const menuRef = useRef(null);
  const [placeholder, setPlaceholder] = useState("Selecione uma data:");  // Adiciona um estado para a frase
  const [areas, setAreas] = useState([]);
  const [isEditingArea, setIsEditingArea] = useState(false);
  const [tempAreaId, setTempAreaId] = useState(null);
  const [newAreaName, setNewAreaName] = useState(" ");
  const newAreaRef = useRef(null); 
  const [selectedArea, setSelectedArea] = useState(null);  
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [TaskView, setTaskView] = useState(true)
  const [KbnView, setKbnView] = useState(false)
  const [ScrView, setScrView] = useState(false)
  const [ScheduleView, setScheduleView] = useState(false)
  const [CalendarView, setCalendarView] = useState(false)
  const [BinderView, setBinderView] = useState(false)
  const {currentDate, changeMonth, getDaysInMonth } = useCalendar();
  const days = getDaysInMonth();
  const [taskData, setTaskData] = useState({ done: 0, in_progress: 0, not_done: 0 });
  const { triggerRefresh } = useTaskRefresh();
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const fetchedUser = useRef(false);
  const currentMonth = new Date(selectedDate).getMonth();
  const currentYear = new Date(selectedDate).getFullYear();


    const openModal = () => setShowModal(true);
    const openModalEvent = (date) => {
      console.log("Abrindo modal com data:", date)
      setShowModalEvent(true)
      setSelectedDate(date); // garante que pega a data clicada
    }
    const openModaledit = (task) => {
      setSelectedTask(task);
      setTempState(task.state);
      settaskname(task.name);
      setdescription(task.description);
      setselectOption({ value: task.type, label: task.type, priority: task.type });
      setSelectedFilter(task.area_id);
      setShowModal(true);
    }; 
    const closeModal = () => {
      setShowModal(false);
      setSelectedTask(null); // Limpa a tarefa selecionada
      clearmodal();
    };
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

    const closeModalEvent = () => {
      setShowModalEvent(false)
    }
    
    
    const OpenTaskView = () => {
      setTaskView(prevState => !prevState);
      setKbnView(false);
      setScrView(false)
      setScheduleView(false)
      setCalendarView(false)
      setBinderView(false)
    } 
    
    const OpenKbnView = () => {
      setKbnView(prevState => !prevState);
      setScrView(false)
      setScheduleView(false)
      setCalendarView(false)
      setBinderView(false)
      setTaskView(false)

    }
    const OpenScrView = () => {
      setScrView(prevState => !prevState); 
      setKbnView(false)
      setScheduleView(false)
      setCalendarView(false)
      setBinderView(false)
      setTaskView(false)



    }
    const OpenScheduleView = () => {
      setScheduleView(prevState => !prevState); 
      setKbnView(false)
      setScrView(false)
      setCalendarView(false)
      setBinderView(false)
      setTaskView(false)


    }
    const OpenCalendarView = () => {
      setCalendarView(prevState => !prevState);
      setKbnView(false)
      setScrView(false)
      setScheduleView(false)
      setBinderView(false)
      setTaskView(false)

    }
    
    const OpenBinderView = () => {
      setBinderView(prevState => !prevState);
      setKbnView(false)
      setScrView(false)
      setScheduleView(false)
      setCalendarView(false)
      setTaskView(false)
    }

const prevDay = () => {
  const newDate = new Date(selectedDate);
  newDate.setDate(newDate.getDate() - 1);
  setSelectedDate(newDate);
  weekday(newDate);
};

const nextDay = () => {
  const newDate = new Date(selectedDate);
  newDate.setDate(newDate.getDate() + 1);
  setSelectedDate(newDate);
  weekday(newDate);
};

useEffect(() => {
    // Seta o dia da semana atual ao montar o componente
    const today = new Date();
     setDayOfWeek(today.toLocaleDateString("en-US", { weekday: "long" }));
  }, []);

    

    const customStyles = {
        
        option: (styles, { data, isFocused, isSelected }) => {
          const backgroundColor =
            isSelected
              ? data.priority === "URGENT"
              ? "#6600cc"
              : data.priority === "HIGH"
              ? "#f77f00"
              : data.priority === "MEDIUM"
              ? "#2986cc "
              : "000000" 
                : isFocused
                ? " " // Cor de hover para todas as opções
                : styles.backgroundColor;
      
          return {
            ...styles,
            backgroundColor,
            color: isSelected ? "282c30" : styles.color,
            cursor: "pointer",
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
                ? " " // Cor de hover para todas as opções
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

      const goToToday = () => {
        const today = new Date();
        setSelectedDate(today);
        setFormattedDate(getFormattedDate(today));
        setDayOfWeek(today.toLocaleDateString("en-US", { weekday: "long" }));
        
        // If the calendar is closed, we should update the placeholder
        if (!showCalendar) {
          setPlaceholder(getFormattedDate(today));
        }
        
        // This will trigger the useEffect that fetches tasks for the selected date
        // No need to call fetchTasks() explicitly
      };

      const options = [
        { value: "URGENT", label: "Urgent", priority: "URGENT" },
        { value: "HIGH", label: "High", priority: "HIGH" },
        { value: "MEDIUM", label: "Medium", priority: "MEDIUM" },
        { value: "LOW", label: "Low", priority: "LOW" },
      ];

      const statesOptions = [
        { value: "Done", label: "Done", className: "react-select__option--done" },
        { value: "Doing", label: "Doing", className: "react-select__option--doing" },
        { value: "Not done", label: "Not done", className: "react-select__option--not-done" }
      ];

    const clearmodal = () => {
        settaskname(""); // Limpa o nome da tarefa
        setselectOption(null); // Limpa a prioridade 
        setdescription("")
    };

    const clearmodalevent =() => {
      settitleevent("")
      setstarttime("")
      setendtime("")
      seteveryday(false)
      setonrepeat(false)
      setcolorevent("#b54cff")  
    }
    

    const change = (selectedOption) => {
        setselectOption(selectedOption);
        console.log(selectedOption);
    };

    const fetchTasks = async () => {
      if (!selectedDate || !(selectedDate instanceof Date) || isNaN(selectedDate)) {
        console.log("Data inválida, não foi possível buscar as tarefas.");
        return;
      }
    
      const formattedDateBackend = getFormattedDateBackend(selectedDate);
      console.log("Fetching tasks for date:", formattedDateBackend);
    
      setLoadingTask(true);
    
      try {
        const fetchedTasks = await getTask(formattedDateBackend);
        console.log("Fetched tasks:", fetchedTasks);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoadingTask(false);
      }
    };

    const fetchevents = async () => {
      console.log("🔍 Iniciando busca de eventos...");
      
      try {
        const fetchedevents = await getEvent();
        console.log("📅 Eventos retornados do backend:", fetchedevents);
        console.log("📊 Quantidade de eventos:", fetchedevents.length);
        
        // Debug individual dos eventos
        fetchedevents.forEach((event, index) => {
          console.log(`📌 Evento ${index + 1}:`, {
            id: event.id,
            title: event.title,
            date: event.date,
            start_time: event.start_time,
            user_id: event.user_id
          });
        });
        
        setEvents(fetchedevents);
        console.log("✅ Eventos salvos no state");
        
      } catch (error) {
        console.error("❌ Erro ao buscar eventos:", error);
        console.error("❌ Detalhes do erro:", error.response?.data);
      }
    };
// OU se você quiser buscar eventos de uma data específica:
const fetchEventsForDate = async (date) => {
  const formattedDateBackend = getFormattedDateBackend(date);
  console.log("Fetching events for date:", formattedDateBackend);

  try {
    const fetchedevents = await getEvent(formattedDateBackend);
    console.log("Fetched events:", fetchedevents);
    setEvents(fetchedevents);
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

// useEffect atualizado para buscar eventos quando necessário
useEffect(() => {
  fetchevents();
}, [currentDate]); // Buscar quando o mês muda




      getUser()
        .then(user => {
          setuser(user)
          console.log("User:", user);
        })
        .catch(error => {
          console.error("Erro tratado no componente:", error);
        });




    useEffect(() => {
        if (!selectedDate) return;

        const formattedDate = getFormattedDateBackend(selectedDate);

        GetTasksStatus(formattedDate)
        .then((data) => {
          setTaskData(data);
          console.log("taskData recebido:", data);  // <-- aqui
        })
        .catch((err) =>
          console.error("Erro ao buscar status das tarefas:", err)
        );
        }, [selectedDate]);

    useEffect(() => {
      loadAreas();
    }, []);

    
    useEffect(() => {
      fetchTasks();
    }, [selectedDate]); // Isso só será chamado se selectedDate for válido

 
useEffect(() => {
  if (!fetchedUser.current) {
    getUser()
      .then((user) => {
        console.log("👤 Usuário recebido:", user);
        setuser(user);
        fetchedUser.current = true;
      })
      .catch((error) => {
        console.error("❌ Erro ao buscar usuário:", error);
      });
  }
}, []);



    useEffect(() => {
      fetchevents();
    }, []);

  useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setmenuUser(false);
        }
      };

      // Adiciona o listener quando o menu está aberto
      if (menuUser) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }

      // Cleanup: remove o listener quando o componente desmonta ou menu fecha
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [menuUser]);

    const Theme = () => {
      setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark");
    };
  
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

    
    useEffect(() => {
      // Update localStorage and document class when theme changes
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const addtask = async () => {
      if (!selectedOption) {
        alert("Please select a project before creating!");
        return;
      }
    
      if (!selectedFilter) {
        alert("Please select an area before creating!");
        return;
      }
    
      setLoading(true);
    

      try {
        const newRow = { 
          selectedOption: selectedOption.value,
          taskname: taskname,
          date: selectedDate ? getFormattedDateBackend(selectedDate) : null,
          description: description,
          state: "Not done",
          area_id: selectedFilter // Certifique-se que este valor está sendo enviado
        };
    
        const response = await addTask(newRow);
        console.log("Response:", response);
    
        // Atualiza a lista de tarefas incluindo o area_id
        setTasks((prevTasks) => [
          ...prevTasks,
          {
            id: response.id,
            type: response.type,
            name: response.name,
            description: response.description,
            state: response.state || "Not done",
            area_id: response.area_id // Certifique-se que está pegando o area_id da resposta
          },
        ]);
  
      Swal.fire({
        position: 'bottom',
        title: 'Task created successfully!',
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
  
      clearmodal();
      closeModal();
      triggerRefresh();
    } catch (error) {
      console.error("Error adding row:", error);
      alert("Failed to add row. Try again.");
    } finally {
      setLoading(false);
      console.log('Selected Task Description:', newTask?.description);
    }
  }; 
   
  const edittask = async () => {
    if (!selectedTask) {
      alert("No task selected for editing!");
      return;
    }
  
    if (!selectedOption) {
      alert("Please select a priority before updating!");
      return;
    }
  
    if (!selectedFilter) {
      alert("Please select an area before updating!");
      return;
    }
  
    setLoading(true);
  
    try {
      const updatedTaskData = { 
        selectedOption: selectedOption.value,
        taskname: taskname,
        date: selectedDate ? getFormattedDateBackend(selectedDate) : null,
        description: description,
        state: tempState || selectedTask.state,
        area_id: selectedFilter
      };
  
      const response = await editTask(selectedTask.id, updatedTaskData);
      console.log("Edit Response:", response);
  
      // Update the task in the local state
      setTasks((prevTasks) => 
        prevTasks.map(task => 
          task.id === selectedTask.id 
            ? {
                ...task,
                type: response.type,
                name: response.name,
                description: response.description,
                state: response.state,
                area_id: response.area_id
              }
            : task
        )
      );
  
      Swal.fire({
        position: 'bottom',
        title: 'Task updated successfully!',
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        background: '#1e88e5', // Blue color for update
        color: '#fff',
        customClass: {
          popup: 'custom-alert',
        },
        padding: '1px',
      });
  
      clearmodal();
      closeModal(); // Close the modal after updating
    } catch (error) {
      console.error("Error updating task:", error);
      Swal.fire({
        position: 'bottom',
        title: 'Failed to update task!',
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        background: '#d32f2f', // Red color for error
        color: '#fff',
        customClass: {
          popup: 'custom-alert',
        },
        padding: '1px',
      });
    } finally {
      setLoading(false);
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
          triggerRefresh(); 
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const addevent = async () => {
  if (!titleevent) {
    alert("Please enter the event title!");
    return;
  }

  if (!selectedDate) {
    alert("Please select the event date!");
    return;
  }

  const formattedDate = getFormattedDateBackend(selectedDate);

  setLoading(true);

  try {
    const newEvent = {
      title: titleevent,
      is_all_day: everyday,
      is_recurring: onrepeat,
      start_time: starttime,
      end_time: endtime,
      color: colorevent,
      date: formattedDate // sempre use a função segura
    };

    const response = await addEvent(newEvent);

    console.log("Response:", response);

    // Atualiza lista local de eventos
    setEvents((prevEvents) => [
      ...prevEvents,
      {
        id: response.id,
        title: response.title,
        color: response.color,
        start_time: response.start_time,
        end_time: response.end_time,
        is_all_day: response.is_all_day,
        is_recurring: response.is_recurring,
        date: newEvent.date
      },
    ]);

    Swal.fire({
      position: 'bottom',
      title: 'Event created successfully!',
      showConfirmButton: false,
      timer: 2000,
      toast: true,
      background: '#1ed760',
      color: '#fff',
      customClass: {
        popup: 'custom-alert',
      },
      padding: '1px',
    });

    clearmodalevent();
    closeModalEvent();
    triggerRefresh();

  } catch (error) {
    console.error("Error adding event:", error);
    alert("Failed to create event. Try again.");
  } finally {
    setLoading(false);
  }
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
            position: 'bottom', // Posição no canto inferior direito
            showConfirmButton: false,
            title: "Saved!", // Remove o botão de confirmação
            timer: 1000, // Duração do alerta (em milissegundos)
            toast: true,
            background: '#1ed760',
            border: 'none',
            customClass: {
              popup: 'custom-confirm', // Classe customizada para efeito
            },
            didOpen: () => {
              // Remove qualquer margem padrão
              document.querySelector('.custom-confirm').style.margin = '0';
            },
          });
          triggerRefresh();

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
        setmenuUser(prevState => !prevState); 
    }
    
    // Update the filteredTasks logic
    const filteredTasks = selectedFilter
  ? (tasks || []).filter((task) => {
      console.log('Task:', task);
      console.log('Selected Filter:', selectedFilter);
      console.log('Area ID comparison:', task.area_id, selectedFilter);
      
      // Garante que ambos são números para comparação
      return task.area_id === selectedFilter;
    })
  : tasks;

   const filteredEvents = events

    const parseDateBR = (dateString) => {
      const [year, month, day] = dateString.split('-');
      return new Date(year, month - 1, day); // Usa diretamente os valores, sem UTC
    };




    
    // Update the filter selection function
    const selectFilter = (area) => {
      setSelectedFilter((prevFilter) => {
        const newFilter = prevFilter === area ? null : area;
        console.log("Selected Area ID:", area);
        console.log("New Filter Value:", newFilter);
        return newFilter;
      });
    };

    function Dashboard () {
      window.location.href = '/dashboard'
    }

    const today = new Date(); // Data atual no sistema
    today.setHours(0, 0, 0, 0); // Zera o horário para comparar só a data

    const currentMonthEvents = filteredEvents
      .filter(event => {
        const date = parseDateBR(event.date);
        date.setHours(0, 0, 0, 0); // Zera também a hora do evento

        return (
          date >= today &&
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        );
      })
      .sort((a, b) => parseDateBR(a.date) - parseDateBR(b.date));




    return (
        <div className="container">
            <div className={`header ${showModal ? "container-blur" : " "}`}>
              <div className="img-inline">
                <img className="isologo-home" src="/imagens/isologo.png"/>
              </div>
                  <nav className="nav-header">
                      <ul>
                        <button className="btn-nav-home">Home</button>
                        <button onClick={Dashboard} className="btn-nav-dashboard">Dashboard</button>
                        <button className="btn-nav-project">Projects</button>
                        <button className="btn-nav-tasks">My tasks</button>
                        <button className="btn-nav-help 
                        ">Help</button>
                      </ul>
                    </nav>
                <div className="btn-header">
                    <button className="not"><NotificationsIcon className="icon-header" fontSize="medium"/></button>
                    <button className="set"><SettingsIcon className="icon-header" fontSize="medium"/></button>
                    <button onClick={MenuUser }className="acc"><AccountCircleIcon className="icon-header" fontSize="large"/></button>
                </div>
            </div>
            <div className={`sidebar ${showModal ? "container-blur" : " "}`}>
                <div className="plan-menu">
                    <p className="intro">PLANNING</p>
                    <div className="buttons">
                        <details className="btn-details" open={openboard} onToggle={(e) => setopenboard(e.target.open)}>
                          <summary className="arrow-board"><span className="info-view"><LeaderboardIcon className="ic-board-arrow"/><span className="title-info">Board{openboard ? <KeyboardArrowDownIcon className="icon-board"/> : <KeyboardArrowRightIcon className="icon-board" />}</span></span></summary>
                            <div className={openboard ? "btn-view-enable" : "btn-view"}>
                              <button className={TaskView ? "view-active" : ""} onClick={OpenTaskView}><TaskAltIcon className="ic-board"/> Task Management</button>
                              <button className={KbnView ? "view-active" : ""} onClick={OpenKbnView}><CalendarViewWeekIcon className="ic-board"/>Kanban</button>
                              <button className={ScrView ? "view-active" : ""} onClick={OpenScrView}><ViewArrayIcon className="ic-board"/>Scrum</button>
                              <button className={ScheduleView ? "view-active" : ""} onClick={OpenScheduleView}><ScheduleIcon className="ic-board"/>Schedule</button>
                            </div>
                        </details>
                        <button onClick={OpenBinderView}><MenuBookIcon className="ic-boardbtn"/>Student Dashboard</button>
                        <button onClick={OpenCalendarView}><EditCalendarIcon className="ic-boardbtn"/>Calendar</button>
                        <button><AssessmentIcon className="ic-boardbtn"/>Reports</button>
                    </div>
                </div>
            </div>
            <div className={`home ${showModal ? "container-blur" : " "}`}>
               <div ref={menuRef} className={menuUser ? "menu-user" : "off"}>
                <div className="user">
                  <span><AccountCircleIcon className="icon-user"/></span>
                  <span className="user-name">{user?.username}</span>
                </div>
                <div className="btn-menu">
                <button className="darkmode" onClick={Theme}>
                  {theme === "dark" ? (
                    <>
                      <LightModeOutlinedIcon  className="ic-theme" /> Light Mode
                    </>
                  ) : (
                    <>
                      <DarkModeOutlinedIcon className="ic-theme" /> Dark Mode
                    </>
                  )}
                </button>
                  <button onClick={SignOut} className={menuUser ? "signout" : "off"}>Sign Out <PowerSettingsNewIcon className="ic-user"/></button>
                </div>
               </div>
                <div className="info-day">
                  <h3>
                    <span onClick={prevDay}><KeyboardArrowLeftIcon className="ic-info-day-prev"/></span>
                    {selectedDate instanceof Date && !isNaN(selectedDate) ? getFormattedDate(selectedDate) : placeholder}
                    <span onClick={nextDay}><KeyboardArrowRightIcon className="ic-info-day-next"/></span>
                    <button onClick={goToToday} className="direct-today">Today<KeyboardDoubleArrowRightIcon className="ic-direct"/></button>
                  </h3>
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
                            onClick={() => selectFilter(area.id)}
                            className={selectedFilter === area.id ? "selected" : ""}
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
                          <button onClick={() => setIsEditingArea(true)}>
                            <AddIcon className="ic-section" /> Add Filter
                          </button>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>

                  <div className="options-area">
                    <button className="btn-options"><EditRoundedIcon className="ic-options"/></button>
                    <button className="btn-options"><SettingsIcon className="ic-options"/></button>    
                  </div>
                </div>
                

              <div className="main-board">  
                <div className='board'>
                    <details open={opentask} onToggle={(e) => setopentask(e.target.open)}>
                        <summary>{opentask ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                        <h4 className="title">Task Board</h4>
                        <p className="length">
                          {loadingtask 
                            ? "Loading..." 
                            : selectedFilter 
                              ? filteredTasks.length > 1 
                                ? `${filteredTasks.length} tasks` 
                                : `${filteredTasks.length} task`
                              : tasks.length > 1 
                                ? `${tasks.length} tasks` 
                                : `${tasks.length} task`
                          }
</p>
                        <span>
                          {loadingtask && <img src={loadingIcon} alt="Carregando..." className="loading-icon" />}
                        </span>
                        </summary>
                        <div className="list">
                            <ul>
                            {(Array.isArray(filteredTasks) ? filteredTasks : []).map((task, index) => (
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
                                      <button className="markdone">Mark as done</button>
                                      <button onClick={() => openModaledit(task)}  id="edit"><EditRoundedIcon className="icon-man" fontSize="medium" /></button>
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
                  <div className="planner-board">
                    <details open={openevent} onToggle={(e) => setopenevent(e.target.open)}>
                        <summary>{openevent ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                        <h4 className="title">Incoming events</h4>
                      </summary>
                     <div className="list-planner">
                      {currentMonthEvents.length > 0 ? (
                        <ul>
                          {currentMonthEvents.map((event, index) => {
                            const date = parseDateBR(event.date);
                            return (
                              <li className="events" key={index}>
                                <div
                                className="bar-color"
                                style={{ backgroundColor: event.color}}
                              > </div>
                                <span className="date-event">
                                  {date.toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "2-digit",
                                  })}
                                </span>
                                <span className="name-event">{event.title}</span>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <p>No events this month.</p>
                      )}
                    </div>

                    </details>
                  </div>     
                </div>
                <div className="reports-board">
                    <div className="charts">
                      <span className="title-getstatus">Total tasks by state</span>
                      <span className="subtitle-getstatus">Overview of ongoing task states</span>
                      <div className="main-chart">
                        <span className="chart-taskstatus"> 
                          <TasksByStatusChart selectedDate={selectedDate} />
                        </span>
                        <span className="legends">
                          <span className="lg-done">Done</span>
                          <span className="lg-doing">Doing</span>
                          <span className="lg-not-done">Not Done</span>
                        </span>
                      </div> 
                          <div className="main-linechart">
                          <span className="title-linechart">Productivity Line</span>
                          <span className="subtitle-linechart">Productivity line over the weeks</span>
                              <span className="lineproductivity">
                                <ProductivityLineChart selectedDate={selectedDate}/>
                              </span>  
                            </div>
                        <div className="main-progress">
                      <span className="title-getprogress">Progress Bar</span>
                      <span className="subtitle-getprogress">Done tasks overview</span>
                          <span className="progressbar">
                            <TaskProgressBar selectedDate={selectedDate}/>
                          </span>  
                        </div>
                      </div>
                 </div>
                </div>
              </div>
            <div className={KbnView ? "kbn-view" : "kbn-view-hidden"}>
              <div className={menuUser ? "menu-user" : "off"}>
                <div className="user">
                  <span><AccountCircleIcon className="icon-user"/></span>
                  <span className="user-name">{user?.username}</span>
                </div>
                <div className="btn-menu">
                <button className="darkmode" onClick={Theme}>
                  {theme === "dark" ? (
                    <>
                      <LightModeOutlinedIcon  className="ic-theme" /> Light Mode
                    </>
                  ) : (
                    <>
                      <DarkModeOutlinedIcon className="ic-theme" /> Dark Mode
                    </>
                  )}
                </button>
                  <button onClick={SignOut} className={menuUser ? "signout" : "off"}>Sign Out <PowerSettingsNewIcon className="ic-user"/></button>
                </div>
               </div>
                <div className="info-day">
                  <h3>
                    <span onClick={prevDay}><KeyboardArrowLeftIcon className="ic-info-day-prev"/></span>
                    {selectedDate instanceof Date && !isNaN(selectedDate) ? getFormattedDate(selectedDate) : placeholder}
                    <span onClick={nextDay}><KeyboardArrowRightIcon className="ic-info-day-next"/></span>
                  </h3>
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
                            onClick={() => selectFilter(area.id)}
                            className={selectedFilter === area.id ? "selected" : ""}
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
                          <button onClick={() => setIsEditingArea(true)}>
                            <AddIcon className="ic-section" /> Add Filter
                          </button>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
                <div className="kbn-board">
                    <div className="todo-kbn">
                      <span className="state-kbn">TO-DO</span>
                      <div className="list-kbn">
                        <ul>
                        {(Array.isArray(filteredTasks) ? filteredTasks : [])
                          .filter(task => task.state === "Not done")
                          .map((task, index) => (
                        <li key={index} className="tasks-kbn">
                          <span className="more-kbn"><MoreVertIcon className="ic-more"/></span>
                          <span onClick={() => openModalTask(task)} className="span-name-kbn">
                            {task.name}
                          </span>
                          <span className="task-type-kbn" style={{ marginLeft: "0.7vw", backgroundColor: getColor(task.type), padding: "0.1vh 6px", borderRadius: "4px"}}>
                            {task.type}
                          </span>
                          <div className="infos-kbn">
                            <span className="task-state-icon-kbn not-done">
                              <FiberManualRecordIcon className="ic-state" fontSize="small"/>
                            </span>
                            <span className="task-id-kbn">{task.id}</span>
                          </div>
                        </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="doing-kbn">
                      <span className="state-kbn">IN PROGRESS</span>
                      <div className="list-kbn">
                      <ul>
                        {(Array.isArray(filteredTasks) ? filteredTasks : [])
                          .filter(task => task.state === "Doing")
                          .map((task, index) => (
                        <li key={index} className="tasks-kbn">
                          <span className="more-kbn"><MoreVertIcon className="ic-more"/></span>
                          <span onClick={() => openModalTask(task)} className="span-name-kbn">{task.name}</span>
                          <span className="task-type-kbn" style={{ marginLeft: "0.7vw", backgroundColor: getColor(task.type), padding: "0.1vh 6px", borderRadius: "4px"}}>
                            {task.type}
                          </span>
                          <div className= "infos-kbn">
                            <span className="task-state-icon-kbn doing">
                              <CropSquareOutlinedIcon className="ic-state" fontSize="small"/>
                            </span>
                            <span className="task-id-kbn">{task.id}</span> 
                          </div>
                        </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="done-kbn">
                     <span className="state-kbn">DONE</span>
                     <div className="list-kbn">
                     <ul>
                        {(Array.isArray(filteredTasks) ? filteredTasks : [])
                          .filter(task => task.state === "Done")
                          .map((task, index) => (
                        <li key={index} className="tasks-kbn">
                          <span className="more-kbn"><MoreVertIcon className="ic-more"/></span>
                          <span onClick={() => openModalTask(task)} className="span-name-kbn">{task.name}</span>
                          <span className="task-type-kbn" style={{ marginLeft: "0.7vw", backgroundColor: getColor(task.type), padding: "0.1vh 6px", borderRadius: "4px"}}>
                            {task.type}
                          </span>
                          <div className="infos-kbn">
                            <span className="task-state-icon-kbn done">
                              <CheckIcon className="ic-state" fontSize="small"/>
                            </span>
                            <span className="task-id-kbn">{task.id}</span> 
                          </div>
                        </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
            </div>
            <div className={ScrView ? "scrum-view" : "scrum-view-hidden"}>
            <div className={menuUser ? "menu-user" : "off"}>
                <div className="user">
                  <span><AccountCircleIcon className="icon-user"/></span>
                  <span className="user-name">{user?.username}</span>
                </div>
                <div className="btn-menu">
                <button className="darkmode" onClick={Theme}>
                  {theme === "dark" ? (
                    <>
                      <LightModeOutlinedIcon  className="ic-theme" /> Light Mode
                    </>
                  ) : (
                    <>
                      <DarkModeOutlinedIcon className="ic-theme" /> Dark Mode
                    </>
                  )}
                </button>
                  <button onClick={SignOut} className={menuUser ? "signout" : "off"}>Sign Out <PowerSettingsNewIcon className="ic-user"/></button>
                </div>
               </div>
                <div className="info-day">
                  <h3>{selectedDate instanceof Date && !isNaN(selectedDate) ? getFormattedDate(selectedDate) : placeholder}<button onClick={goToToday} className="direct-today">Today<KeyboardDoubleArrowRightIcon className="ic-direct"/></button></h3>
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
                            onClick={() => selectFilter(area.id)}
                            className={selectedFilter === area.id ? "selected" : ""}
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
                          <button onClick={() => setIsEditingArea(true)}>
                            <AddIcon className="ic-section" /> Add Filter
                          </button>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="scrum-board">
                <div className="list-scrum">
            
                </div>
              </div>
            </div>

            <div className={ScheduleView ? "schedule-view" : "schedule-view-hidden"}>
            <div className={menuUser ? "menu-user" : "off"}>
                <div className="user">
                  <span><AccountCircleIcon className="icon-user"/></span>
                  <span className="user-name">{user?.username}</span>
                </div>
                <div className="btn-menu">
                <button className="darkmode" onClick={Theme}>
                  {theme === "dark" ? (
                    <>
                      <LightModeOutlinedIcon  className="ic-theme" /> Light Mode
                    </>
                  ) : (
                    <>
                      <DarkModeOutlinedIcon className="ic-theme" /> Dark Mode
                    </>
                  )}
                </button>
                  <button onClick={SignOut} className={menuUser ? "signout" : "off"}>Sign Out <PowerSettingsNewIcon className="ic-user"/></button>
                </div>
               </div>
                <div className="info-day">
                  <h3>{selectedDate instanceof Date && !isNaN(selectedDate) ? getFormattedDate(selectedDate) : placeholder}<button onClick={goToToday} className="direct-today">Today<KeyboardDoubleArrowRightIcon className="ic-direct"/></button></h3>
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
               </div>
            </div>

              <div className={CalendarView ? "calendar-view" : "calendar-view-hidden"}>
                <div className="calendar-container">
                  <div className="calendar-header">
                    <button onClick={() => changeMonth(-1)}>Previous</button>
                    <h2>{format(currentDate, 'MMMM yyyy')}</h2>
                    <button onClick={() => changeMonth(1)}>Next</button>
                  </div>
                  
                  <div className="calendar-weekdays">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="weekday">{day}</div>
                    ))}
                  </div>
                  
                  <div className="calendar-days">
                    {getDaysInMonth().map((day, index) => {
                      // Filtra os eventos SOMENTE desse dia
                    const dayEvents = filteredEvents.filter(event =>
                      isSameDay(new Date(event.start_time), new Date(day.date))
                    );

                      return (
                        <div 
                          key={index} 
                          className={`calendar-day ${day.isCurrentMonth ? '' : 'other-month'} ${
                            isSameDay(day.date, new Date()) ? 'today' : ''
                          }`}
                          onClick={() => {
                            setSelectedDate(day.date);  
                            openModalEvent(day.date);   // passe a data DIRETO
                          }}
                        >
                          <div className="day-options">
                            <div className="day-number">{format(day.date, 'd')}</div>
                            <button><MoreVertIcon className="ic-event"/></button>
                          </div>

                          {dayEvents.map(event => (
                            <div key={event.id} className="day-events">
                              <div
                                className="color-bar"
                                style={{ backgroundColor: event.color || 'gray' }}
                              ></div>
                              <span className="title-event">{event.title}</span>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>

                </div>
            </div>

            <div className={BinderView ? "binder-view" : "binder-view-hidden"}>
                <div className="intro-view">
                    <h1 className="hosp-phrase">Good Night, Julio</h1>
                      <div className="input-box">
                        <input
                          className="input-intro"
                          placeholder="How can I help you today?"
                        />
                      </div>
                        <nav className="nav-student-options">
                          <ul>
                            <button><span className="btn-student-options"><LibraryBooksOutlinedIcon className="ic-student"/> Subjects</span></button>
                            <button><span className="btn-student-options"><SsidChartOutlinedIcon className="ic-student"/> Graphs</span></button>
                            <button><span className="btn-student-options"><NotificationsActiveOutlinedIcon className="ic-student"/> Reminders</span></button>
                            <button><span className="btn-student-options"><ScoreOutlinedIcon className="ic-student"/> Score</span></button>
                          </ul>
                        </nav>
                </div>
            </div>

          {showModalEvent && ( 
          <div id="modal-event">
              <div className="overlay-event">
                  <div className="select-event">
                       <h2>Create Event</h2>
                        <label className="label-event">Title</label>
                        <input
                          className="input-event"
                          value={titleevent}
                          onChange={(e) => settitleevent(e.target.value)}
                        />

                        <span className="time-event">Every day
                         <Switch
                            {...label}
                            checked={everyday}
                            onChange={(e) => seteveryday(e.target.checked)}
                          />
                        </span>

                        <span className="time-event">
                          {selectedDate ? format(selectedDate, 'EEE, dd MMMM') : 'No date selected'}
                        </span>
                        <span>
                          <input
                            type="time"
                            className="hour-event"
                            value={starttime}
                            onChange={(e) => setstarttime(e.target.value)}
                          />
                          to
                          <input
                            type="time"
                            className="hour-event"
                            value={endtime}
                            onChange={(e) => setendtime(e.target.value)}
                          />
                        </span>
                        <span className="time-event">On repeat
                          <Switch {...label} defaultChecked />
                        </span>

                        <div className="btn-bottom">
                          <button onClick={addevent}>Save</button>
                          <button onClick={closeModalEvent}>Cancel</button>
                        </div>


                  </div>

                   <div className="top-modal">
                      <input
                        className="input-color-event"
                        type="color"
                        value={colorevent}
                        onChange={(e) => setcolorevent(e.target.value)}
                      />
                  </div>

              </div>
            </div> 
          )}
            

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
                            <label className="labsu"> </label>
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
                          {selectedTask ? (
                            <button
                              onClick={edittask}
                              disabled={!selectedOption}
                              className={showModal ? "create" : "create-off"}>
                              Update
                            </button>
                          ) : (
                            <button 
                              onClick={addtask}
                              disabled={!selectedOption}
                              className={showModal ? "create" : "create-off"}>
                              Create
                            </button>
                          )}
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