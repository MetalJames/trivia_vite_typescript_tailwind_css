import { collection, addDoc, query, orderBy, limit, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

// Define the Score interface
interface Score {
    name: string;
    score: number;
}

// Define the Firestore document type
interface FirestoreScoreDoc extends Score {
    id: string;
}

// Function to add a new score to Firestore and keep only the top 5 scores
const addScore5 = async (name: string, score: number) => {
    try {
        // Fetch current top 5 scores
        const q = query(collection(db, "scores5"), orderBy("score", "desc"), limit(5));
        const querySnapshot = await getDocs(q);
        const scores: Score[] = [];
        const scoreDocs: FirestoreScoreDoc[] = [];

        querySnapshot.forEach((doc) => {
            scores.push(doc.data() as Score);
            scoreDocs.push({ id: doc.id, ...doc.data() as Score});
        });

        // Determine if the new score should be added
        if (scores.length < 5 || score > scores[scores.length - 1].score) {
            // Add the new score
            const docRef = await addDoc(collection(db, "scores5"), { name, score });
            console.log("Document written with ID: ", docRef.id);

            // If there are more than 5 scores, remove the lowest score
            if (scores.length >= 5) {
                const lowestScoreDoc = scoreDocs[scoreDocs.length - 1];
                await deleteDoc(doc(db, "scores5", lowestScoreDoc.id));
                console.log("Document with ID: ", lowestScoreDoc.id, " was deleted");
            }
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

const addScore10 = async (name: string, score: number) => {
    try {
        const q = query(collection(db, "scores10"), orderBy("score", "desc"), limit(5));
        const querySnapshot = await getDocs(q);
        const scores: Score[] = [];
        const scoreDocs: FirestoreScoreDoc[] = [];

        querySnapshot.forEach((doc) => {
            scores.push(doc.data() as Score);
            scoreDocs.push({ id: doc.id, ...doc.data() as Score });
        });

        if (scores.length < 5 || score > scores[scores.length - 1].score) {
            const docRef = await addDoc(collection(db, "scores10"), { name, score });
            console.log("Document written with ID: ", docRef.id);

            if (scores.length >= 5) {
                const lowestScoreDoc = scoreDocs[scoreDocs.length - 1];
                await deleteDoc(doc(db, "scores10", lowestScoreDoc.id));
                console.log("Document with ID: ", lowestScoreDoc.id, " was deleted");
            }
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

const addScore15 = async (name: string, score: number) => {
    try {
        const q = query(collection(db, "scores15"), orderBy("score", "desc"), limit(5));
        const querySnapshot = await getDocs(q);
        const scores: Score[] = [];
        const scoreDocs: FirestoreScoreDoc[] = [];

        querySnapshot.forEach((doc) => {
            scores.push(doc.data() as Score);
            scoreDocs.push({ id: doc.id, ...doc.data() as Score });
        });

        if (scores.length < 5 || score > scores[scores.length - 1].score) {
            const docRef = await addDoc(collection(db, "scores15"), { name, score });
            console.log("Document written with ID: ", docRef.id);

            if (scores.length >= 5) {
                const lowestScoreDoc = scoreDocs[scoreDocs.length - 1];
                await deleteDoc(doc(db, "scores15", lowestScoreDoc.id));
                console.log("Document with ID: ", lowestScoreDoc.id, " was deleted");
            }
        }
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
