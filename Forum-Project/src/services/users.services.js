import {
  get,
  set,
  ref,
  query,
  orderByChild,
  equalTo,
  update,
} from "firebase/database";
import { database } from "../config/firebase-config";
import { toast } from "react-toastify";

export const getUserByHandle = (username) => {
  return get(ref(database, `users/${username}`));
};

export const createUserHandle = (
  username,
  uid,
  email,
  firstName,
  lastName,
  profilePhoto
) => {
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
  });
};

export const getUserData = (uid) => {
  return get(query(ref(database, "users"), orderByChild("uid"), equalTo(uid)));
};

export const updateUserData = (username, firstName, lastName, email, imgURL) => {
  const pathFirstName = `users/${username}/firstName`;
  const pathLastName = `users/${username}/lastName`;
  const pathEmail = `users/${username}/email`;
  const pathPhoto = `users/${username}/profilePhoto`
  return update(ref(database), {
    [pathFirstName]: firstName,
    [pathLastName]: lastName,
    [pathEmail]: email,
    [pathPhoto]: imgURL,
  });
};

export const searchUser = (searchTerm) => {
  return get(ref(database, "users")).then((snapshot) => {
    if (!snapshot.exists()) {
      toast.error(`User with searchTerm ${searchTerm} does not exist!`);
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

export const getUsersLength = () => {
  return get(ref(database, "users")).then((snapshot) => {
    if (!snapshot.exists()) {
      toast.error(`Users do not exist!`);
    }
    const users = snapshot.val();
    const usersLength = Object.keys(users).length;
   return usersLength;
  });
};


