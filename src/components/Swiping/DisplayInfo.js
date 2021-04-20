import { useState } from "react";
import YesButton from "./YesButton";
import NoButton from "./NoButton";
import "./DisplayInfo.css";

const DisplayInfo = ({ potentialMatches }) => {
  const [option, setOption] = useState(
    potentialMatches[Math.floor(Math.random() * potentialMatches.length)]
  );

  const selectOption = () => {
    return setOption(
      potentialMatches[Math.floor(Math.random() * potentialMatches.length)]
    );
  };

  const movePicture = (evt) => {
    if (evt.changedTouches[0].clientX > evt.view.innerWidth / 2) {
      console.log("liked");
    } else {
      console.log("not liked");
    }
  };

  if (potentialMatches.length > 0) {
    return (
      <div className="display-container">
        <img
          onTouchEnd={movePicture}
          class="display-picture"
          src={option.picture}
        ></img>
        <h2>{option.name}</h2>
        <p draggable="true">{option.age}</p>
        <p>{option.location}</p>
        <p>{option.hobbies}</p>
        <div className="swipe-buttons">
          <YesButton
            potentialMatches={potentialMatches}
            option={option}
            selectOption={selectOption}
          />
          <NoButton
            potentialMatches={potentialMatches}
            option={option}
            selectOption={selectOption}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Nobody left in your area!</h2>
        <p>Congratulations you've completed Vinder</p>
      </div>
    );
  }
};

export default DisplayInfo;
