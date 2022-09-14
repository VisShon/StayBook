import React, { useState } from 'react'
import '../styles/home/ContactUs.scss'
import tours from '../images/travel.svg'
import emailjs from '@emailjs/browser' 
function ContactUs() {
  const[name,setName] = useState<string>('');
  const[email,setEmail] = useState<string>('');
  const[message,setMessage] = useState<string>('');

  const sendMail = async () => {
    
    let templateParams = {
      to_name:localStorage.getItem('email'),
    }
    const mail = await emailjs.send('service_mv03hwf','template_dysx4ir',templateParams,'6HGQvyzipY4qgGkWm')
    .then(function(response) {
    }, function(error) {
      console.log(error)
    });

  }



  return (
    <div className="contactUsBody">
      <img src={tours} />
      <div className="form">
        <h2>Contact Us</h2>
        <p>Do you want to enquire about our pricing, current offers 
          and arrangements we can help you with? Give us a call or send in your 
          concerns through the form below.</p>
        <div className="input">
          <input value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  type="text" 
                  style={{marginRight:'1rem'}}
                  placeholder="Name *"/>

          <input value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  type="text" 
                  style={{marginLeft:'1rem'}}
                  placeholder="Email *"/>
        </div>
        <textarea value={message}
              onChange={(e) => setMessage(e.target.value)} 
              placeholder="Message"/>
        <div className='button'>Submit</div>
      </div>
    </div>
  )
}

export default ContactUs