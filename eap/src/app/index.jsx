import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";

import Link from 'next/link';
import { Button } from 'primereact/button';

import "primereact/resources/themes/mdc-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";


export default function Home() {
  // ETH Balance of the DAO contract
  const [treasuryBalance, setTreasuryBalance] = useState("0");
  // Number of proposals created in the DAO
  const [numProposals, setNumProposals] = useState("0");
  // Array of all proposals created in the DAO
  const [proposals, setProposals] = useState([]);
  // User's balance of CryptoDevs NFTs
  const [nftBalance, setNftBalance] = useState(0);
  // Fake NFT Token ID to purchase. Used when creating a proposal.
  const [fakeNftTokenId, setFakeNftTokenId] = useState("");
  // One of "Create Proposal" or "View Proposals"
  const [selectedTab, setSelectedTab] = useState("");
  // True if waiting for a transaction to be mined, false otherwise.
  const [loading, setLoading] = useState(false);
  // True if user has connected their wallet, false otherwise
  const [walletConnected, setWalletConnected] = useState(false);
  // isOwner gets the owner of the contract through the signed address
  const [isOwner, setIsOwner] = useState(false);
  const web3ModalRef = useRef();

  
  
    
  // piece of code that runs everytime the value of `walletConnected` changes
  // so when a wallet connects or disconnects
  // Prompts user to connect wallet if not connected
  // and then calls helper functions to fetch the
  // DAO Treasury Balance, User NFT Balance, and Number of Proposals in the DAO
  useEffect(() => {
   
  }, []);

  // Render the contents of the appropriate tab based on `selectedTab`
  function renderTabs() {
    if (selectedTab === "I Want to Contribute") {
      return ;
    } else if (selectedTab === "I´m a Foundation") {
      return ;
    }
    return null;
  }

 

  

  return (
    <div>
      <Head>
        <title>EAP</title>
        <meta name="description" content="Effective Altruism Protocol" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to Effective Altruism Protocol!</h1>
          <div className={styles.description}>Making Altruism Posible!</div>
          <div className={styles.description}>
            {/* Your CryptoDevs NFT Balance: {nftBalance} */}
            <br />
           {/*  //Treasury Balance: {formatEther(treasuryBalance)} ETH */}
            <br />
            {/* //Total Number of Proposals: {numProposals} */}
          </div>
          <div className="card flex flex-wrap justify-content-center gap-3">
            <Link href="/contribute">
              <Button
                label="I Want to Contribute" 
              /> 
            </Link>
            <Link href="/foundation">
              <Button
                label="I´m a Foundation"
              />
            </Link>
          </div>
          
        </div>
        <div>
          <img className={styles.image} src="/logo-eap.png" />
        </div>
      </div>

      <footer className={styles.footer}>
        Made with &#10084; by EAP Team
      </footer>
    </div>
  );
}