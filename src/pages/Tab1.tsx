import React, {useEffect, useState} from 'react';
import {
    IonAvatar,
    IonContent,
    IonHeader,
    IonItem, IonItemOption, IonItemOptions, IonItemSliding,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Tab1.css';
import {streamDayLogsForUser} from "../firebaseConfig";

type LogEntry = {
    status: string,
    logdate: string,
    avatar: string
}

const log = [{
    status: 'good',
    logdate: '20-09-2020',
    avatar: 'finn'
}, {
    status: 'bad',
    logdate: '20-09-2020',
    avatar: 'han'
}, {
    status: 'ok',
    logdate: '21-09-2020',
    avatar: 'rey'
}];

const Tab1: React.FC = () => {
    const [_dayLogs, setDayLogs] = useState([]);

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

    const convertISOStringToMonthDay = (date: any) => {
        const tempDate = new Date(date).toString().split(' ');
        const formattedDate = `${tempDate[1]} ${+tempDate[2]}`;
        return formattedDate;
    };

    type DayLog ={
        workedOut: boolean,
        eatenHealthy: boolean,
        test: string
    }
    const dayLogs = _dayLogs.map((dayLog: DayLog, i: number) => (
        <IonItemSliding key={i}>
            <IonItem>
                <IonAvatar>
                    <img src={`https://ionicframework.com/docs/demos/api/list/avatar-han.png`} alt=""/>
                </IonAvatar>
                <IonLabel className="ion-padding">
                    <h2>This day was: {JSON.stringify(dayLog)} {dayLog['workedOut']}</h2>
                    <h2>This day was: {String(dayLog.workedOut)}</h2>
                </IonLabel>
            </IonItem>
            <IonItemOptions side="end">
                <IonItemOption>edit</IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    ));

    const groceryItemElements = _dayLogs
        .map((groceryItem: DayLog, i) => <div key={i}>{groceryItem.test}</div>);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tab 1           {groceryItemElements}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 1</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                    {
                        dayLogs
                    }
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
