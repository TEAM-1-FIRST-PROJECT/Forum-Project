import { get, set, ref, query, orderByChild, equalTo } from "firebase/database";
import { db } from "../config/firebase-config";

export const getUserByHandle = (userName) => {
    return get(ref(db, `users/${userName}`))
}

export const createUserHandle = (userName, uid, email) => {
    return set(ref(db, `users/${userName}`), {
        uid,
        email,
        createdOn: Date.now()
    })
}

// export const getUserData = (uid) => {
//     return get(ref(database, 'users'), orderByChild('uid'), equalTo(uid));
export const getUserData = (uid) => {

    return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};