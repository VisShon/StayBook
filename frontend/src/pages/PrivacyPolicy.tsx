import React from 'react'
import '../styles/Misc.scss'
import {Helmet} from 'react-helmet'

function PrivacyPolicy() {
  return (
    <>
    <Helmet>
      <title>Privacy Policy</title>
      <meta name="description" content="StayBook Booking engine for Hotels enabled with high speed wifi throughout. There are different wifi connections on different floors. The guest can find the wifi passwords on the wifi cards inside of their rooms we have a specialized work station for our guests with high speed cables. Delhi hotels" />
    </Helmet>
    <div className="Misc">
        <h1>Privacy Policy</h1>
        <p>Different type of personal information is collected by us mentioned below.</p>
        <ul>
            <li>Contact details: These detail included phone number, email id, home address.</li>
            <li>Company details: in terms of any corporate is tries to make the booking we require the company name as well as we also requires the GST number and Official name of the company.</li>
            <li>Personal details: these details include the Name, age, Nationality, emergency contact details.<br/>
            The above data which is gathered from the guest is used in the different pourpose mentioned below.</li>
            <li>This gathered data is used by our reservation team so that they can contact the guest in case if they need help related in any bookings.</li>
            <li>To make check in and checkout hassle free and also to enable the express check in out check out services can be opted by the guest.</li>
            <li>The data is used in invoices such that Hotels can provide you the correct information of the guest as its our surety if you don’t they get the bill you’ll get the room rent for free in Staybook Hotels ( only applicable to Staybook official bookings).</li>
            <li>To provide memberships and discounts to our lucky guests and the special offers that the guest can avail in the future To provide memberships and discounts to our lucky guests and the special offers that the guest can avail in the future.</li>
            <li>Airport pickup services uses these data for the smooth airport pickup services.</li>
        </ul>
        <h3>Contact us</h3>
        <p>The guest can feel free to contact us 24*7 our customer service number<br/>
        Email - <a href="mailto: booking@staybook.in">Booking@Staybook.in</a><br/>
        Phone - <a href="Tel: +91-8373929299">8373929299</a></p>
        <h3>Phishing</h3>
        <p>If we finds any person around the world tries to send us fraudulent email, fax, calls, text would be considered as fraud and legal action would be taken against them.<br/><br/>

        We don't use any of the personalized email at Staybook we only contact guest with emails ending with “Staybook.in” so if some guest get a any unauthorized email we request the guest to not to use reply those email, in case if you get any call form the Hotels staff you get it by only +91-8373929299, +91-8527703312, +91-7217676061,+91-9211962749 are the only authorized number from which the guest are connected.<br/><br/>

        Somehow if a certain guest gets these unauthorized call or email we would not consider that email as valid and not to share any personal data on them or to provide any booking information to them even not to open any attachment if they provide you over the email.<br/><br/>
        </p>
        <h3>Privacy policies</h3>
        <p>All the materials that is available on the Staybook official website which may include the documents, photos, materials, pdfs are the sole Hotels of the Staybook or Staybook have gained license of the them, we strictly prohibit them to use any of those items that are available on our website without any permission of Staybook, no other person rather than the Staybook official teammate can use them on different platform.<br/><br/>

        No information provided by the guest can used for any commercial use like sale or rental 
        All the passwords should be handled by the guest only website would not be responsible for them. <br/> <br/>

        We can change any of the terms and condition of the website without any prior notice to any person so we request you to please keep a look on the terms and conditions regularly.<br/> <br/>
        </p>
    </div>
    </>
  )
}

export default PrivacyPolicy