import React from 'react'

export default function Rightadd() {
  return (
    <div className='Rightadd'> 
    
    <div className="Drop_down">
        <label htmlFor="cert_category">Certificate Category:</label>
        <select id="cert_category" name="cert_category" required>
          <option value="" selected disabled>Choose category</option>
          <option value="workshop">Workshop</option>
          <option value="internship">Internship</option>
          <option value="course">Course</option>
          <option value="other">Other</option>
        </select><br/><br/>
      </div>
  
      <div className="cer_file">   
        <label htmlFor="cert_file">Certificate File:</label>
        <input type="file" id="cert_file" name="cert_file" accept=".jpg, .jpeg, .png, application/pdf" required/><br/><br/>
      </div> 
  
      <div className="submit">
        <input type="submit" value="Add Certificate"/>
      </div>
    

    </div>
  )
}
