import { ref, set} from 'firebase/database';
import { imageStorageDb } from '../config/firebase-config';
import { v4 } from 'uuid';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';



  
// export const uploadToStorage = (photo) => {
//   if (photo === null) return;
//   const imageRef = ref(imageStorageDb, `images/${photo.name + v4()}`);

//   uploadBytes(imageRef, photo)
//     .then(() => {
//       console.log("Image uploaded");
//     })
//     .catch((e) => console.log(e));
// };


     //  useEffect(() => {
        //   listAll(imagesListRef).then((response) => {
        //     response.items.forEach((item) => {
        //       getDownloadURL(item).then((url) => {
        //         setImageUrls((prev) => [...prev, url]);
        //       });
        //     });
        //   });
        // }, []);