import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useTaskRefresh } from "../../contexts/RefreshContext";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip
} from "chart.js";
import GetTasksStatus from "../../services/service-gettaskstatus";

ChartJS.register(ArcElement, Tooltip);

function TasksByStatusChart({ selectedDate }) {
  const [data, setData] = useState(null);
  const { refreshCount } = useTaskRefresh();


  const getFormattedDateBackend = (date) => {
        // Ajusta a data para o fuso horário do Brasil
        const localDate = new Date(date.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
      
        const year = localDate.getFullYear();
        const month = String(localDate.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda
        const day = String(localDate.getDate()).padStart(2, '0'); // Adiciona zero à esquerda
      
        return `${year}-${month}-${day}`; // Formato "YYYY-MM-DD"
      };
      

  useEffect(() => {
    if (!selectedDate) return;

    const formattedDate = getFormattedDateBackend(selectedDate);

    GetTasksStatus(formattedDate).then((d) => {
      setData({
        labels: ["Concluídas", "Em andamento", "Não iniciadas"],
        datasets: [
          {
            data: [d.done, d.in_progress, d.not_done],
            backgroundColor: ["#2ac082", "#2196F3", "#F44336"],
            borderWidth: 1,
            cutout: "40%", // controla o tamanho do "buraco" do donut
          },
        ],
      });
    });
  }, [selectedDate, refreshCount]);

  const options = {
    responsive: true,
    maintainAspectRatio: true, // permite controle total do tamanho via CSS
    
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "#000",
        titleFont: {
          size: 12,
        },
        bodyFont: {
          size: 12,
        },
        padding: 3,
      },

    },
  };

  if (!data) return <p></p>;

  return (
    <div style={{width: "80px", height: "80px"}}>
      <Doughnut data={data} options={options} />
    </div>  
  );
}

export default TasksByStatusChart;
