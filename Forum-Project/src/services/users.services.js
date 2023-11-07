import { get, set, ref, query, orderByChild, equalTo, update } from "firebase/database";
import { database } from "../config/firebase-config";

export const getUserByHandle = (userName) => {
    return get(ref(database, `users/${userName}`))
}

export const createUserHandle = (userName, uid, email, firstName, lastName, role, profilePhoto) => {
    return set(ref(database, `users/${userName}`), {
        uid,
        email,
        createdOnn: Date.now(),
        userName,
        profilePhoto,
        role,
        lastName,
        firstName,
    })
}

export const getUserData = (uid) => {

    return get(query(ref(database, 'users'), orderByChild('uid'), equalTo(uid)));
};


export const updateUserData = (username, firstName, lastName) => {
    const pathFirstName = `users/${username}/firstName`;
    const pathLastName = `users/${username}/lastName`;
    //const pathPhoto = `users/${username}/email`
    return update(ref(database), { [pathFirstName]: firstName, [pathLastName]: lastName });
};

// export const getUserByUid = (uid) => {
//     const usersRef = ref(database, 'users');
//     const userQuery = query(usersRef, orderByChild('uid'), equalTo(uid));
  
//     get(userQuery).then((snapshot) => {
//       if (snapshot.exists()) {
//         const user = snapshot.val();
//         console.log('User found:', user);
//       } else {
//         console.log('User not found');
//       }
//     }).catch((error) => {
//       console.error('Error getting user:', error);
//     });
//   };