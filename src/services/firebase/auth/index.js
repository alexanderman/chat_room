/**
 * Created by alex on 15/05/17.
 */
import firebase from 'firebase';

export default function Authenticate(onAuthenticated) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('[firebase] onAuthStateChanged, USER', user);
            onAuthenticated();
        } else {
            console.log('[firebase] onAuthStateChanged, NO USER');
            firebase.auth().signInAnonymously().catch(function(error) {
                console.log('[firebase] signInAnonymously ERROR:', error);
            });
        }
    });
}





