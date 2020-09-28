import React, {useState} from 'react';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonLoading,
    IonPage,
    IonTitle,
    IonToast,
    IonToolbar
} from '@ionic/react';
import './Tab3.css';
import {Link, useHistory} from "react-router-dom";
import {fbAut} from "../firebaseConfig";
import {setUserState} from "../redux/actions";
import {useDispatch} from "react-redux";

const Login: React.FC = () => {
    const [busy, setBusy] = useState<boolean>(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [successToast, setSuccessToast] = useState(false);
    const [errorToast, setErrorToast] = useState(false);

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const loginSuccessMsg = "Login success";
    const loginFailedMsg = "Login error";

    const loginUser = async () => {
        setBusy(true);
        const res: any = await fbAut(username, password);
        setBusy(false);

        console.log(username, password, res);
        if (res) {
            dispatch(setUserState(res.user.email));
            history.replace('/tab2');
            setErrorToast(false);
            setSuccessToast(true);
        } else {
            setSuccessToast(false);
            setErrorToast(true);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            {busy && <IonLoading message="loading..." duration={0} isOpen={busy}/>}
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 3</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonInput placeholder="Username?" onIonChange={(e: any) => setUsername(e.target.value)}/>
                <IonInput type="password" placeholder="Password?"
                          onIonChange={(e: any) => setPassword(e.target.value)}/>
                <IonButton onClick={loginUser}>Login</IonButton>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
                <IonToast
                    isOpen={successToast}
                    onDidDismiss={() => setSuccessToast(false)}
                    message={loginSuccessMsg}
                    duration={2000}
                />
                <IonToast
                    isOpen={errorToast}
                    onDidDismiss={() => setErrorToast(false)}
                    message={loginFailedMsg}
                    duration={2000}
                />
            </IonContent>
        </IonPage>
    );
};

export default Login;
