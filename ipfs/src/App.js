import logo from './logo.svg';
//import './App.css';

import Web3Modal from "web3modal";
import { providers, Contract, utils, BigNumber } from "ethers";
import { useEffect, useRef, useState } from "react";
import { EAP_ABI, EAP_CONTRACT_ADDRESS } from "./constants";

import { Button } from 'primereact/button';

import Table from './components/Table';


import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './styles/layout/layout.scss';
import './styles/themes/lara-dark-blue/theme.css';


function App() {
// walletConnected
const [walletConnected, setWalletConnected] = useState(false);
// foundationRegistered
const [foundationRegistered, setFoundationRegistered] = useState(false);
// loading is set to true when we are waiting for a transaction to get mined
const [loading, setLoading] = useState(false);

// Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
const web3ModalRef = useRef();

const [address, setAddress] = useState();

const [foundations, setFoundations] = useState([]);

const [countriesData, setCountriesData] = useState([]);


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
        setAddress(await signer.getAddress())
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
        const countries = await eapContract.getCountries();
        setCountriesData(countries);
        const tempFoundations = await eapContract.getAllFoundations();
        setLoading(true);
        // wait for the transaction to get mined
        setLoading(false);
        //setFoundationProjects([...projects]);
        
        console.log(tempFoundations.slice(1))
  
        setFoundations(tempFoundations.slice(1));
      } catch (err) {
        //alert(err);
        console.error(err);
      }
    };

    const url = () => {
      
      

      console.log(window.location.pathname);
    };
    



    useEffect(() => {
      //if(foundationName){
      getAllFoundations();
      url();
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
    <div className="App">
      <header className="App-header">
       
      </header>
      <div>
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
      </div>
      <div className="flex flex-column align-items-center">
        
          

          <h1 className="">Select a Foundation to Contribute</h1>
          
          {/* {renderFoundations()} */}
          <Table
            foundations = {foundations}
            countriesData = {countriesData}
          />
        
      </div>
    </div>
  );
}

export default App;
