import { ref, update, get } from 'firebase/database';
import { database } from '../config/firebase-config';
import { toast } from 'react-toastify';

export const tagsUpdateHandler = (tag, postId) => {
  const updateLikes = {};

  updateLikes[`/tags/${tag}/${postId}`] = true;

  return update(ref(database), updateLikes);
};

export const tagExistChecker = (tag) => {
  return get(ref(database, "tags")).then((snapshot) => {
    if (!snapshot.exists()) {
      toast.error(`User with searchTerm ${tag} does not exist!`);
    }

    const tags = snapshot.val();

    return Object.keys(tags).includes(tag);
  });
};
