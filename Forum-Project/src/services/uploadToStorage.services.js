import { ref, set} from 'firebase/database';
import { imageStorageDb } from '../config/firebase-config';
import { v4 } from 'uuid';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';


export const uploadToStorage = (photo) => {
    const storageRef = ref(imageStorageDb, `profilePhotos/${v4()}`);
    return uploadBytes(storageRef, photo)
      .then((snapshot) => {
        console.log('Uploaded a blob or file!');
        return getDownloadURL(snapshot.ref);
      })
      .catch((error) => {
        console.error('Upload failed:', error);
        throw error;
      });
};
  
