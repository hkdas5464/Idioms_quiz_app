// pages/result.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { 
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, 
  Pagination, Button, 
  Chip
} from "@heroui/react";
import Layout from '../components/Layout';

// Import Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Result() {
  const router = useRouter();
  const { score, total, answers } = router.query;
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    if (answers) {
      try {
        const parsed = JSON.parse(answers);
        setUserAnswers(parsed);
      } catch (error) {
        console.error("Error parsing answers", error);
      }
    }
  }, [answers]);

  // Ensure total is a number
  const totalQuestions = Number(total) || 0;
  const correctCount = userAnswers.filter(ans => ans.status === 'attempted' && ans.correct).length;
  const incorrectCount = userAnswers.filter(ans => ans.status === 'attempted' && !ans.correct).length;
  const attemptedCount = correctCount + incorrectCount;
  const skippedCount = userAnswers.filter(ans => ans.status === 'skipped').length;

  // Calculate percentages based on total questions
  const correctPercentage = totalQuestions ? (correctCount / totalQuestions * 100).toFixed(1) : 0;
  const incorrectPercentage = totalQuestions ? (incorrectCount / totalQuestions * 100).toFixed(1) : 0;
  const skippedPercentage = totalQuestions ? (skippedCount / totalQuestions * 100).toFixed(1) : 0;
  const totalmarks = (correctCount*4)+(incorrectCount*-1)+(skippedCount*0)

  // Calculate accuracy (for attempted questions only)
  const accuracy = attemptedCount ? (correctCount / attemptedCount * 100).toFixed(1) : 0;

  // Calculate percentage marks scored relative to maximum marks (4 per question)
  const percentageMarks = totalQuestions ? ((score / (totalQuestions * 4)) * 100).toFixed(1) : 0;

  // Prepare data for the chart (using percentages for Correct, Incorrect, Skipped)
  const data = {
    labels: ["Correct", "Incorrect", "Skipped"],
    datasets: [
      {
        label: "Percentage of Total Questions (%)",
        data: [correctPercentage, incorrectPercentage, skippedPercentage],
        backgroundColor: [
          "rgb(23 201 100)",   // Green for correct
          "rgb(243 18 96)",    // Red for incorrect
          "rgb(245 165 36)"   // Gray for skipped
        ],
        borderColor: [
          "rgba(16, 185, 129, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(107, 114, 128, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Quiz Results Breakdown (%)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      }
    }
  };

  const statusColorMap = {
    4: "success",
    0: "warning",
    Skipped: "warning",
  };


  

  return (
    <Layout>
      <div className="flex flex-col items-center min-h-screen p-4 pt-20 bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-3xl p-8 bg-white rounded shadow dark:bg-gray-800">
          <h1 className="mb-4 text-4xl font-bold">Progress Report</h1>
          <span className="mb-4 text-xl">
            Your Total Score: {score} <br />
            <span className='text-green-400'> Attempted:{attemptedCount}</span> || <span className='text-red-500 '>Incorrect:{incorrectCount} </span> || <span className='text-yellow-600 '>Skipped: {skippedCount}  </span> <br />
            <span>Total Marks: {totalmarks} </span>
            Accuracy: {accuracy}% <br />
            Percentage Marks Scored: {percentageMarks}%
          </span>
          <div className="mb-8">
            <Bar data={data} options={options} />
          </div>
          <div className="overflow-x-auto"> 
          <div className="w-full">
      <Table aria-label="Quiz Results Table" isStriped>
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>Question</TableColumn>
          <TableColumn>Your Answer</TableColumn>
          <TableColumn>Correct Answer</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Marks</TableColumn>
        </TableHeader>
        <TableBody>
          {userAnswers.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.question}</TableCell>
              <TableCell><Chip className="gap-4 capitalize" color={statusColorMap[item.questionScore] || 'danger'} size="sm" variant="flat">
              <span className='p-2'>{item.selected}</span> </Chip></TableCell>
              <TableCell>{item.answer}</TableCell>
              <TableCell><Chip className="capitalize" color={statusColorMap[item.questionScore] || 'danger'} size="sm" variant="flat"><span className='p-2'>{item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : ""}</span></Chip></TableCell>
              <TableCell>{item.questionScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 font-semibold text-white transition bg-blue-500 rounded hover:bg-blue-600"
            >
              Restart Quiz
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
