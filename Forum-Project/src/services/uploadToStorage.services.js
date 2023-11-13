import { listAll, ref as sRef} from 'firebase/storage';
import { imageStorageDb } from '../config/firebase-config';
import { v4 } from 'uuid';
import { uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';

export const uploadToStorage = (photo) => {
   if (photo === null) return;

   const imageRef = sRef(imageStorageDb, `images/${photo.name + v4()}`);

   uploadBytes(imageRef, photo)
     .then(() => {
      
         toast.success('Image uploaded successfully');
       })
     
     .catch((e) => console.log(e));
};

 
const imagesListRef = sRef(imageStorageDb, "images/");

export const listImg = () => {
 return listAll(imagesListRef)
}

//  useEffect(() => {
//    listAll(imagesListRef).then((response) => {
//      response.items.forEach((item) => {
//        getDownloadURL(item).then((url) => {
//          setImageUrls((prev) => [...prev, url]);
//        });
//      });
//    });
//  }, []);
   