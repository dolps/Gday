import React, {useEffect, useState} from 'react';
import {IonButton, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import {star} from "ionicons/icons";
import {useSelector} from "react-redux";
import {logoutUser} from '../firebaseConfig';
import {useHistory} from "react-router";

const Tab2: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const history = useHistory();

    useEffect(() => {
        console.log('input changed: ', input);
    }, [input]);

    const username = useSelector((state: any) => state.user.username);

    const logout = async() => {
        await logoutUser().then(() => {
            history.replace('/login')
        })
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Tab 2</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <p>Hello {username}</p>
                <IonInput value={input} onIonChange={(event: any) => setInput(event.target.value)}>

                </IonInput>
                <IonButton className="ion-padding" expand="full" color="primary">
                    <IonIcon slot="start" icon={star}/>
                    HelloWorld!
                </IonButton>
                <IonButton routerLink="/login">Login</IonButton>
                <IonButton routerLink="/register" color="secondary">Register</IonButton>
                <IonButton onClick={logout} color="secondary">LogOut</IonButton>
                <ExploreContainer name="Tab 2 page"/>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;
