import { useAppDispatch } from '../app/hooks'
import { addPlan } from '../app/planSlice'
import CheckIcon from '@mui/icons-material/Check';
import '../styles/PlanCard.scss'

function PlanCard({ plan, room, amenities, maxCap, guests, checkIn, checkOut }: any) {
  const dispatch = useAppDispatch();
  const wind = window.matchMedia("(max-width: 800px)");

  const getPrice = (
    date: Date,
    arrOfObjects: any,
    defaultPrice: number
  ): number => {

    date.setHours(23, 59, 59, 999);
    if (arrOfObjects === null) {
      return defaultPrice;
    }
    for (let i = 0; i < arrOfObjects.length; i++) {
      let startDate = new Date(arrOfObjects[i].starting_date);
      let endDate = new Date(arrOfObjects[i].ending_date);
      startDate.setHours(23, 59, 59, 999);
      endDate.setHours(23, 59, 59, 999);
      if (date >= startDate && date <= endDate) {
        return arrOfObjects[i].price;
      }
    }
    return defaultPrice;
  };

  const onClickHandler = () => {
    let newPlan = { ...plan, roomType: room, maxCap: maxCap, guests: guests };
    dispatch(addPlan(newPlan));
  };

  return (
    <div className="planCard">
      <div style={{ width: "30%" }}>
        <h2>{plan.title}</h2>
        <p>{plan.info}</p>
      </div>
      {!wind.matches && (
        <div className="tooltip">
          Amenities
          <div className="tooltiptext">{amenities}</div>
        </div>
      )}
      {plan.features ? (
        <div className="features">
          {plan.features.map((feature: any) => (
            <span>
              <CheckIcon fontSize="inherit" /> {feature}
            </span>
          ))}
        </div>
      ) : null}
      <h2>
        
         ₹{getPrice(checkIn, plan.price_planner,plan.price)}
      </h2>
      <div className="button" onClick={onClickHandler}>
        Select
      </div>
    </div>
  );
}

export default PlanCard
