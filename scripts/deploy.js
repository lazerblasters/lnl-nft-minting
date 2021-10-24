/**
 * We require the Hardhat Runtime Environment explicitly here. This is optional
 * but useful for running the script in a standalone fashion through `node <script>`.
 * 
 * When running the script with `npx hardhat run <script>` you'll find the Hardhat
 * Runtime Environment's members available in the global scope.
 * 
 * Check: https://hardhat.org/guides/scripts.html#standalone-scripts-using-hardhat-as-a-library
 */
const hre = require("hardhat");

async function main() {
  /**
   *   Hardhat always runs the compile task when running scripts with its command
   *   line interface.
   * 
   *   If this script is run directly using `node` you may want to call compile
   *   manually to make sure everything is compiled
   *   await hre.run('compile');
   * 
   *   We get the contract to deploy
   */
  const contract = await hre.ethers.getContractFactory("MintingContract");
  /**
   * We can pass baseTokenURI string param the MintingContract constructor requires
   * in this deploy function.
   */
  const token = await contract.deploy('https://website-kzspirq6d-ximxim.vercel.app/api/tokens/');

  await token.deployed();

  console.log("Greeter deployed to:", token.address);

  /**
   * we can call our mintBasicNFT public function using token
   * variable. It returns a promise, that we will wait for before
   * minting another basic NFT.
   */
  let txn = await token.mintBasicNFT();
  await txn.wait();

  /**
   * Minting another NFT to test the counter
   */
  txn = await token.mintBasicNFT();
  await txn.wait();
}

/**
 * We recommend this pattern to be able to use async/await everywhere
 * and properly handle errors.
 */
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });