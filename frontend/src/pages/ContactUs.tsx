import React, { useState } from 'react'
import '../styles/home/ContactUs.scss'
import tours from '../images/travel.svg'
import emailjs from '@emailjs/browser' 
function ContactUs() {
  const[name,setName] = useState<string>('');
  const[email,setEmail] = useState<string>('');
  const[message,setMessage] = useState<string>('');
  const[sent,isSent] = useState<boolean>(false)
  const[error,setError] = useState<boolean>(false)

  const sendMail = async () => {
    setError(false)
    if(!name||!email) {
      setError(true);
    }
    else{
      let templateParams = {
        from_name:name,
        from_email:email,
        message:message,
      }
      const mail = await emailjs.send('service_mv03hwf','template_v3pqjwl',templateParams,'6HGQvyzipY4qgGkWm')
      .then(()=>isSent(true));
    }
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

          {error&&<p className="error">Enter email and name</p>}

        <textarea value={message}
              onChange={(e) => setMessage(e.target.value)} 
              placeholder="Message"/>
        {!sent?<div onClick={sendMail} className='button'>Submit</div>:
        <a href="/" className='button'>Done</a>}
      </div>
    </div>
  )
}

export default ContactUs