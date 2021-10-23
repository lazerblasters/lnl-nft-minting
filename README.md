# Mint your own basic off chain NFT

## Description

This project teaches you how to mint your own NFT token. Here are some important packages that we will be using:

### [hardhat](https://www.npmjs.com/package/hardhat)

We will be using hardhat to set up our local blockchain environment to run tests on and mint some NFTs locally.

### [@openzeppelin/contracts](https://www.npmjs.com/package/@openzeppelin/contracts)

This package is a collection of [Solidity](https://docs.soliditylang.org/en/v0.8.9/) contracts that help us mint NFTs.

### [ethers](https://www.npmjs.com/package/ethers)

ethers is a typescript friendly package that we will be using to connect to a user's metamask wallet and perform transactions to mint and NFT.

*Note: Make sure to have [Metamask](https://metamask.io/) installed and working.*

## Stack

We will be using [Solidity](https://docs.soliditylang.org/en/v0.8.9/) to write our smart contract, [nextjs](https://nextjs.org/) for some backend needs along with SSR and [reactjs](https://reactjs.org/) on the front end.

## Versions

- npm: 7.10.0
- node: 16.0.0


## Instructions

1. Create a directory `mkdir minting-an-nft`
2. run `npm init -y`
3. run `npx hardhat install`

Select `Create a basic sample project` and say `Yes` to everything. Your console output would look something like this:

![npx-hardhat-install](./assets/npx-hardhat-install.png)

4. Test hardhat installation by running `npx hardhat run ./scripts/sample-script.js`

You should see `Hello Hardhat` printed in your console along with other things:

![npx-hardhat-test](./assets/npx-hardhat-test.png)