"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AvatarEditor from "react-avatar-editor";

interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
}

const DashboardPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [editor, setEditor] = useState<any>();

  const handlePhotoChange = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    setImage(null);
    setCroppedImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleCropImage = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const croppedImageUrl = canvas.toDataURL("image/jpeg");
      setCroppedImage(croppedImageUrl);
      /*  console.log(croppedImageUrl, "urllllllllll"); */
    }
  };

  const handleSave = async () => {
    if (!croppedImage) {
      console.error("Cropped image is not set");
      return;
    }

    try {
      console.log("save bt clickkkkkkk");
      const blob = await fetch(croppedImage).then((res) => res.blob());
      console.log(blob);
      const file = new File([blob], "image.jpg", { type: "image/jpeg" });
      const formData = new FormData();

      formData.append("file", file);
      console.log(formData, "cropeddddd img");
      const response = await axios.put(
        `http://localhost:8080/auth/upload-photo/${userData?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedUser = response.data;
      setUserData(updatedUser);
      handleModalClose();
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios
        .get("http://localhost:8080/auth/userdata", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((err) => {
          setError(err.response.data.message || "Failed to fetch user data");
        });
    } else {
      setError("Access token not found");
    }
  }, []);

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      {userData && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-lg font-semibold">
            Firstname: {userData.firstName}
          </p>
          <p className="text-lg font-semibold">Lastname: {userData.lastName}</p>
          <p className="text-lg font-semibold">Email: {userData.email}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white  py-1 px-1 mt-1 rounded focus:outline-none focus:shadow-outline"
            onClick={handlePhotoChange}
          >
            Edit profile Photo
          </button>
        </div>
      )}

      {modalIsOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg">
            <input type="file" className="mb-4" onChange={handleImageChange} />
            {image && (
              <div className="crop-container">
                <AvatarEditor
                  ref={(editor: any) => setEditor(editor)}
                  image={image}
                  width={150}
                  height={150}
                  border={50}
                  color={[255, 255, 255, 0.6]}
                  scale={1.4}
                  rotate={0}
                />
              </div>
            )}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={handleCropImage}
            >
              Crop Image
            </button>
            {croppedImage && (
              <div>
                <img src={croppedImage} alt="Cropped" />
              </div>
            )}
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={handleModalClose}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
