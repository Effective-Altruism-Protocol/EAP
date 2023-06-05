import React from 'react'
import Link from 'next/link';
import { Button } from 'primereact/button';


const HomeButton = (props) => {
    return (
        <Link href="/">
              <Button
                label="Go Home" 
              /> 
        </Link>
    )
 }


 export default HomeButton;