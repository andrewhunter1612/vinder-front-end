import { useState, useEffect } from "react";
import YesButton from "./YesButton";
import NoButton from "./NoButton";
import "./DisplayInfo.css";
import userEvent from "@testing-library/user-event";

const DisplayInfo = ({ potentialMatches }) => {
  const [option, setOption] = useState(null);

  const [pictureCounter, setPictureCounter] = useState(0);

  const [currentPicture, setCurrentPicture] = useState();

  //-------count down clock---------
  const [counter, setCounter] = useState(60);

  const selectOption = () => {
    return setOption(potentialMatches[0]);
  };

  const movePicture = (evt) => {
    if (evt.changedTouches[0].clientX > (evt.view.innerWidth / 10) * 9) {
      potentialMatches.splice(potentialMatches.indexOf(option), 1);
      selectOption();
      setPictureCounter(0);
      setCurrentPicture(option.profileImages[pictureCounter].mongoId);

    } else if (evt.changedTouches[0].clientX < evt.view.innerWidth / 10) {
      potentialMatches.splice(potentialMatches.indexOf(option), 1);
      let newNum = pictureCounter - 1;
      selectOption();
      setPictureCounter(0);
      setCurrentPicture(option.profileImages[pictureCounter].mongoId);
    }
  };

  const pictureClicked = (event) => {
    if (event.clientX > event.view.innerWidth / 2) {
    if (option.profileImages.length > pictureCounter +1) {
          let newNum = pictureCounter +1;
          setPictureCounter(newNum);
          setCurrentPicture(option.profileImages[pictureCounter].mongoId);
      }
    } else {
      if (pictureCounter > 0) {
        let newNum = pictureCounter - 1;
        setPictureCounter(newNum);
        setCurrentPicture(option.profileImages[pictureCounter].mongoId);
      }
    }
  };

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    //   if (counter === 0){
    //     window.location.reload(false);
    // }
  }, [counter]);

  useEffect(() => {
    setOption(
      potentialMatches[Math.floor(Math.random() * potentialMatches.length)]
    );
  }, [potentialMatches]);

  // useEffect(() => {
  //   if (potentialMatches.length > 0) {
  //        setCurrentPicture(option.profileImages[0].mongoId)
  //     }
  // }, [potentialMatches]);

  //   useEffect(() => {
  //     for (let i = 0; i < potentialMatches.length ; i++){
  //       const picture = potentialMatches[i].profileImages[0].mongoId
  //        setCurrentPicture(picture)
  //     }
  // }, [potentialMatches]);

  if (
    potentialMatches.length === 0 ||
    !option ||
    option.profileImages.length === 0
  ) {
    return (
      <div className="ran-out-of-matches">
        <h2>Nobody left in your area!</h2>
        <p>Congratulations you've completed Vinder</p>
        {/* <h2>More matches in: {counter}</h2> */}
      </div>
    );
  } else {
    return (
      <div className="display-container">
        <img
          onTouchEnd={movePicture}
          onClick={pictureClicked}
          className="display-picture"
          src={option.profileImages[pictureCounter].mongoId}
        ></img>
        <h2>{option.name}</h2>
        <p draggable="true">{option.age}</p>
        <p>{option.gender}</p>
        <p>{option.location}</p>
        <p>{option.bio}</p>
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
