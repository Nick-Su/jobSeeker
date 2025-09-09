import FontAwesome from "@react-native-vector-icons/fontawesome";
import { FC } from "react";

interface IShiftRating {
  customerRating: number | null;
  customerFeedbacksCount: string;
}

const ShiftRating: FC<IShiftRating>  = ({customerRating, customerFeedbacksCount}) => {
  return (
  <>
    {customerRating ? (<><FontAwesome name="star" size={15} color="orange" />{customerRating} </>) : ''}
    {customerFeedbacksCount}
  </>
  )
}

export default ShiftRating;
