// pages/result.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
          "rgba(16, 185, 129, 0.7)",   // Green for correct
          "rgba(239, 68, 68, 0.7)",    // Red for incorrect
          "rgba(107, 114, 128, 0.7)"   // Gray for skipped
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

  return (
    <Layout>
      <div className="flex flex-col items-center min-h-screen p-4 pt-20 bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-3xl p-8 bg-white rounded shadow dark:bg-gray-800">
          <h1 className="mb-4 text-4xl font-bold">Progress Report</h1>
          <p className="mb-4 text-xl">
            Your Total Score: {score} <br />
            Attempted: {attemptedCount} | Skipped: {skippedCount} <br />
            Accuracy: {accuracy}% <br />
            Percentage Marks Scored: {percentageMarks}%
          </p>
          <div className="mb-8">
            <Bar data={data} options={options} />
          </div>
          <div className="overflow-x-auto"> 
            <table className="min-w-full border border-gray-300 dark:border-gray-700">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Question</th>
                  <th className="px-4 py-2 border">Your Answer</th>
                  <th className="px-4 py-2 border">Correct Answer</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Marks</th>
                </tr>
              </thead>
              <tbody>
                {userAnswers.map((item, index) => (
                  <tr
                    key={index}
                    className={item.correct ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"}
                  >
                    <td className="px-4 py-2 text-center border">{index + 1}</td>
                    <td className="px-4 py-2 border">{item.question}</td>
                    <td className="px-4 py-2 text-center border">{item.selected}</td>
                    <td className="px-4 py-2 text-center border">{item.answer}</td>
                    <td className="px-4 py-2 text-center border">
                      {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : ""}
                    </td>
                    <td className="px-4 py-2 text-center border">{item.questionScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
