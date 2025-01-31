"use client"

import { FC } from 'react';
import 'chart.js/auto';
import { Radar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js/auto';
import styles from './StatsChart.module.scss';
import { TYPE_COLORS } from '@/lib/typeColors';
import { pokemonType } from '@/types';

interface Stats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  type: pokemonType;
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
  label,
  type
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
        data: [
          hp,
          attack,
          defense,
          speed,
          specialAttack,
          specialDefense,
        ],
        animation: {
          duration: 1250,
          easing: 'easeInOutCubic'
        },
        borderWidth: 3,
        fill: true,
        backgroundColor:  TYPE_COLORS[type] + "66",
        borderColor: TYPE_COLORS[type],
        radius: 2,
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
      <h2>Base stats</h2>
      <Radar data={data} options={options}/>
    </section>
  );
};

export default LineChart;