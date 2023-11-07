import { get, set, ref, query, orderByChild, equalTo, update } from "firebase/database";
import { database } from "../config/firebase-config";

export const getUserByHandle = (username) => {
    return get(ref(database, `users/${username}`))
}

export const createUserHandle = (username, uid, email, firstName, lastName, profilePhoto, isAdmin) => {
    return set(ref(database, `users/${username}`), {
        username,
        uid,
        email,
        firstName,
        lastName,
        profilePhoto,
        isAdmin,
        createdOnn: Date.now(),
    })
}

export const getUserData = (uid) => {

    return get(query(ref(database, 'users'), orderByChild('uid'), equalTo(uid)));
};

export const updateUserData = () => {

    return update(ref(), {});
};

