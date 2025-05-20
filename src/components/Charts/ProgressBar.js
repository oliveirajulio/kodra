import { useEffect, useState } from "react";
import GetTasksProgress from "../../services/service-taskprogress";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

function TaskProgressChart({ selectedDate }) {
  const [progress, setProgress] = useState(null);

  const getFormattedDateBackend = (date) => {
    const localDate = new Date(date.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!selectedDate) return;

    const formattedDate = getFormattedDateBackend(selectedDate);

    GetTasksProgress(formattedDate)
      .then((data) => setProgress(data))
      .catch((err) => console.error("Erro ao buscar progresso das tarefas:", err));
  }, [selectedDate]);

  if (!progress || progress.total === 0) {
    return <p>Sem tarefas para o dia selecionado.</p>;
  }

  const done = progress.done;
  const remaining = progress.total - done;

  const donePercent = Math.round((done / progress.total) * 100);
  const remainingPercent = 100 - donePercent;

  const data = {
    labels: [''], // Remove o rótulo lateral
    datasets: [
      {
        label: `${donePercent}% concluídos`,
        data: [done],
        backgroundColor: "#cb84fde6",
        borderRadius: 12,
      },
      {
        label: `${remainingPercent}% restantes`,
        data: [remaining],
        backgroundColor: "#b54cff33",
        borderRadius: 50,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false, // Oculta a legenda
      },
      tooltip: {
        enabled: true, // Oculta tooltip externa
      },
      datalabels: {
        display: true,
        color: "#fff",
        font: {
          weight: "bold",
          size: 14,
        },
        formatter: (value, context) => {
          const total = progress.total;
          const percent = Math.round((value / total) * 100);
          return `${percent}%`;
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        display: false, // Oculta o eixo X
        max: progress.total,
      },
      y: {
        stacked: true,
        grid: {
          display: false, // Remove linha horizontal
        },
        ticks: {
          display: false, // Remove rótulo lateral
        },
      },
    },
  };

  return (
    <div style={{ marginTop: "1rem", maxWidth: "500px" }}>
      <Bar data={data} options={options} height={30} />
    </div>
  );
}

export default TaskProgressChart;
