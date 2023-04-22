import React from 'react'

export default function LeftAdd() {
  return (
    <div className='LeftAdd'> 
      <div className="Event_name">
        <label htmlFor="event_name">Event Name:</label>
        <input type="text" className="event_name" name="event_name"/><br/><br/>
      </div>
  
      <div className="Date_issued">
        <label htmlFor="date_issued">Date Issued:</label>
        <input type="date" className="date_issued" name="date_issued"/><br/><br/>
      </div>
  
      <div className="Event_name">
        <label htmlFor="event_name">Duration:</label>
        <input type="number" className="duration" name="event_name" min="1"/>days<br/><br/>
      </div>

      <div className="End_date">
        <label htmlFor="end_date">End Date:</label>
        <input type="date" className="end_date" name="end_date"/><br/><br/>
      </div>
  
      <div className="Event_desc">
        <label htmlFor="event_desc">Event Description:</label>
        <textarea className="event_desc" name="event_desc"/><br/><br/>
      </div>
    </div>
  )
}
