import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "gday-870d2.firebaseapp.com",
    databaseURL: "https://gday-870d2.firebaseio.com",
    projectId: "gday-870d2",
    storageBucket: "gday-870d2.appspot.com",
    messagingSenderId: "1005574087159",
    appId: "1:1005574087159:web:be25b136c8cf20ac3d4ef2",
    measurementId: "G-SY6HV33HXF"

};

firebase.initializeApp(firebaseConfig);
export default firebase;

export const fbAut = async (username: string, password: string) => {
    try {
        const res = await firebase.auth().signInWithEmailAndPassword(username, password);

        console.log(res);
        return res;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const registerUser = async (username: string, password: string) => {
    try {
        const res = await firebase.auth().createUserWithEmailAndPassword(username, password);
        saveUser(res);
        console.log(res);
        return true;
    } catch (e) { // toast can go here
        console.log(e);
        alert(e.message);
        return false;
    }
};

const saveUser = (res: any) => {
    console.log('in saveuser:' + JSON.stringify(res.user) + ' with email' + res.user.email);
    const db = firebase.firestore();

    const userRef = db.collection("users").add({
        email: res.user.email
    });
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(res => {
            if (res) {
                resolve(res);
            } else {
                resolve(null)
            }
            unsubscribe();
        });
    });
};

export const logoutUser = async () => {
    try {
        firebase.auth().signOut();
    } catch (e) {
        console.log(e);
    }
};

// daylogs
export const getDayLogsForUser = () => {
    const db = firebase.firestore();
    return db.collection("dayLog")
        .doc("dolplads@gmail.com")
        .collection("dayLogs").get();
};

export const streamDayLogsForUser = (username: string, observer: any) => {
    const db = firebase.firestore();
    return db.collection("dayLog")
        .doc(username)
        .collection("dayLogs")
        .orderBy('dateLogged')
        .onSnapshot(observer);
};
