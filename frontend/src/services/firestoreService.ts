import { collection, addDoc, query, orderBy, limit, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

interface Score {
    name: string;
    score: number;
}

interface FirestoreScoreDoc extends Score {
    id: string;
}

const addScore5 = async (name: string, score: number) => {
    try {
        const q = query(collection(db, "scores5"), orderBy("score", "desc"), limit(5));
        const querySnapshot = await getDocs(q);
        const scores: Score[] = [];
        const scoreDocs: FirestoreScoreDoc[] = [];

        querySnapshot.forEach((doc) => {
            scores.push(doc.data() as Score);
            scoreDocs.push({ id: doc.id, ...doc.data() as Score});
        });

        if (scores.length < 5 || score > scores[scores.length - 1].score) {
            const docRef = await addDoc(collection(db, "scores5"), { name, score });
            console.log("Document written with ID: ", docRef.id);

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