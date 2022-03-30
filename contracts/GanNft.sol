//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract GanNft is ERC721Enumerable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    mapping (uint256 => string) TokenURIs;
    mapping (uint256 => address) Addresses;

    event MintRequest();

    constructor() ERC721('GAN NFT', 'GNFT') {
        console.log('contract deployed.');
    }

    function tokenURI(uint _tokenId) public override view returns(string memory){
        return TokenURIs[_tokenId];
    }

    function mintRequest() external {
        uint256 totalMinted = _tokenIds.current();
        Addresses[totalMinted] = msg.sender;
        emit MintRequest();
    }

    function setTokenURI(string memory _tokenURI) external {
        uint256 totalMinted = _tokenIds.current();
        TokenURIs[totalMinted] = _tokenURI;
        address to = Addresses[totalMinted];
        _safeMint(to, totalMinted);
        _tokenIds.increment();
    }

}
