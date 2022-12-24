import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { addPlan, removePlan } from '../app/planSlice'
import CheckIcon from '@mui/icons-material/Check';
import '../styles/PlanCard.scss'

function PlanCard({ plan, room, amenities, maxCap, guests }: any) {
    const dispatch = useAppDispatch()
    const wind = window.matchMedia('(max-width: 800px)')

    const onClickHandler = () => {
        let newPlan = { ...plan, roomType: room, maxCap: maxCap, guests: guests}
        dispatch(addPlan(newPlan))
    }

    return (
        <div className="planCard">
            <div style={{ width: '35%' }}>
                <h2>{plan.title}</h2>
                <p>{plan.info}</p>
            </div>
            {!wind.matches && (
                <div className="tooltip">
                    Cancellation Policy
                    <div className="tooltiptext">{amenities}</div>
                </div>
            )}
            {plan.features ? (
                <div className="features">
                    {plan.features.map((feature: any) => (
                        <span><CheckIcon fontSize="inherit"/> {feature}</span>
                    ))}
                </div>
            ) : null}
            <h2>₹{plan.price}</h2>
            <div className="button" onClick={onClickHandler}>
                Select
            </div>
        </div>
    )
}

export default PlanCard
