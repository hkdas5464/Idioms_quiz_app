// pages/index.js
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Home() {
  const router = useRouter();
  const categories = [
    { id: 'Idioms', title: 'Quiz_1', description: "Explore world capitals, landscapes, and more." },
    { id: 'Idioms_Quiz2', title: 'Quiz_2', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz3', title: 'Quiz_3', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz4', title: 'Quiz_4', description: "Explore world capitals, landscapes, and more." },
    { id: 'Idioms_Quiz5', title: 'Quiz_5', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz6', title: 'Quiz_6', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz7', title: 'Quiz_7', description: "Explore world capitals, landscapes, and more." },
    { id: 'Idioms_Quiz8', title: 'Quiz_8', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz9', title: 'Quiz_9', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz10', title: 'Quiz_10', description: "Explore world capitals, landscapes, and more." },
    { id: 'Idioms_Quiz11', title: 'Quiz_11', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz12', title: 'Quiz_12', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz13', title: 'Quiz_13', description: "Explore world capitals, landscapes, and more." },
    { id: 'Idioms_Quiz14', title: 'Quiz_14', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz15', title: 'Quiz_15', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz16', title: 'Quiz_16', description: "Explore world capitals, landscapes, and more." },
    { id: 'Idioms_Quiz17', title: 'Quiz_17', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz18', title: 'Quiz_18', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz19', title: 'Quiz_19', description: "Explore world capitals, landscapes, and more." },
    { id: 'Idioms_Quiz20', title: 'Quiz_20', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz21', title: 'Quiz_21', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz22', title: 'Quiz_22', description: "Explore world capitals, landscapes, and more." },
    { id: 'Idioms_Quiz23', title: 'Quiz_23', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz24', title: 'Quiz_24', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz25', title: 'Quiz_25', description: "Explore world capitals, landscapes, and more." },
    { id: 'Idioms_Quiz26', title: 'Quiz_26', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz27', title: 'Quiz_27', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz28', title: 'Quiz_28', description: "Explore world capitals, landscapes, and more." },
    { id: 'Idioms_Quiz29', title: 'Quiz_29', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz30', title: 'Quiz_30', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz31', title: 'Quiz_31', description: "Explore world capitals, landscapes, and more." },
    { id: 'Idioms_Quiz32', title: 'Quiz_32', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz33', title: 'Quiz_33', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz34', title: 'Quiz_34', description: "Explore world capitals, landscapes, and more." },
    { id: 'Idioms_Quiz35', title: 'Quiz_35', description: "Test your knowledge on Idioms ." },
    { id: 'Idioms_Quiz36', title: 'Quiz_36', description: "Test your knowledge on Idioms ." },

  ];

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full min-h-screen p-8 dark:bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
        <h1 className="pt-20 mb-12 text-6xl font-extrabold text-center dark:text-white drop-shadow-lg">
          Welcome to Quiz Master
        </h1>
        <p className="max-w-2xl mb-16 text-2xl text-center dark:text-white drop-shadow-md">
          Challenge your mind with our diverse set of quizzes. Choose a category below and test your knowledge!
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => router.push(`/quiz/${cat.id}`)}
              className="p-6 transition duration-500 transform bg-white shadow-2xl cursor-pointer dark:bg-gray-800 rounded-2xl hover:scale-105 hover:shadow-3xl"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-100">
                {cat.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}