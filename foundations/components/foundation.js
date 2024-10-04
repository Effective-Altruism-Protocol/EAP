import React from 'react'
import { useRouter } from 'next/router';

import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { ProgressBar } from 'primereact/progressbar';
import { Message } from 'primereact/message';
import { Calendar } from 'primereact/calendar';

import HomeButton from "./HomeButton";

import Web3Modal from "web3modal";
import { providers, Contract, utils, ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import { EAP_ABI, EAP_CONTRACT_ADDRESS } from "../constants";




const Foundation = (props) => {

    const router = useRouter();
    const id = router.query.foundationid;

    const projectStatus = {
        0: <Message severity="info" text="Published" />,
        1: <Message severity="success" text="Closed" />,
        2: <Message severity="success" text="Withdrawn" />,
        3: <Message severity="warn" text="Paused" />,
        4: <Message severity="error" text="Refunded" />
    }



    
  // walletConnected
  const [walletConnected, setWalletConnected] = useState(false);
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);

  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();

  const [donation, setDonation] = useState("");

  const [foundation, setFoundation] = useState([]);

  const [foundationProjects, setFoundationProjects] = useState([]);

  const [currentAccount, setCurrentAccount] = useState("");    

  const [address, setAddress] = useState();




const checkIfAccountChanged = async () => {
        try {
          const {ethereum} = window;
          ethereum.on('accountsChanged', (accounts) => {
            setWalletConnected(false);
            console.log("Account changed to:", accounts[0]);
            setCurrentAccount(accounts[0]);
          });
    
        } catch (error) {
          console.log(error);
        }
      }

  useEffect(() => {
    checkIfAccountChanged();
  }, []);

  /**
   * Returns a Provider or Signer object representing the Ethereum RPC with or without the
   * signing capabilities of metamask attached
   *
   * A `Provider` is needed to interact with the blockchain - reading transactions, reading balances, reading state, etc.
   *
   * A `Signer` is a special type of Provider used in case a `write` transaction needs to be made to the blockchain, which involves the connected account
   * needing to make a digital signature to authorize the transaction being sent. Metamask exposes a Signer API to allow your website to
   * request signatures from the user using Signer functions.
   *
   * @param {*} needSigner - True if you need the signer, default false otherwise
   */
  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Amoy network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80002) {
      window.alert("Change the network to Amoy");
      throw new Error("Change network to Amoy");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };


  /*
    connectWallet: Connects the MetaMask wallet
  */
    const connectWallet = async () => {
      try {
        // Get the provider from web3Modal, which in our case is MetaMask
        // When used for the first time, it prompts the user to connect their wallet
        const signer = await getProviderOrSigner(true);
        setWalletConnected(true);
        setAddress(await signer.getAddress());
      } catch (err) {
        console.error(err);
      }
    };


    const getFoundation = async () => {
      try {
        // We need a Signer here since this is a 'write' transaction.
        const signer = await getProviderOrSigner(true);
        // Create a new instance of the Contract with a Signer, which allows
        // update methods
        const eapContract = new Contract(EAP_CONTRACT_ADDRESS, EAP_ABI, signer);
  
        const add = await signer.getAddress();
        const foundation = await eapContract.getFoundationbyId(id);
        setLoading(true);
  
        // wait for the transaction to get mined
        setLoading(false);
        setFoundation(foundation);
        getFoundationProjects();
      } catch (err) {
        //alert(err);
        console.error(err);
      }
    };

  
    const getFoundationProjects = async () => {
      try {
        // We need a Signer here since this is a 'write' transaction.
        const signer = await getProviderOrSigner(true);
        // Create a new instance of the Contract with a Signer, which allows
        // update methods
        const eapContract = new Contract(EAP_CONTRACT_ADDRESS, EAP_ABI, signer);
        const add = await signer.getAddress();
        const projects = await eapContract.getProjectsbyFoundationId(id);
  
        setLoading(true);
        // wait for the transaction to get mined
        setLoading(false);
        //setFoundationProjects([...projects]);
        setFoundationProjects(projects);
      } catch (err) {
        //alert(err);
        console.error(err);
      }
    };

    const addContribution = async (projectId, ETH_VALUE_AS_STRING) => {
        try {
          // We need a Signer here since this is a 'write' transaction.
          const signer = await getProviderOrSigner(true);
          // Create a new instance of the Contract with a Signer, which allows
          // update methods
          const eapContract = new Contract(EAP_CONTRACT_ADDRESS, EAP_ABI, signer);
    
          console.log(utils.parseEther(ETH_VALUE_AS_STRING));
          const tx = await eapContract.addContribution(id, projectId, {value: utils.parseEther(ETH_VALUE_AS_STRING), gasLimit: 3000000});
          setLoading(true);
          // wait for the transaction to get mined
          setLoading(false);
          console.log(tx);
          getFoundationProjects();
        } catch (err) {
          alert(err);
          console.error(err);
        }
      };

    
    const calculateValueBar = (goal, remaining) => {
        let value = Math.floor(100 - (remaining * 100 / goal));
        return value;
    }


  
  const formatDate = (value) => {
    const myDate = new Date(value * 1000);
    return myDate.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
  };

    

    const renderDonationGroup = (index, donation) => {
    return(
        <div>
            <InputText
                  placeholder="Donation Amount" 
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDonation(e.target.value);
                    }
                  }
                  />
            <Button label='Contribuir' onClick={() => addContribution(index, donation)}/>
        </div>
    )}
    /*
    renderButton: Returns a button based on the state of the dapp
  */
  const renderProjects = () => {
    if (walletConnected) {
      return (
        <Accordion className=''>
        {console.log(foundationProjects)}
          {foundationProjects.map((project, index) => (
            
            <AccordionTab header={project["name"]} key={index}>
              <div className="flex flex-row flex-wrap">
                <p className="flex align-items-center m-2">{project.description}</p>
                <p className="flex align-items-center justify-content-center bg-primary font-bold border-round m-2">{formatDate(project.createdAt)}</p>
              </div>

              <div className='m-2'>{projectStatus[project.status]}</div>
              
              <p className="m-3"><span>Goal: </span>{utils.formatEther(project.goal)}</p>
              <div className="card">
              <ProgressBar className="h-1rem" value={calculateValueBar(utils.formatEther(project.goal), utils.formatEther(project.remainingAmount))}></ProgressBar>
              </div>
              <p className="m-2"><span>Balance: </span>{utils.formatEther(project.balance)}</p>
              <p className="m-2"><span>Remaining: </span>{utils.formatEther(project.remainingAmount)}</p>
              {address == foundation.account ? "You can't contribute to your own foundation, change wallet." :
                 project.status == 0 && 
                 renderDonationGroup(index, donation)}
            </AccordionTab>
          ))}
        </Accordion>
      );
    }
  };


  // In this case, whenever the value of `walletConnected` changes - this effect will be called
  useEffect(() => {
    //if(foundationName){
    //}
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "Mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
    getFoundation();
    

  }, [walletConnected]);


    return (
        <div className="flex flex-column align-items-center">
            <div>
                <h2>{foundation.name}</h2>
            </div>
            <div>
            <h3>{foundation.description}</h3>
            </div>
            <div className='w-5'>
                {renderProjects()}
            </div>
        </div>
    )
}


export default Foundation