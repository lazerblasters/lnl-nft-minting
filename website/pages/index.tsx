/**
 * Import ethers package and destructure ethers object
 */
import { ethers } from "ethers";
import type { NextPage } from "next";
import Head from "next/head";
import { useState, useCallback, useEffect } from "react";

import styles from "../styles/Home.module.css";
import MintingContract from "../MintingContract.json";

/**
 * CONTRACT_ADDRESS comes from deploy.js console log when we deployed
 * our minting contract.
 *
 * MintingContract.json comes from artifacts folder that was generated
 * by hardhat when we ran deploy js. We use the abi key from this json
 * file to make requests against our contrac.
 */
const CONTRACT_ADDRESS = "0xFE1b925ca867d9f83d059551f0C5A5a25f9Cd0E7";
const abi = MintingContract.abi;

const Home: NextPage = () => {
  /**
   * currentAccount state is a string value which is used to check if
   * MetaMask wallet is connected or not. We can only work with our contract
   * with a connected wallet.
   */
  const [currentAccount, setCurrentAccount] = useState<string>("");
  /**
   * isLoading state is used to show a loading state and disable minting button
   */
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<string[]>(["Initialized"]);
  const handleAddComment = useCallback((comment: string, ...args: any[]) => {
    console.log(comment, args);
    setComments((prevState) => [...prevState, comment]);
  }, []);

  /**
   * An abstracted function to get ethereum object from global
   * variables or throw an error if object is null.
   * 
   * @returns {Ethereum Object | undefined}
   */
  const getEthereumObject = useCallback(() => {
    /**
     * MetaMask injects as window.ethereum into each page
     *
     * Check: https://docs.metamask.io/guide/#account-management
     */
    const { ethereum } = window as any;

    if (!ethereum) {
      handleAddComment("Ethereum object doesn't exist!");
      throw new Error("Ethereum object doesn't exist!");
    } else {
      return ethereum;
    }
  }, []);

  /**
   * An abstracted function to connect to the contract by converting
   * ethereum object into Web3Provider.
   */
  const connectToContract = useCallback(() => {
    const ethereum = getEthereumObject();
    handleAddComment("Connecting to contract...");
    /**
     * MetaMask injects a Web3 Provider as "web3.currentProvider", so
     * we can wrap it up in the ethers.js Web3Provider, which wraps a
     * Web3 Provider and exposes the ethers.js Provider API.
     *
     * Check: https://docs.ethers.io/v5/api/providers/other/#Web3Provider
     */
    const provider = new ethers.providers.Web3Provider(ethereum);
    /**
     * There is only ever up to one account in MetaMask exposed
     */
    const signer = provider.getSigner();
    /**
     * Instantiating a contract object to return the functin caller.
     * Contract constructor takes in (address , abi, signerOrProvider).
     * Once instantiated, we can call our MintingContract public functions
     * 
     * Check: https://docs.ethers.io/v5/single-page/#/v5/api/contract/contract/
     */
    return new ethers.Contract(CONTRACT_ADDRESS, abi, signer as any);
  }, []);

  /**
   * mintBasicNFT function will make a request to our smart contract to mint an NFT
   *
   * @returns {Promise<void>}
   */
  const mintBasicNFT = async () => {
    setIsLoading(true);
    try {
      handleAddComment("Connecting to contract...");
      const connectedContract = connectToContract();

      handleAddComment("Going to pop wallet now to pay gas...");
      /**
       * Calling our MintingContract mintBasicNFT public function
       */
      let nftTxn = await connectedContract.mintBasicNFT();

      handleAddComment("Mining...please wait.");
      /**
       * Waiting for transaction to be mined
       */
      await nftTxn.wait();

      /**
       * nftTxn.hash is transaction id that we can use to create etherscan link
       */
      handleAddComment(
        `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
      );
      /**
       * Getting token count from our smart contract to generate OpenSea link
       */
      const count = await getTokenCount();
      handleAddComment(
        `OpenSea link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${count}`
      );
    } catch (error) {
      console.log(error);
      handleAddComment(`Failed to mint`, error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * connectWallet function will be called on mount to trigger MetaMask wallet
   * pop up to connect to our DAPP.
   *
   * @returns {Promise<void>}
   */
  const connectWallet = useCallback(async () => {
    handleAddComment(`Connecting to Metamask...`);
    try {
      const ethereum = getEthereumObject();

      /**
       * Requesting MetaMask to connect the wallet to our DAPP. ethereum.request
       * function is injected into each page by MetaMask.
       *
       * Check: https://docs.metamask.io/guide/rpc-api.html#permissions
       */
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      handleAddComment(`Connected to ${accounts[0]}`);
      /**
       * Setting current account state
       */
      setCurrentAccount(accounts[0]);
      /**
       * Getting token count from our smart contract
       */
      getTokenCount();
    } catch (error) {
      handleAddComment(`Failed to connect to Metamask`, error);
    }
  }, []);

  /**
   * getTokenCount function will make a request to our smart contract to return current
   * NFT count. We will use this to show users how many NFTs have been generated using
   * out DAPP. Also, we will use this function to create opensea link.
   *
   * @returns {Promise<number>}
   */
  const getTokenCount = useCallback(async () => {
    try {
      const connectedContract = connectToContract();
      handleAddComment(`Getting NFT count...`);

      /**
       * tokenCount is our contract's public state variable
       * We have to call it as a function to access it's value.
       */
      const count = await connectedContract.tokenCount();
      handleAddComment(`Minted NFTs total: ${count.toNumber()}`);

      /**
       * uint256 will be returned to us as a BigNumber, we can
       * convert it to a number by using util toNumber()
       * 
       * Check: https://docs.ethers.io/v5/api/utils/bignumber/#BigNumber--BigNumber--methods--conversion
       */
      return count.toNumber();
    } catch (error) {
      handleAddComment(`Failed to get token count`, error);
      return 0;
    }
  }, []);

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">NFT Minting Example</a>
        </h1>

        <div className={styles.grid}>
          <a className={styles.card} style={{ width: "100%" }}>
            <h2
              onClick={currentAccount && !isLoading ? mintBasicNFT : undefined}
              style={{ backgroundColor: "white", cursor: "pointer" }}
            >
              {currentAccount
                ? isLoading
                  ? "Minting"
                  : "Mint Basic NFT"
                : "Unable to Mint without Metamask"}
            </h2>
            <ul>
              {comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
