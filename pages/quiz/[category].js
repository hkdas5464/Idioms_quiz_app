// pages/quiz/[category].js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

// Helper function to optionally shuffle questions/options (if needed)
function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export default function QuizPage() {
  const router = useRouter();
  const { category } = router.query;
  
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  // Fetch questions from your API based on the category
  useEffect(() => {
    if (category) {
      fetch(`/api/questions/${category}`)
        .then((res) => res.json())
        .then((data) => {
          // Optional: shuffle questions & options for randomness
          const shuffledQuestions = shuffleArray(data.questions).map((q) => ({
            ...q,
            options: shuffleArray(q.options),
          }));
          setQuestions(shuffledQuestions);
        })
        .catch((error) => console.error("Error fetching questions:", error));
    }
  }, [category]);

  const handleSubmitAnswer = () => {
    if (selectedOption === null) {
      alert("Please select an option before submitting.");
      return;
    }
    const currentQuestion = questions[current];
    const isCorrect = selectedOption === currentQuestion.answer;
    const questionScore = isCorrect ? 4 : -1;
    const updatedScore = score + questionScore;
    setScore(updatedScore);

    const newAnswer = {
      question: currentQuestion.question,
      selected: selectedOption,
      answer: currentQuestion.answer,
      correct: isCorrect,
      status: "attempted",
      questionScore,
    };
    const updatedUserAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedUserAnswers);
    setSelectedOption(null);

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      router.push({
        pathname: "/result",
        query: {
          score: updatedScore,
          total: questions.length,
          answers: JSON.stringify(updatedUserAnswers),
        },
      });
    }
  };

  const handleSkip = () => {
    const currentQuestion = questions[current];
    const newAnswer = {
      question: currentQuestion.question,
      selected: "Skipped",
      answer: currentQuestion.answer,
      correct: false,
      status: "skipped",
      questionScore: 0,
    };
    const updatedUserAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedUserAnswers);
    setSelectedOption(null);

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      router.push({
        pathname: "/result",
        query: {
          score: score,
          total: questions.length,
          answers: JSON.stringify(updatedUserAnswers),
        },
      });
    }
  };

  if (!category || questions.length === 0) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-2xl text-white">Loading quiz...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex items-center justify-center w-full min-h-screen p-8 dark:bg-gradient-to-br from-indigo-700 to-red-500">
        <div className="w-full max-w-3xl p-8 bg-white shadow-2xl dark:bg-gray-800 rounded-2xl">
          <h1 className="mb-6 text-4xl font-bold text-center text-gray-800 dark:text-gray-200">
            {category} Quiz
          </h1>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              Question {current + 1} of {questions.length}
            </h2>
            <p className="mt-4 text-xl text-gray-800 dark:text-gray-100">
              {questions[current].question}
            </p>
          </div>
          <div className="mt-6 space-y-4">
            {questions[current].options.map((option, index) => (
              <div
                key={index}
                className="flex items-center p-4 transition border border-gray-200 rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="w-5 h-5 text-blue-500 form-radio"
                />
                <label htmlFor={`option-${index}`} className="ml-4 text-lg text-gray-700 dark:text-gray-200">
                  {option}
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={handleSkip}
              className="px-6 py-3 font-semibold text-gray-800 transition bg-gray-300 rounded-lg shadow hover:bg-gray-400"
            >
              Skip Question
            </button>
            <button
              onClick={handleSubmitAnswer}
              className="px-6 py-3 font-semibold text-white transition bg-blue-600 rounded-lg shadow hover:bg-blue-700"
            >
              Submit Answer
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
