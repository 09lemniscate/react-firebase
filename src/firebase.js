import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore';
import "firebase/database";
import "firebase/analytics";


const config = {
	apiKey: "AIzaSyBKU2UNEn0sdk57ae0Cmdl76g_2O_u0vog",
    authDomain: "react-firebase-bb2e2.firebaseapp.com",
    databaseURL: "https://react-firebase-bb2e2.firebaseio.com",
    projectId: "react-firebase-bb2e2",
    storageBucket: "react-firebase-bb2e2.appspot.com",
    messagingSenderId: "467732044969",
    appId: "1:467732044969:web:5f9ba445624edec2a21db8",
    measurementId: "G-1V24330FF1"
}

class Firebase {
	constructor() {
        app.initializeApp(config);
        this.userAuthenticated = false;
		this.auth = app.auth()
        this.db = app.firestore()
        this.databse = app.database()
        this.analytics = app.analytics()
        this.googleProvider = new app.auth.GoogleAuthProvider()
	}
	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	register(name, email, password) {
        return this.auth.createUserWithEmailAndPassword(email, password)
    }
    saveUserToDatabase(){
       return this.databse.ref('users')
    }

    getDB(){
        return this.db;
    }

    doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

	isInitialized() {
		return new Promise(resolve => {
            // this.auth.onAuthStateChanged(resolve)
            this.auth.onAuthStateChanged(resolve);
		})
    }
    analyticsEvents(events,options =null){
        this.analytics.logEvent(events,options);
    }
    isAuthenticatedUser(auth){
        this.userAuthenticated = auth;
    }

}

export default new Firebase()