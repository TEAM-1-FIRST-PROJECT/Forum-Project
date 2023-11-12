import { ref, get, update } from 'firebase/database';
import { database } from '../config/firebase-config';


export const getLikesPerPost = (id) => {
  //console.log(id)
  return get(ref(database, `posts/${id}/likedBy`))
    .then(result => {

      if (!result.exists()) {
        throw new Error(`Post with id ${id} does not exist!`);
      }

      const post = Object.values(result.val());

      if (!post) return 0;

      return post.reduce((acc, value) => {
        acc += value ? 1 : -1;
        return 0;
      },);
    });
};

export const likePost = (username, postId) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/likedBy/${username}`] = true;
  updateLikes[`/users/${username}/likedPosts/${postId}`] = true;

  return update(ref(database), updateLikes);
};

export const dislikePost = (username, postId) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/likedBy/${username}`] = false;
  updateLikes[`/users/${username}/likedPosts/${postId}`] = true;

  return update(ref(database), updateLikes);
};

export const likesReverse = (username, postId) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/likedBy/${username}`] = null;
  updateLikes[`/users/${username}/likedPosts/${postId}`] = null;

  return update(ref(database), updateLikes);
};

export const getLikedPosts = () => {
  return get(ref(database, 'posts'))
    .then(snapshot => {
      return snapshot
    }).catch(e => console.log(e))
}

