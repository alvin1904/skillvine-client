import React from 'react'

export default function Leftadd() {
  return (
    <div className='Leftadd'> 
    
      <div className="Event_name">
        <label htmlFor="event_name">Event Name:</label>
        <input type="text" id="event_name" name="event_name" required/><br/><br/>
      </div>
  
      <div className="Date_issued">
        <label htmlFor="date_issued">Date Issued:</label>
        <input type="date" id="date_issued" name="date_issued" required/><br/><br/>
      </div>
  
      <div className="End_date">
        <label htmlFor="end_date">End Date:</label>
        <input type="date" id="end_date" name="end_date"/><br/><br/>
      </div>
  
      <div className="Event_desc">
        <label htmlFor="event_desc">Event Description:</label>
        <textarea id="event_desc" name="event_desc" required/><br/><br/>
      </div>
     
    </div>
  )
}
