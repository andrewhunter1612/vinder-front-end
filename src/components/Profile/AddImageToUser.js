import {useState, useEffect} from 'react'
import FolderIcon from "./assets/FolderIcon2.png";
import CloseIcon from "./assets/pinkcross.png";
import AddingImageServices from '../../services/AddingImageServices';
import UserServices from '../../services/UserServices';

const AddImageToUser = ({user}) => {
  const [image, setImage] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [typeFile, setTypeFile] = useState("");
  const [base64, setBase64] = useState("")

  const userObject = {
    "id": user.id,
    "name": user.name,
    "age": user.age,
    "gender": user.gender,
    "location": user.location,
    "gender_preference": user.gender_preference,
    "bio": user.bio
  }


  const handleFileSelected = (evt) => {
    
    if (evt.target.files && evt.target.files[0]) {
      setTypeFile(evt.target.files[0].type);
      let reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);

      reader.onload = () => {
        setImage(reader.result);
        setIsUploaded(true);
        AddingImageServices.postProfileImage(reader.result)
        .then(data => {AddingImageServices.addNewProfileImage({mongoId: data._id, user: userObject})})
      };
    }
  }

  useEffect(() => {
    if (user.profileImages && user.id) {
      AddingImageServices.getProfileImage(user.profileImages[0].mongoId)
      .then((data) => setImage(data.image))
      .then(setIsUploaded(true))
    }
  }, [user])

  return(
    <form>
      <div className="image-upload"> 
            {!isUploaded ? (
              <>
                <label htmlFor="upload-input">
                  <img
                    src={FolderIcon}
                    draggable={"false"}
                    alt="placeholder"
                    style={{ width: 50, height: 50 }}
                  />
                  <p id="add-image">Add Image</p>
                </label>

                <input
                  id="upload-input"
                  type="file"
                  accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                  onChange={handleFileSelected}
                />
              </>
            ) : (
              <>
                <img
                  className="close-icon"
                  src={CloseIcon}
                  alt="CloseIcon"
                  onClick={() => {
                    setIsUploaded(false);
                    setImage(null);
                  }}
                />
                <img
                  id="uploaded-image"
                  src={image}
                  draggable={false}
                  alt="uploaded-img"
                  />
                </>
            )}
        </div>
    </form>
  )
}

export default AddImageToUser;