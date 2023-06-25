// contracts/OceanToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract OceanToken is ERC20Capped {
    address payable public owner;
    uint256 public blockReward;


    constructor(uint256 cap, uint256 reward) ERC20("OceanToken", "OCT") ERC20Capped(cap * 10 ** decimals()) {
        owner = payable(msg.sender);

        uint256 _ownerTokens = 70000000;

        blockReward = reward * 10 ** decimals();
        _mint(owner, _ownerTokens * 10 ** decimals());
    }

    function _mintMinerReward () internal {
        _mint(block.coinbase, blockReward);
    }


    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override{
        if(from != address(0) && block.coinbase != address(0) && to != block.coinbase ){
            _mintMinerReward();
        }

        super._beforeTokenTransfer(from, to, amount);
    } 

    function setMinerReward (uint256 reward) public onlyOwner {
        blockReward = reward * 10 ** decimals();
    } 


    function destroyContract () public onlyOwner{
        selfdestruct(payable(owner));
    }

    modifier onlyOwner {
      require(msg.sender == owner, "Only the owner can call this function");
      _;
   }


}