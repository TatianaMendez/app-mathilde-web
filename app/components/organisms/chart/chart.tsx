import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const MyDoughnutChart = () => {
  const data = {
    labels: ['Planeado', 'Ejecutado'],
    datasets: [
      {
        label: 'Presupuesto',
        data: [14.7, 11.6],
        backgroundColor: ['#EBE1FF', '#9873e8'],
        borderColor: ['#EBE1F9', '#9873e1'],
        borderWidth: 1,
        circumference: 180,
        rotation: -90,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'PRESUPUESTO',
      },
      legend: {
        position: 'right' as const,
      },
      tooltip: {
        enabled: true
      },
      doughnutLabel: {
        labels: [
          {
            text: 'Total',
            font: {
              size: '16',
              weight: 'bold'
            }
          },
          {
            text: `${data.datasets[0].data.reduce((a, b) => a + b, 0).toFixed(1)}`,
            font: {
              size: '20'
            }
          }
        ]
      }
    },
  };

  const textCenter = {
    id: 'textCenter',
    beforeDraw(chart: any) {
      const { ctx, chartArea: { top, width, height } } = chart;
      const text = 'Total';
      const total = data.datasets[0].data.reduce((a, b) => a + b, 0).toFixed(1);

      const centerY = top + height * 0.75;
      
      ctx.save();
      ctx.font = '16px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.fillText(text, width / 2, centerY - 15);
      
      ctx.font = 'bold 20px Arial';
      ctx.fillText(total, width / 2, centerY + 15);
      ctx.restore();
    }
  };

  return (
    <div className='w-full h-full min-h-[200px]'>
      <Doughnut data={data} options={options} plugins={[textCenter]} />
    </div>
  );
};

export default MyDoughnutChart;