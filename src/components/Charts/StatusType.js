import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import GetTasksStatus from "../../services/service-gettaskstatus";

ChartJS.register(ArcElement, Tooltip, Legend);

function TasksByStatusChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    GetTasksStatus().then((d) => {
      setData({
        labels: ["Concluídas", "Em andamento", "Não iniciadas"],
        datasets: [
          {
            data: [d.done, d.in_progress, d.not_done],
            backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
          },
        ],
      });
    });
  }, []);

  if (!data) return <p>Carregando gráfico de status...</p>;

  return <Doughnut data={data} />;
}

export default TasksByStatusChart;