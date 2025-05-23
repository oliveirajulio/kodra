import { useEffect, useState } from "react"
import { useTaskRefresh } from "../../contexts/RefreshContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import GetProductivity from "../../services/service-productivity";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

function ProductivityLineChart({ selectedDate }) {
  const [chartData, setChartData] = useState(null);
  const { refreshCount } = useTaskRefresh();


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

    GetProductivity(formattedDate)
      .then((data) => {
        const labels = data.map(item => item.week);
        const percentages = data.map(item => item.percent);

        setChartData({
          labels,
          datasets: [
            {
              label: "Produtividade (%)",
              data: percentages,
              borderColor: "#cb84fde6",
              backgroundColor: "#cb84fde6",
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: "#cb84fde6",
            }
          ]
        });
      })
      .catch(err => console.error("Erro ao carregar gráfico:", err));
  }, [selectedDate, refreshCount]);

  if (!chartData) {
    return <p>Carregando gráfico...</p>;
  }

  return (
    <div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => `${context.parsed.y}%`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false }
            },
            y: {
              grid: { display: false },
              ticks: {
                callback: (value) => `${value}%`
              },
              suggestedMin: 0,
              suggestedMax: 100
            }
          }
        }}
      />
    </div>
  );
}

export default ProductivityLineChart;
