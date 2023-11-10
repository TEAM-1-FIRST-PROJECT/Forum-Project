import { ref, push, update } from 'firebase/database';
import { database } from '../config/firebase-config';


export const addTags = (tag, postId) => {

  return push(
    ref(database, 'tags'),
    {
      [tag]: { postId },
      
    },
  )
}

export const updateTag = (tag, postId) => {
  const updateLikes = {};
  
  updateLikes[`/tags/${tag}/${postId}`] = true;

  return update(ref(database), updateLikes);
};