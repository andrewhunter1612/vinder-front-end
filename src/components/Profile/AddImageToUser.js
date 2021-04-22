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


  const handleFileSelected = (evt) => {
    
    if (evt.target.files && evt.target.files[0]) {
      setTypeFile(evt.target.files[0].type);
      let reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);

      reader.onload = () => {
        setImage(reader.result);
        setIsUploaded(true);
        AddingImageServices.postProfileImage(reader.result)
        .then(data => {
          // console.log("show image", data._id)
          AddingImageServices.addNewProfileImage({mongoId: data._id, user: user})
        })
      };
    }
  }

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