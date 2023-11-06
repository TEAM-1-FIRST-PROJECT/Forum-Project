import { get, set, ref, query, orderByChild, equalTo, update} from "firebase/database";
import { database } from "../config/firebase-config";

export const getUserByHandle = (userName) => {
    return get(ref(database, `users/${userName}`))
}

export const createUserHandle = (userName, uid, email, firstName, lastName, profilePhoto) => {
    return set(ref(database, `users/${userName}`), {
        uid,
        email,
        createdOnn: Date.now(),
        profilePhoto,
        lastName,
        firstName,       
    })
}

export const getUserData = (uid) => {

    return get(query(ref(database, 'users'), orderByChild('uid'), equalTo(uid)));
};

export const updateUserData = () => {

    return update(ref(), {  });
};

