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
      <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 shadow rounded p-8 w-full max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Progress Report</h1>
          <p className="text-xl mb-4">
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
                    <td className="px-4 py-2 border text-center">{index + 1}</td>
                    <td className="px-4 py-2 border">{item.question}</td>
                    <td className="px-4 py-2 border text-center">{item.selected}</td>
                    <td className="px-4 py-2 border text-center">{item.answer}</td>
                    <td className="px-4 py-2 border text-center">
                      {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : ""}
                    </td>
                    <td className="px-4 py-2 border text-center">{item.questionScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => router.push('/')}
              className="py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
            >
              Restart Quiz
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
