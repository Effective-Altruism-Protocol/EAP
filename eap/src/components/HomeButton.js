import React from 'react'
import { useRouter } from 'next/router';

import Link from 'next/link';
import { Button } from 'primereact/button';

import Web3Modal from "web3modal";
import { providers, Contract, utils, ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import { EAP_ABI, EAP_CONTRACT_ADDRESS } from "../constants";

import "primereact/resources/themes/mdc-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";

import "primeflex/primeflex.css";



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