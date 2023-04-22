import React from 'react'
import LeftAdd from './LeftAdd'
import RightAdd from './RightAdd'


export default function AddCertificate() {
  return (
    <div>
         <form action="submit_certificate">
         <LeftAdd />
         <RightAdd />
         </form>
    </div>
  )
}

