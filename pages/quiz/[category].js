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
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-xl">Loading quiz...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-600">
        <h1 className="mb-8 text-4xl font-bold capitalize">{category} Quiz</h1>
        <div className="w-full max-w-lg p-8 transition duration-300 transform bg-white shadow-lg dark:bg-gray-800 rounded-xl">
          <div className="mb-6">
            <h2 className="text-xl font-medium">
              Question {current + 1} of {questions.length}
            </h2>
            <p className="mt-2 text-lg">{questions[current].question}</p>
          </div>
          <form>
            {questions[current].options.map((option, index) => (
              <div key={index} className="flex items-center mb-2 space-x-2">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="w-5 h-5 text-blue-500 form-radio"
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
              className="px-4 py-2 font-semibold text-gray-800 transition bg-gray-300 rounded hover:bg-gray-400"
            >
              Skip Question
            </button>
            <button
              onClick={handleSubmitAnswer}
              className="px-4 py-2 font-semibold text-white transition bg-blue-500 rounded hover:bg-blue-600"
            >
              Submit Answer
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
