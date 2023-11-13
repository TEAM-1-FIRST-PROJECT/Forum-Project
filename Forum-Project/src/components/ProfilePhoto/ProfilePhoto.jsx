import { useState } from "react";
import { uploadToStorage } from "../../services/uploadToStorage.services";
import { imageStorageDb } from "../../config/firebase-config";
import { deleteObject, ref as sRef } from "firebase/storage";

const ProfilePhoto = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  // const [imageUrls, setImageUrls] = useState([]);

  // const imagesListRef = sRef(imageStorageDb, "images/");
  const handleUpload = () => {
    uploadToStorage(profilePhoto);
  };
  //   useEffect(() => {
  //     listAll(imagesListRef).then((response) => {
  //       response.items.forEach((item) => {
  //         getDownloadURL(item).then((url) => {
  //           setImageUrls((prev) => [...prev, url]);
  //         });
  //       });
  //     });
  //   }, []);

  const handleFileChange = (e) => {
    if (profilePhoto) {
      const photoRef = sRef(imageStorageDb, `images/${profilePhoto.name}`);
      deleteObject(photoRef)
        .then(() => {
          console.log("Previous image deleted");
        })
        .catch((error) => {
          console.error("Error deleting image: ", error);
        });
    }
    setProfilePhoto(e.target.files[0]);

    // Create a preview URL of the image
    const url = URL.createObjectURL(e.target.files[0]);
    setPreviewUrl(url);
  };

  return (
    <div className="col-span-full">
      <label
        htmlFor="photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Photo
      </label>
      <div className="mt-2 flex items-center gap-x-3">
        <label className="cursor-pointer">
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <div className="h-20 w-20 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500">
            {previewUrl ? (
              <img src={previewUrl} className="h-20 w-20 rounded-full" />
            ) : (
              "+"
            )}
          </div>
        </label>
        <button
          type="button"
          onClick={handleUpload}
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Change
        </button>
      </div>
    </div>
  );
};

export default ProfilePhoto;
