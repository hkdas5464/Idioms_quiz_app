// pages/api/questions/[category].js
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const {
    query: { category },
  } = req;

  try {
    const client = await clientPromise;
    const db = client.db("quizdb");
    const questions = await db
      .collection("questions")
      .find({ category })
      .toArray();
    res.status(200).json({ questions });
  } catch (error) {
    console.error("Failed to load questions", error);
    res.status(500).json({ error: "Failed to load questions" });
  }
}
