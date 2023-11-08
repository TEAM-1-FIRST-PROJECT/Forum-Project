import { ref, push, get, query, equalTo, orderByChild, update } from 'firebase/database';
import { database } from '../config/firebase-config';

const fromPostsDocument = snapshot => {
  const postsDocument = snapshot.val();

  return Object.keys(postsDocument).map(key => {
    const post = postsDocument[key];

    return {
      ...post,
      id: key,
      createdOn: new Date(post.createdOn),
      likedBy: post.likedBy ? Object.keys(post.likedBy) : [],
    };
  });
}

export const addPost = (username, title, description, content) => {

  return push(
    ref(database, 'posts'),
    {
      author: username,
      title: title,
      content: content,
      createdOn: Date.now(),
      likedBy: Date.now(),
      description: description
    },
  )
    .then(result => {

      return getPostById(result.key);
    });
};

export const getPostById = (id) => {

  return get(ref(database, `posts/${id}`))
    .then(result => {
      if (!result.exists()) {
        throw new Error(`Post with id ${id} does not exist!`);
      }

      const post = result.val();
      post.id = id;
      post.createdOn = new Date(post.createdOn);
      if (!post.likedBy) post.likedBy = [];

      return post;
    });
};

export const getLikedPosts = (username) => {

  return get(ref(database, `users/${username}`))
    .then(snapshot => {
      if (!snapshot.val()) {
        throw new Error(`User with handle @${username} does not exist!`);
      }

      const user = snapshot.val();
      if (!user.likedPosts) return [];

      return Promise.all(Object.keys(user.likedPosts).map(key => {

        return get(ref(database, `posts/${key}`))
          .then(snapshot => {
            const post = snapshot.val();

            return {
              ...post,
              createdOn: new Date(post.createdOn),
              id: key,
              likedBy: post.likedBy ? Object.keys(post.likedBy) : [],
            };
          });
      }));
    });
};

export const getPostsByAuthor = (username) => {

  return get(query(ref(database, 'Posts'), orderByChild('author'), equalTo(username)))
    .then(snapshot => {
      if (!snapshot.exists()) return [];

      return fromPostsDocument(snapshot);
    });
};

export const getAllPosts = () => {

  return get(ref(database, 'posts'))
    .then(snapshot => {
      if (!snapshot.exists()) {
        return [];
      }

      return fromPostsDocument(snapshot);
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
  updateLikes[`/posts/${postId}/likedBy/${username}`] = null;
  updateLikes[`/users/${username}/likedPosts/${postId}`] = null;

  return update(ref(database), updateLikes);
};