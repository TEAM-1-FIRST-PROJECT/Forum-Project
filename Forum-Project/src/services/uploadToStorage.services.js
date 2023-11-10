import { ref, push, get, query, equalTo, orderByChild, update, remove } from 'firebase/database';
import { imageStorageDb } from '../config/firebase-config';
import { v4 } from 'uuid';
import { uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';

export const uploadToStorage = (img) => {
    const imgRef = ref(imageStorageDb, `profilePhotos/${v4()}`);
   return uploadBytes(imgRef, img);
 };