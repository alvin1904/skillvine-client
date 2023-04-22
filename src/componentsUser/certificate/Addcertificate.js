import React from 'react'
import Leftadd from './Leftadd'
import Rightadd from './Rightadd'

export default function Addcertificate() {
  return (
    <div>
         <form action="submit_certificate.php" method="post" encType="multipart/form-data">
         <Leftadd />
         <Rightadd />
         </form>
    
    
    </div>
  )
}

