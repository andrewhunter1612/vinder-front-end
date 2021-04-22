import { useState, useEffect } from "react";
import YesButton from "./YesButton";
import NoButton from "./NoButton";
import "./DisplayInfo.css";

const DisplayInfo = ({ potentialMatches }) => {
  const [option, setOption] = useState(
    potentialMatches[Math.floor(Math.random() * potentialMatches.length)]
  );
  const [pictureCounter, setPictureCounter] = useState(0);
  const [currentPicture, setCurrentPicture] = useState(option.picture[0]);

  const selectOption = () => {
    return setOption(
      potentialMatches[Math.floor(Math.random() * potentialMatches.length)]
    );
  };

  const movePicture = (evt) => {
    if (evt.changedTouches[0].clientX > (evt.view.innerWidth / 10) * 9) {
      console.log("liked");
    } else if (evt.changedTouches[0].clientX < evt.view.innerWidth / 10) {
      console.log("not liked");
    }
  };

  const pictureClicked = (event) => {
    if (event.clientX > event.view.innerWidth / 2) {
      if (pictureCounter < option.picture.length - 1) {
        let newNum = pictureCounter + 1;
        setPictureCounter(newNum);
        setCurrentPicture(option.picture[newNum]);
      }
    } else {
      if (pictureCounter > 0) {
        let newNum = pictureCounter - 1;
        setPictureCounter(newNum);
        setCurrentPicture(option.picture[newNum]);
      }
    }
  };

  // useEffect = (() => {
  //   setCurrentPicture(option.picture[pictureCounter])
  // }, [potentialMatches])

  if (potentialMatches.length === 0) {
    return (
      <div>
        <h2>Nobody left in your area!</h2>
        <p>Congratulations you've completed Vinder</p>
      </div>
    );
  } else {
    return (
      <div className="display-container">
        <img
          onTouchEnd={movePicture}
          onClick={pictureClicked}
          className="display-picture"
          src={currentPicture}
        ></img>
        <h2>{option.name}</h2>
        <p draggable="true">{option.age}</p>
        <p>{option.location}</p>
        <p>{option.hobbies}</p>
        <div className="swipe-buttons">
        <NoButton
            potentialMatches={potentialMatches}
            option={option}
            selectOption={selectOption}
          />
          <YesButton
            potentialMatches={potentialMatches}
            option={option}
            selectOption={selectOption}
          />
          
        </div>
      </div>
    );
  }
};

export default DisplayInfo;