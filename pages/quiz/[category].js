// pages/quiz/[category].js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

// Helper function to shuffle an array
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

  // Fetch questions from your MongoDB via your API, then shuffle both questions and options.
  useEffect(() => {
    if (category) {
      fetch(`/api/questions/${category}`)
        .then((res) => res.json())
        .then((data) => {
          // Shuffle questions and also shuffle each question's options.
          const shuffledQuestions = shuffleArray(data.questions).map((q) => ({
            ...q,
            options: shuffleArray([...q.options]),
          }));
          setQuestions(shuffledQuestions);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
        });
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
      answer: currentQuestion.answer, // Correct answer
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
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl">Loading quiz...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-4xl font-bold mb-8 capitalize">{category} Quiz</h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-lg transition transform duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="mb-6">
            <h2 className="text-xl font-medium">
              Question {current + 1} of {questions.length}
            </h2>
            <p className="mt-2 text-lg">{questions[current].question}</p>
          </div>
          <form>
            {questions[current].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="form-radio text-blue-500 h-5 w-5"
                />
                <label htmlFor={`option-${index}`} className="text-lg">
                  {option}
                </label>
              </div>
            ))}
          </form>
          <div className="flex justify-between mt-4">
            <button
              onClick={handleSkip}
              className="py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded hover:bg-gray-400 transition"
            >
              Skip Question
            </button>
            <button
              onClick={handleSubmitAnswer}
              className="py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
            >
              Submit Answer
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
