import React, {useEffect, useState} from 'react';
import {
    IonCheckbox,
    IonContent,
    IonHeader, IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage, IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import {getDayLogsForUser, streamDayLogsForUser} from '../firebaseConfig';

const Tab3: React.FC = () => {
    const [gender, setGender] = useState<string>();
    const [workedOut, setWorkedOut] = useState<boolean>();
    const [eatenHealthy, setEatenHealthy] = useState<boolean>();
    const [_dayLogs, setDayLogs] = useState([]);

    const checkboxList = [
        {val: 'Worked out', isChecked: true},
        {val: 'Eaten Healthy', isChecked: false}
    ];

    useEffect(() => {
        const unsubscribe = streamDayLogsForUser("dolplads@gmail.com", {
            next: (querySnapshot: any) => {
                const updatedGroceryItems =
                    querySnapshot.docs.map((docSnapshot: any) => docSnapshot.data());
                setDayLogs(updatedGroceryItems);
            },
            error: () => console.log('errrrr')
        });
        return unsubscribe;
    }, [setDayLogs]);
    const dayLogs = _dayLogs
        .map((dayLog: any, i: number) => <div key={i}>{JSON.stringify(dayLog)}</div>);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tab 3</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div>{dayLogs}</div>
                <IonList>
                    <IonListHeader>
                        <IonLabel>your day</IonLabel>
                    </IonListHeader>


                    {checkboxList.map(({val, isChecked}, i) => (
                        <IonItem key={i}>
                            <IonLabel>{val}</IonLabel>
                            <IonCheckbox color='secondary' slot="start" value={val} checked={isChecked}/>
                        </IonItem>
                    ))}
                    <IonItem>
                        <IonLabel>Gender</IonLabel>
                        <IonSelect value={gender} placeholder="Select One" onIonChange={e => setGender(e.detail.value)}>
                            <IonSelectOption value="female">Female</IonSelectOption>
                            <IonSelectOption value="male">Male</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Tab3;
