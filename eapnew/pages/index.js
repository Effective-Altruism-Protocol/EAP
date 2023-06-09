import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { Button } from "primereact/button";
import { Image } from 'primereact/image';

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
  
  useEffect(() => {}, []);

  // Render the contents of the appropriate tab based on `selectedTab`
  function renderTabs() {
    if (selectedTab === "I Want to Contribute") {
      return;
    } else if (selectedTab === "I´m a Foundation") {
      return;
    }
    return null;
  }

  return (
    <div>
      <div className="grid grid-nogutter surface-0 text-800">
        <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
          <section>
            <span className="block text-6xl font-bold mb-1">
            DECENTRALIZING PHILANTROPY
            </span>
            <div className="text-6xl text-primary font-bold mb-3">
              Making It Posible!
            </div>
            <p className="mt-0 mb-4 text-700 line-height-3">
            A set of WEB3 tools that aims to change the way donors and organizations interact. It increases transparency for organizations and gives donors more decision-making power, as well as rewards them for their actions.
            </p>
            <Link href="/contribute">
              <Button
                label="I want to contribute"
                type="button"
                className="mr-3 p-button-raised"
              />
            </Link>
          
            <Link href="/foundation">
              <Button
                label="I´m a Foundation"
                type="button"
                className="mr-3 p-button-outlined"
              />
            </Link>
            {/* <Link href="/documentation">
              <Button
                label="Get Started"
                type="button"
                className="p-button-outlined"
              />
            </Link> */}
          </section>
        </div>
        <div className="col-12 md:col-6 lg:col-6 overflow-hidden flex">
          <Image
            src="/crypto-effective-altruism.png"
            alt="hero-1"
            className="md:ml-auto lg:h-full md:max-w-max block lg:block"
            style={{ clipPath: "polygon(8% 0, 100% 0%, 100% 100%, 0 100%)" }}
          />
        </div>
      </div>
    </div>
  );
}
