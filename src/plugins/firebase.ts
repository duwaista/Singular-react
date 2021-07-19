import Firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

export const firebase = Firebase.initializeApp({
	apiKey: "AIzaSyAiQ0S4GlH8zKHO8K8uKZn5rZq6eyL3COQ",
	authDomain: "singular-react-a7652.firebaseapp.com",
	projectId: "singular-react-a7652",
	storageBucket: "singular-react-a7652.appspot.com",
	messagingSenderId: "81601195893",
	appId: "1:81601195893:web:82ff601875df1073c56d3c",
});

export const storage = firebase.storage();
