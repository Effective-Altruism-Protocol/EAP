"use client";

import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Web3Modal from "web3modal";
import { providers, Contract, utils, BigNumber } from "ethers";
import { useEffect, useRef, useState } from "react";
import { EAP_ABI, EAP_CONTRACT_ADDRESS } from "../../constants";


import { Message } from 'primereact/message';
import { Button } from 'primereact/button';

import "primeflex/primeflex.css";

import Link from 'next/link';


import "primereact/resources/themes/mdc-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import HomeButton from "../../components/HomeButton";

export default function Home() {
  // walletConnected
  const [walletConnected, setWalletConnected] = useState(false);
  // foundationRegistered
  const [foundationRegistered, setFoundationRegistered] = useState(false);
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);

  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();

  const [foundationName, setFoundationName] = useState("");

  const [address, setAddress] = useState();

  const [foundations, setFoundations] = useState([]);

  const [tempProject, setTempProject] = useState({});

  const [projectName, setProjectName] = useState("");

  const [projectGoal, setProjectGoal] = useState();

  const [foundationProjects, setFoundationProjects] = useState([]);


  const [currentAccount, setCurrentAccount] = useState("");    


  const projectStatus = {
    0: <Message severity="info" text="Published" />,
    1: <Message severity="success" text="Closed" />,
    2: <Message severity="success" text="Withdrawn" />,
    3: <Message severity="warn" text="Paused" />,
    4: <Message severity="error" text="Refunded" />
}

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

    // If user is not connected to the Mumbai network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Change the network to Mumbai");
      throw new Error("Change network to Mumbai");
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
        setAddress(await signer.getAddress())
        //checkIfAddressInWhitelist();
        //getNumberOfWhitelisted();
      } catch (err) {
        console.error(err);
      }
    };


  const getAllFoundations = async () => {
    try {
      // We need a Signer here since this is a 'write' transaction.
      const signer = await getProviderOrSigner(true);
      // Create a new instance of the Contract with a Signer, which allows
      // update methods
      const eapContract = new Contract(EAP_CONTRACT_ADDRESS, EAP_ABI, signer);
      const tempFoundations = await eapContract.getAllFoundations();
      setLoading(true);
      // wait for the transaction to get mined
      setLoading(false);
      //setFoundationProjects([...projects]);
      setFoundations(tempFoundations);
    } catch (err) {
      //alert(err);
      console.error(err);
    }
  };


  /*
    renderButton: Returns a button based on the state of the dapp
  */
    const renderFoundations = () => {
      if (walletConnected) {
        return (
          <div className="card flex flex-wrap justify-content-center gap-3">
            {foundations.map((foundation, index) => (
              index ?
              <Link href={`/contribute/${index}`}>
                <Button label={foundation.name} key={index}/>
              </Link>
              :
              <></>
              ))
            }
          </div>
        );
      }
    };


  // In this case, whenever the value of `walletConnected` changes - this effect will be called
  useEffect(() => {
    //if(foundationName){
    getAllFoundations();
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

  }, [walletConnected]);

  return (
    <div>
      <Head>
        <title>Whitelist Dapp</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        {address && (
          <div className="grid">
            <div>
              <p className="mb-1">Network:</p>
              <p>Mumbai</p>
            </div>
            <div>
              <p className="mb-1">Address:</p>
              <p>{address}</p>
            </div>
          </div>
        )}
      </header>
      <main className="flex flex-column align-items-center">
        <div className=" w-5">
          

          <h1 className={styles.title}>Select a Foundation to Contribute</h1>
          
          {renderFoundations()}
          
        </div>
        <HomeButton/>
      </main>
        
      <footer className="align-items-center flex flex-column">Made with &#10084; by EAP Team</footer>
    </div>
  );
}
