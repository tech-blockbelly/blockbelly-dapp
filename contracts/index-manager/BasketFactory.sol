// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./BasketToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BasketFactory is Ownable {
    address[] public baskets;
    mapping(address => bool) basketExists;

    function create(
        address[] memory _components,
        uint256[] memory _units,
        address buyToken,
        uint256 rate,
        address _manager,
        string memory _name,
        string memory _symbol
    )
        external
        onlyOwner
        returns (address)
    {
        require(_components.length > 0, "Must have at least 1 component");
        require(_components.length == _units.length, "Component and unit lengths must be the same");
        require(_manager != address(0), "Manager must not be empty");

        for (uint256 i = 0; i < _components.length; i++) {
            require(_components[i] != address(0), "Component must not be null address");
            require(_units[i] > 0, "Units must be greater than 0");
        }

        BasketToken bToken = new BasketToken(
            _components,
            _units,
            _manager,
            _name,
            _symbol
        );

        address bTokenAddress = address(bToken);

        require(!basketExists[bTokenAddress], "Basket already exists");
        basketExists[bTokenAddress] = true;
        baskets.push(bTokenAddress);

        return bTokenAddress;
    }
    
    // Rebalance / burn and create new token
    // Explore 1155 for token rebalance
    // function rebalance() public onlyOwner {}
    
    // Rate, tranfer ownership, logo?
    // function updateMetadata() {}

    // Add maintenance mode 

}

// ["0xd75e4919c62685c6f3EC3c674Cb7D1B7633A18CC","0xbD3E17f1Df60aAFb8eD5d931a5412BA67a2305dC","0x1343A33d5510e95B87166433BCDDd5DbEe8B4D8A","0x40052c3ea10829ca242C0EC6576c9ecc7976248f"]
// [25,25,25,25]
// 0x52260e88F5D1bDa7f2eC91c5A1b1335B738451ff
// 0x5D732E21FA371F7f07c3e2D3a4314dED1559A02b
// "VC Favourite Test"
// VCFT