//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract BlockbellyComponentRegistry is Ownable {
    struct ComponentDetails {
        address owner;
        address contractAddress;
        uint16 version;
    }

    mapping(string => ComponentDetails) registry;

    function registerComponent(string memory _name, address _addr, uint16 _version) external onlyOwner returns (bool) {
        require(_version >= 1);
        
        ComponentDetails memory info = registry[_name];

        // create info if it doesn't exist in the registry
        if (info.contractAddress == address(0)) {
            info = ComponentDetails({
                owner: msg.sender,
                contractAddress: _addr,
                version: _version
            });
        } else {
            info.version = _version;
            info.contractAddress = _addr;
        }

        // update record in the registry
        registry[_name] = info;
        return true;
    }

    function getComponentDetails(string memory _name) external view returns(address, uint16) {
        return (registry[_name].contractAddress, registry[_name].version);
    }
}