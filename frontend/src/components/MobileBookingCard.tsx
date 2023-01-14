import '../styles/BookingCard.scss'
import { useAppSelector } from '../app/hooks'

const MobileBookingCard = ({ scrollToCard }: any) => {

  const withoutTax = useAppSelector((state) => state.price.withoutTax);
    return (
        <div className="mobile-booking-card">
            <p>₹{withoutTax}</p>
            <div onClick={scrollToCard}>Continue to book</div>
        </div>
    )
}

export default MobileBookingCard
