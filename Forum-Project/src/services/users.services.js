import { get, set, ref, query, orderByChild, equalTo, update } from "firebase/database";
import { database } from "../config/firebase-config";

export const getUserByHandle = (username) => {
    return get(ref(database, `users/${username}`))
}

export const createUserHandle = (username, uid, email, firstName, lastName, profilePhoto) => {
    return set(ref(database, `users/${username}`), {
        username,
        uid,
        email,
        firstName,
        lastName,
        profilePhoto,
        isAdmin: false,
        reatedOn: new Date(),
        likedPosts: {},
        isBlocked: false,
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


export const searchUser = (searchTerm) => {
    return get(ref(database, "users")).then((snapshot) => {
      if (!snapshot.exists()) {
        throw new Error(`User with searchTerm ${searchTerm} does not exist!`);
      }
      const users = snapshot.val();
      const filteredUsers = Object.keys(users)
        .filter(
          (key) =>
            (users[key]?.username && users[key].username.includes(searchTerm)) ||
            (users[key]?.email && users[key].email.includes(searchTerm)) ||
            (users[key]?.firstName && users[key].firstName.includes(searchTerm))
        )
        .map((key) => users[key]);
      return filteredUsers;
    });
  };