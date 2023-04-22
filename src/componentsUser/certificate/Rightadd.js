import React, { useRef } from 'react'
import DropDown from './DropDown'

export default function Rightadd() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const array1=["National Initiatives Participation", "Sports & Games", "Cultural Festivals", "Workshops & Seminars", "Other Events"]
  const array2=["NCC", "NSS", "Sports - Participation", "Sports - 1st Prize", "Sports - 2nd Prize"]
  const array3=["Level 1", "Level 2"  ,"Level 3", "Level 4" ,"Level 5"]
  return (
    <div className='RightAdd'> 

    <DropDown
      array={array1}
      defaultText="Select event type"
      ulRef={ref1}
    />
    <DropDown
      array={array2}
      defaultText="Select event"
      ulRef={ref2}
    />
    <DropDown
      array={array3}
      defaultText="Select level"
      ulRef={ref3}
    />

      <div className="cer_file">   
        <label htmlFor="cert_file">Certificate File:</label>
        <input type="file" className="cert_file" name="cert_file" accept=".jpg, .jpeg, .png, application/pdf"/><br/><br/>
      </div> 
  
      <div className="submit">
        <input type="submit" value="Add Certificate"/>
      </div>
    

    </div>
  )
}
