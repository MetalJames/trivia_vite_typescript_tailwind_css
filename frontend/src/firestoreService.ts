import { collection, addDoc, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// Define the Score interface
interface Score {
    name: string;
    score: number;
}

// Function to add a new score to Firestore
const addScore = async (name: string, score: number) => {
    try {
        const docRef = await addDoc(collection(db, "scores"), { name, score });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

// Function to fetch the top 10 scores from Firestore
const getTopScores = async (): Promise<Score[]> => {
    const q = query(collection(db, "scores"), orderBy("score", "desc"), limit(10));
    const querySnapshot = await getDocs(q);
    const scores: Score[] = [];
    querySnapshot.forEach((doc) => {
        scores.push(doc.data() as Score);
    });
    return scores;
};

export { addScore, getTopScores };
