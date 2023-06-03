'use client';

import Foundation from "../../../components/foundation";

import "primereact/resources/themes/mdc-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";



export const Home = (props) => {
 
  const {id} = props



  return (
    
    <Foundation
    id={id}/>
   
   
  );
}

export default Home;