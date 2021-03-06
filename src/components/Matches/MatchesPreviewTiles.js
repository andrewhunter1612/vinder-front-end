import MatchesTemplateTile from "./MatchesTemplateTile";
import "./MatchesPreviewTiles.css";
import { useEffect } from "react";
import { useState } from "react";

const MatchesPreviewTiles = ({ matches }) => {
  const [previews, setPreviews] = useState(null);

  useEffect(() => {
    if (matches) {
      const userId = sessionStorage.getItem("id");
      let newPreviews = matches.map((match, index) => {
        const hrefName =
          "/matches/conversation/7/" + match.matchedUser.id ;
        return (
          <a href={hrefName}>
            <MatchesTemplateTile match={match.matchedUser} key={index} />
          </a>
        );
      });
      setPreviews(newPreviews);
    }
  }, [matches]);

  return <section id="template-section">{previews}</section>;
};
export default MatchesPreviewTiles;
