/*
Since your contract code will be publicly available, this line
will let the readers know if you are cool with letting them use
your code. I have seen UNLICENSED and MIT so far.
*/
// SPDX-License-Identifier: UNLICENSED

/*
This line is important to let solidity know which version of the
language would this contract run on.
*/
pragma solidity ^0.8.0;

/*
Importing ERC721URIStorage contract from openzeppelin contracts collection.
This contract will allow us to use helpers like _safeMint and _setTokenURI.
*/
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
/*
importing hardhat/console.sol will allow console.log to appear in the console.
If this import is not present, hardhat will omit all console logs.
*/
import "hardhat/console.sol";

/*
I named this contract MintingContract, however, this can be named anything.
This contract will enherit ERC721URIStorage

In JS we do: 
class MintingContract extends ERC721URIStorage 

Similaryly, in Solidity we do:
contract MintingContract is ERC721URIStorage
*/
contract MintingContract is ERC721URIStorage {
    /*
    Since our contract inherits ERC721URIStorage contract, we have to initialize it.

    In JS we do:
    constructor() {
        super("SquareNFT", "SQUARE");
    }

    Similaryly, in Solodity we do:
    constructor() ERC721 ("SquareNFT", "SQUARE") {}

    This constructor will get called when we deploy this contract to the blockchain network.
    */
    constructor() ERC721 ("SquareNFT", "SQUARE") {
        console.log("This is my NFT contract. Woah!");
    }
}
