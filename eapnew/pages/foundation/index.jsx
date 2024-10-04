import Web3Modal from "web3modal";
import { providers, Contract, utils, BigNumber } from "ethers";
import { useEffect, useRef, useState } from "react";
import { EAP_ABI, EAP_CONTRACT_ADDRESS } from "../../constants.js";

import { Accordion, AccordionTab } from "primereact/accordion";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Message } from 'primereact/message';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Chips } from "primereact/chips";

import DropdownCountries from "../../components/DropdownCountries.js";


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

  const [tempFoundation, setTempFoundation] = useState({});

  const [tempProject, setTempProject] = useState({});

  const [projectName, setProjectName] = useState("");

  const [projectGoal, setProjectGoal] = useState();

  const [foundationProjects, setFoundationProjects] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState();

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

const checkIfNetworkChanged = async () => {
  try {
    const {ethereum} = window;
   

  } catch (error) {
    console.log(error);
  }
}

  useEffect(() => {
    checkIfAccountChanged();
    checkIfNetworkChanged();
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
        setAddress(await signer.getAddress())
      } catch (err) {
        console.error(err);
      }
    };

  /**
   * addFoundation:
   */
  const addFoundation = async () => {
    try {
      // We need a Signer here since this is a 'write' transaction.
      const signer = await getProviderOrSigner(true);
      // Create a new instance of the Contract with a Signer, which allows
      // update methods
      const eapContract = new Contract(EAP_CONTRACT_ADDRESS, EAP_ABI, signer);
      const countriesCodes = await eapContract.getCountries();
      console.log(countriesCodes);
      const countryCode = countriesCodes.findIndex((country) => country === tempFoundation.country);
      const tx = await eapContract.addFoundation(
                                            tempFoundation.name, 
                                            tempFoundation.description,
                                            tempFoundation.email,
                                            tempFoundation.web,
                                            countryCode,
                                            tempFoundation.tags );
      setLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);
      getFoundationName();
    } catch (err) {
      alert(err);
      console.error(err);
    }
  };

  /**
   * addProject:
   */
  const addProject = async () => {
    try {
      // We need a Signer here since this is a 'write' transaction.
      const signer = await getProviderOrSigner(true);
      // Create a new instance of the Contract with a Signer, which allows
      // update methods
      const eapContract = new Contract(EAP_CONTRACT_ADDRESS, EAP_ABI, signer);
      //setFoundationProjects({name: projectName, goal: projectGoal});
      const tx = await eapContract.addProject(tempProject.name, tempProject.description, tempProject.goal);
      setLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);

      setProjectName("");
      setProjectGoal("");
    } catch (err) {
      alert(err);
      console.error(err);
    }
  };

  const getFoundationName = async () => {
    try {
      // We need a Signer here since this is a 'write' transaction.
      const signer = await getProviderOrSigner(true);
      // Create a new instance of the Contract with a Signer, which allows
      // update methods
      const eapContract = new Contract(EAP_CONTRACT_ADDRESS, EAP_ABI, signer);

      const add = await signer.getAddress();
      const name = await eapContract.getFoundationbyAddress(add);
      setLoading(true);

      // wait for the transaction to get mined
      setLoading(false);
      setFoundationName(name[1]);
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
      const projects = await eapContract.getProjectsbyAddress(add);

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

  const withdrawProject = async (projectId) => {
    try {
      // We need a Signer here since this is a 'write' transaction.
      const signer = await getProviderOrSigner(true);
      // Create a new instance of the Contract with a Signer, which allows
      // update methods
      const eapContract = new Contract(EAP_CONTRACT_ADDRESS, EAP_ABI, signer);
      await eapContract.withdrawProject(projectId);

      setLoading(true);
      // wait for the transaction to get mined
      setLoading(false);
      //setFoundationProjects([...projects]);
      getFoundationProjects();
    } catch (err) {
      //alert(err);
      console.error(err);
    }
  };

  /*
    renderButton: Returns a button based on the state of the dapp
  */
  const renderRegisterFoundation = () => {
    if (walletConnected) {
      if (foundationName) {
        return <div className="">{foundationName}</div>;
      } else if (loading) {
        return <Button label="Loading..." className=""/>;
      } else {
        return (
                  <div className="card p-fluid">
                    <h5>Foundation Form</h5>
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <InputText 
                            id="name" 
                            type="text" 
                            onChange={(e) => {
                                  let name = {name: e.target.value};
                                  setTempFoundation( tempFoundation => ({...tempFoundation, ...name}))
                                  }
                            } 
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="description">Description</label>
                        <InputText 
                          id="description" 
                          type="text" 
                          onChange={(e) =>{
                              let description = {description: e.target.value};
                              setTempFoundation( tempFoundation => ({...tempFoundation, ...description}))
                              }
                          } 
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="web">WEB</label>
                        <InputText 
                          id="web" 
                          type="text"
                          onChange={(e) =>{
                              let web = {web: e.target.value};
                              setTempFoundation( tempFoundation => ({...tempFoundation, ...web}))
                              }
                          }
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <InputText
                          id="email" 
                          type="text"
                          onChange={(e) =>{
                              let email = {email: e.target.value};
                              setTempFoundation( tempFoundation => ({...tempFoundation, ...email}))
                              }
                          }
                        />
                    </div>
                    <div className="field">
                      <label htmlFor="country">Country</label>
                      <DropdownCountries
                        id="country"
                        tempFoundation = {tempFoundation} 
                        setTempFoundation = {setTempFoundation} 
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="tags">Tags</label>
                      <Chips id='tags' value={tempFoundation.tags} 
                        onChange={(e) => {
                            let tags = {tags: e.value};
                            setTempFoundation( tempFoundation => ({...tempFoundation, ...tags}))
                            } 
                        }
                        separator="," />
                    </div>
                    
                    <Button 
                        label="Register Foundation" 
                        onClick={()=> {
                          addFoundation()}} />
                  </div>
        );
      }
    } else {
      return (
        <Button label="Connect your wallet" onClick={connectWallet}/>
      );
    }
  };

  

  /*
    renderButton: Returns a button based on the state of the dapp
  */
  const renderRegisterProject = () => {
    if (walletConnected) {
      if (foundationName && !loading) {
        return (
          <div className="">
            <div>
              <div className="p-inputgroup">
                <InputText 
                  placeholder="Project name" 
                  onChange={(e) => {
                    let name = {name: e.target.value};
                    setTempProject( tempProject => ({...tempProject, ...name}))
                    }
                  }
                />
              </div>

              <div className="p-inputgroup">
                <InputText 
                  placeholder="Description"
                  onChange={(e) => {
                    let description = {description: e.target.value};
                    setTempProject( tempProject => ({...tempProject, ...description}))
                    }
                  } />
              </div>

              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">Wei</span>
                <InputNumber 
                  placeholder="Goal" 
                  onChange={(e) => {
                    console.log(e.value);
                    let goal = {goal: e.value};
                    setTempProject( tempProject => ({...tempProject, ...goal}))
                    }
                  }
                  />
              </div>
            </div>

              <div>
             
            </div>
            <Button label="Add Project" onClick={addProject} className=""/>
          </div>
        );
      } else if (loading) {
        return <Button label="Loading..." className=""/>;
      }
    } /* else {
      return (
        <Button label="Connect your wallety" onClick={connectWallet} className=""/>
      );
    } */
  };

  const calculateValueBar = (goal, remaining) => {
    let value = Math.floor(100 - (remaining * 100 / goal));
    return value;
  }


  const renderEditWhitdrawButton = (status, id) => {
    if(status == 1 ){
      return <Button label='Withdraw' onClick={() => {withdrawProject(id)}}/>
    }else if(status == 0){
      return (
          <>
            <Button label='Edit'/>
            <Button label='Pause'/>
            <Button label='Refund'/>
          </>)
    }else if(status == 3){
      return (
          <>
            <Button label='Edit'/>
            <Button label='Resume'/>
            <Button label='Refund'/>
          </>)
    }
  }

  /*
    renderButton: Returns a button based on the state of the dapp
  */
    const renderProjects = () => {
      if (walletConnected) {
        return (
          <Accordion className=''>
            {foundationProjects.map((project, index) => (
              
              <AccordionTab header={project["name"]} key={index}>
              {projectStatus[project.status]}
                <p className=""><span>Goal: </span>{utils.formatEther(project.goal)}</p>
                <div className="card">
                <ProgressBar className="h-1rem" value={calculateValueBar(utils.formatEther(project.goal), utils.formatEther(project.remainingAmount))}></ProgressBar>
                </div>
                <p className=""><span>Balance: </span>{utils.formatEther(project.balance)}</p>
                <p className=""><span>Remaining: </span>{utils.formatEther(project.remainingAmount)}</p>
  
                {renderEditWhitdrawButton(project.status, index)}
              </AccordionTab>
            ))}
          </Accordion>
        );
      }
    };


  // In this case, whenever the value of `walletConnected` changes - this effect will be called
  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "Amoy",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      //connectWallet();
      console.log("asdfasdf")

    }else if(walletConnected){
      getFoundationName();
  }
  }, [walletConnected, currentAccount]);


  return (
    <div>
       <div>
        {address && (
          <div className="grid">
            <div>
              <p className="mb-1">Network:</p>
              <p>Amoy</p>
            </div>
            <div>
              <p className="mb-1">Address:</p>
              <p>{address}</p>
            </div>
          </div>
        )}
      </div>
      <main className="flex flex-column align-items-center">
        <div className=" w-6">
          <h1 className="">{walletConnected ? (!foundationName && "Address Doesn't have a Foundation, please register one.") : "Please connect your wallet first"}</h1>
          {renderRegisterFoundation()}
          {foundationName && renderRegisterProject()}
          <div className="">
            {renderProjects()}
          </div>
        </div>
      </main>
        
    </div>
  );
}
