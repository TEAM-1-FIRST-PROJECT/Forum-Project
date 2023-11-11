import { ref, update, get } from 'firebase/database';
import { database } from '../config/firebase-config';
import { toast } from 'react-toastify';

export const tagsUpdateHandler = (tag, postId) => {
  const updateTags = {};

  updateTags[`/tags/tag/${tag}/${postId}`] = true;

  return update(ref(database), updateTags);
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

export const removeTags = (tag, postId) =>{
  const updateLikes = {};
  updateLikes[`/tags/tag/${postId}/${tag}`] = null;

  return update(ref(database), updateLikes);
}