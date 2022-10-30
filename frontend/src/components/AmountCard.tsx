import React,{useState, useEffect} from 'react'
import '../styles/BookingCard.scss'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { updatePrice, updateWithoutTaxPrice } from '../app/priceSlice'

function AmountCard({ checkIn, checkOut }: any) {
    const plans = useAppSelector((state) => state.plans.selectedPlans)
    const children = useAppSelector((state) => state.price.children)
    const dispatch = useAppDispatch()

    const [roomPrice,setRoomPrice] = useState<number>(0)
    const [tax,setTax] = useState<number>(0)
    const [netPrice,setNetPrice] = useState<number>(0)

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
        dispatch(updateWithoutTaxPrice(x))

        setTax(parseFloat((x * (10 / 100)).toFixed(3)))
        setNetPrice(x + tax)
        dispatch(updatePrice(netPrice))

    },[plans,children]) 
    
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
                <span>₹{netPrice}</span>
            </div>
        </div>
    )
}

export default AmountCard
