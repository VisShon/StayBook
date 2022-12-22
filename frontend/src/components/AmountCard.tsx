import React,{useState, useEffect} from 'react'
import '../styles/BookingCard.scss'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { updatePrice, updateWithoutTaxPrice } from '../app/priceSlice'

function AmountCard({ checkIn, checkOut }: any) {
    const plans = useAppSelector((state) => state.plans.selectedPlans)
    const children = useAppSelector((state) => state.price.children)
    const dispatch = useAppDispatch()

    const [roomPrice,setRoomPrice] = useState(0.0)
    const [tax,setTax] = useState(0.0)

    useEffect(() => {
        var x: number = 0
        plans.forEach((plan: any) => {
            x += parseInt(plan.price, 10)
        })
        x += children * 500
        if (checkIn && checkOut) {
            x *= Math.ceil(
                Math.abs(checkIn!.getTime() - checkOut!.getTime()) /
                    (1000 * 60 * 60 * 24)
            )
        }
        setRoomPrice(x);
        let taxPrice: number = parseFloat((x * (12 / 100)).toFixed(3));
        setTax(taxPrice)

        dispatch(updateWithoutTaxPrice(x))
        dispatch(updatePrice(x+taxPrice))

    },[plans.length,children]) 
    
    return (
        <div className="amountCard">
            <div className="wrapper">
                <span>Room Price</span>
                <span>₹{roomPrice}</span>
            </div>
            <div className="wrapper">
                <span>Tax</span>
                <span>₹{tax}</span>
            </div>
            <div className="wrapper">
                <span>Total Price</span>
                <span>₹{roomPrice+tax}</span>
            </div>
        </div>
    )
}

export default AmountCard
