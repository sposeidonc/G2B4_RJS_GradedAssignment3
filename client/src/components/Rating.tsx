import { faStar,faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
    rating : number;
}
export const Rating = ({rating}:Props) => {

    const fullStar = Math.floor(rating);
    const halfStar = Math.round(rating)  - Math.floor(rating);
    const emptyStar = 10 - (fullStar + halfStar);

  return (
    <div style={{color:'goldenrod'}}>
      {
        Array.from({length:fullStar}).map((item , idx)=>(
          <FontAwesomeIcon icon={faStar} key={idx}/>
         )
        )
      }
      {
        Array.from({length:halfStar}).map((item , idx)=>(
          <FontAwesomeIcon icon={faStarHalfAlt} key={idx}/>
         )
        )
      }
      {
        Array.from({length:emptyStar}).map((item , idx)=>(
          <FontAwesomeIcon icon={faStarEmpty} key={idx}/>
         )
        )
      }
    </div>
  )
}

Rating.defaultProps = {
    rating : 7.8
}