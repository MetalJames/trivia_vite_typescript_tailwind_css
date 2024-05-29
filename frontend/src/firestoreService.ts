import { collection, addDoc, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// Define the Score interface
interface Score {
    name: string;
    score: number;
}

// Function to add a new score to Firestore
const addScore5 = async (name: string, score: number) => {
    try {
        const docRef = await addDoc(collection(db, "scores5"), { name, score });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

const addScore10 = async (name: string, score: number) => {
    try {
        const docRef = await addDoc(collection(db, "scores10"), { name, score });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

const addScore15 = async (name: string, score: number) => {
    try {
        const docRef = await addDoc(collection(db, "scores15"), { name, score });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

// Function to fetch the top 10 scores from Firestore
const getTopScores5 = async (): Promise<Score[]> => {
    const q = query(collection(db, "scores5"), orderBy("score", "desc"), limit(10));
    const querySnapshot = await getDocs(q);
    const scores: Score[] = [];
    querySnapshot.forEach((doc) => {
        scores.push(doc.data() as Score);
    });
    return scores;
};

const getTopScores10 = async (): Promise<Score[]> => {
    const q = query(collection(db, "scores10"), orderBy("score", "desc"), limit(10));
    const querySnapshot = await getDocs(q);
    const scores: Score[] = [];
    querySnapshot.forEach((doc) => {
        scores.push(doc.data() as Score);
    });
    return scores;
};

const getTopScores15 = async (): Promise<Score[]> => {
    const q = query(collection(db, "scores15"), orderBy("score", "desc"), limit(10));
    const querySnapshot = await getDocs(q);
    const scores: Score[] = [];
    querySnapshot.forEach((doc) => {
        scores.push(doc.data() as Score);
    });
    return scores;
};

export { addScore5, addScore10, addScore15, getTopScores5, getTopScores10, getTopScores15 };
