"use client"

import { FC } from 'react';
import 'chart.js/auto';
import { Radar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js/auto';
import styles from './StatsChart.module.scss';

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
  const data:ChartData<'radar'> = {
    labels: [
      "HP",
      "   Attack   ",
      "  Defense   ",
      "Speed",
      " Sp. Attack ",
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

  const options:ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: false,
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
        suggestedMax: 150,
        ticks: {
          display: false,
        }
      },
    }
  };

  return (
    <section className={styles.container}>
      <Radar data={data} options={options}/>
    </section>
  );
};

export default LineChart;