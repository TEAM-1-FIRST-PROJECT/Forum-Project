import { ref as sRef } from "firebase/storage";
import { getDownloadURL, listAll, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { imageStorageDb } from "../../config/firebase-config";
import { v4 } from "uuid";

const ProfilePhoto = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = sRef(imageStorageDb, "images/");
  const uploadToStorage = () => {
    if (profilePhoto === null) return;

    const imageRef = sRef(imageStorageDb, `images/${profilePhoto.name + v4()}`);

    uploadBytes(imageRef, profilePhoto)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, [ ]);

  return (
    <>
  <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
              {imageUrls.map((url) => {
        return <img key={url.id} src={url} className="h-20 w-20 rounded-full" />;
      })}
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                  <input type="file" onChange={(e) => {setProfilePhoto(e.target.files[0])}} />
                  <span className="h-12 w-12 text-gray-300" aria-hidden="true" />
                <button
                      type="button"
                      onClick={uploadToStorage}
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>

     
    </>
  );
};

export default ProfilePhoto;

