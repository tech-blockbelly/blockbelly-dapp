// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract BasketToken is ERC20PresetMinterPauser {
    address public manager;
    address[] public components;

    mapping(address => uint256) public componentContrib;

    constructor(
        address[] memory _components,
        uint256[] memory _units,
        address _manager,
        string memory _name,
        string memory _symbol
    )
        ERC20PresetMinterPauser(_name, _symbol)
    {
        manager = _manager;
        components = _components;
        for (uint256 j = 0; j < _components.length; j++) {
            componentContrib[_components[j]] = _units[j];
        }
    }
}
