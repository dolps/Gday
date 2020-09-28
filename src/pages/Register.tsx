import React, {useState} from 'react';
import {IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './Tab3.css';
import {Link} from "react-router-dom";
import {registerUser} from '../firebaseConfig'

const Register: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')

    const register = async () => {
        console.log(username, password, cPassword);
        if (password !== cPassword) {
            alert("password must be equal");
        }

        const res = await registerUser(username, password)
        if(res){
            alert("you have registered successfully");
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 3</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonInput placeholder="Username?" onIonChange={(e: any) => setUsername(e.target.value)}/>
                <IonInput type="password" placeholder="Password?"
                          onIonChange={(e: any) => setPassword(e.target.value)}/>
                <IonInput type="password" placeholder="Confirm Password"
                          onIonChange={(e: any) => setCPassword(e.target.value)}/>
                <IonButton onClick={register}>Register</IonButton>

                <p>Allready have an account? <Link to="/login">Login</Link></p>
            </IonContent>
        </IonPage>
    );
};

export default Register;
