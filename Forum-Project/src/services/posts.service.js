import { ref, push, get, query, equalTo, orderByChild, update, remove } from 'firebase/database';
import { database } from '../config/firebase-config';
import { toast } from 'react-toastify';

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

export const addPost = (userName, title, content, description, tags) => {

  return push(
    ref(database, 'posts'),
    {
      author: userName,
      title,
      content,
      description,
      tags,
      createdOn: Date.now(),
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
export const getLikesPerPost = (postId) => {

  return get(ref(database, `posts/${postId}`))
    .then(snapshot => {
      if (!snapshot.val()) {
        throw new Error(`User with handle @${postId} does not exist!`);
      }

      const likesObject = snapshot.val();
      console.log(Object.values(likesObject, postId))
      const count = Object.values(likesObject).reduce((acc, value) => {
        acc += value ? 1 : -1;
        return acc;
      }, );
      return count
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

export const deletePost = (postId) => {
  return remove(ref(database, `posts/${postId}`));
};

export const getPostsLength = () => {
  return get(ref(database, "posts")).then((snapshot) => {
    if (!snapshot.exists()) {
      throw new Error(`Users do not exist!`);
    }
    const posts = snapshot.val();
    const postsLength = Object.keys(posts).length;
    return postsLength;
  });
};

export const getPostByTitle = (searchTerm) => {
  return get(ref(database, "posts")).then((snapshot) => {
    if (!snapshot.exists()) {
      toast.error(`User with searchTerm ${searchTerm} does not exist!`);
    }
    const posts = snapshot.val();
    const filteredPosts = Object.keys(posts)
      .filter(
        (key) =>
          (posts[key]?.title && posts[key].title.includes(searchTerm))
      )
      .map((key) => posts[key]);
    return filteredPosts;
  });
};

export const postUpdateHandler = (postId, content) => {

  const path = `posts/${postId}/content`;

  return update(ref(database), { [path]: content })
};