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
    State variable tokenCount is used as unique identifier to generate unique number
    of tokens.

    In JS we do
    const tokenCount = 0;

    In Solidity we do:
    uint256 public tokenCount = 0;

    uint256 is data type. Check: https://docs.soliditylang.org/en/v0.8.7/types.html#types for more data types
    public is a access classifier, Check https://docs.soliditylang.org/en/v0.4.24/contracts.html#visibility-and-getters for more access classifiers
    */
    uint256 public tokenCount = 0;

    /*
    State variable _baseTokenURI is used as unique identifier to generate unique number
    of tokens.

    In JS we do
    const baseTokenURI;

    In Solidity we do:
    string private _baseTokenURI;

    string is data type. Check: https://docs.soliditylang.org/en/v0.8.7/types.html#types for more data types
    private is a access classifier, Check https://docs.soliditylang.org/en/v0.4.24/contracts.html#visibility-and-getters for more access classifiers

    Note: Uninitialized variables like this one should be initialied in the constructor to avoid unexpected errors.
    */
    string private _baseTokenURI;

    /*
    Since our contract inherits ERC721URIStorage contract, we have to initialize it.

    In JS we do:
    constructor(baseTokenURI) {
        super("SquareNFT", "SQUARE");
        baseTokenURI = baseTokenURI;
    }

    In Solidity we do:
    constructor(string memory baseTokenURI) ERC721 ("SquareNFT", "SQUARE") {
        _baseTokenURI = baseTokenURI;
    }

    This constructor will get called when we deploy this contract to the blockchain network.
    The deploy script will pass baseTokenURI to this contract, that way we can have dynamic
    uri: https:localhost:3000/api/tokens for local testing and https://somedomain.com/api/tokens
    for production.
    */
    constructor(string memory baseTokenURI) ERC721 ("SquareNFT", "SQUARE") {
        _baseTokenURI = baseTokenURI;
        console.log("This is my NFT contract. Woah!");
    }

    /*
    Solidity functions look very much like javascript functions, aside from access classifiers
    that get added at the end of the function.

    In JS we do: 
    function mintBasicNFT() {}

    Similaryly, in Solidity we do:
    function mintBasicNFT() public {}

    setting this function access classifier will allow our frontend to trigger this function.
    */
    function mintBasicNFT() public {
        // Increment tokenCount
        tokenCount++;
        // Local variable tokenId
        uint256 tokenId = tokenCount;
        /*
        Local variable handler is concatinating _baseTokenURI (https://localhost:3000/api/tokens/)
        with tokenId (1,2,3...) and creating string like https://localhost:3000/api/tokens/1.

        In JS we do: 
        const handler = `${_baseTokenURI}${tokenId}`;

        In Solidity we do: 
        string memory handler = string(abi.encodePacked(_baseTokenURI, Strings.toString(tokenId)));

        1. unlike uint256, string needs data location like memory.
        Check: https://docs.soliditylang.org/en/v0.8.7/types.html#data-location

        2. abi.encodePacked takes in many arguments and returns bytes data type that needs to be
        casted into string using string(). 
        Check: https://docs.soliditylang.org/en/v0.8.7/cheatsheet.html?highlight=encodepacked#global-variables

        3. tokenId is a uint256 data type, is needs to be converted to string using Strings.toString(tokenId)
        */
        string memory handler = string(abi.encodePacked(_baseTokenURI, Strings.toString(tokenId)));

        /*
        _safeMint(address to, uint256 tokenId, bytes _data)
        Internal function to safely mint a new token. Reverts if the given token ID already exists.
        Check: https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#ERC721-_safeMint-address-uint256-

        msg.sender is a global variable available to us. It returns an address type.
        Check: https://docs.soliditylang.org/en/v0.8.7/cheatsheet.html?highlight=encodepacked#global-variables
        */
        _safeMint(msg.sender, tokenId);

        /*
        _setTokenURI(uint256 tokenId, string _tokenURI)
        Internal function to set the token URI for a given token.
        Check: https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#ERC721Metadata-_setTokenURI-uint256-string-
        */
        _setTokenURI(tokenId, handler);

        console.log("Minted NFT#", tokenId);
    }
}
