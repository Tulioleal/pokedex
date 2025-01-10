"use client"

import { Radar } from 'react-chartjs-2';
import 'chart.js/auto';
import { FC } from 'react';

interface Stats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

interface StatsChartProps extends Stats {
  label: string;
}

const LineChart:FC<StatsChartProps> = ({
  hp,
  attack,
  defense,
  specialAttack,
  specialDefense,
  speed,
  label
}) => {
  const data = {
    labels: [
      "HP",
      "Attack",
      "Defense",
      "Speed",
      "Sp. Attack",
      "Sp. Defense",
    ],
    datasets: [
      {
        label: "",
        data: [
          hp,
          attack,
          defense,
          speed,
          specialAttack,
          specialDefense,
        ],
        fill: true,
        backgroundColor: 'rgba(30, 144, 255, 0.2)',
        borderColor: 'rgb(30, 144, 255)',
        tension: 0,
      },
    ],
  };

  const options = {
    type: 'radar',
    responsive: true,
    maintainAspectRatio: true,
    data,
    plugins: {
      title: {
        display: true,
        text: label
      },
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 200,
        ticks: {
          display: false,
        }
      },
    }
  };

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <Radar data={data} options={options}/>
    </div>
  );
};

export default LineChart;