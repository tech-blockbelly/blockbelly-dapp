//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./BrokerIndex.sol";

abstract contract BlockbellyBroker is Ownable {
    function initialize(address _swapAddress, uint16 _version)
        virtual
        public
        onlyOwner
    returns (address brokerAddress) {}

    function getIndices()
        virtual
        public
        view
    returns (BrokerIndex[] memory indices);

    function addIndex(
        string memory _name,
        string memory _symbol,
        string memory  _cgId,
        address _tkOutAddr,
        address _tkInAddr,
        uint24 _poolFee,
        address _prOracleAddr,
        bool _invOraclePrice
    )
        virtual
        public
        onlyOwner
    returns (address brokerIndexAddr) {}


    function buyIndexWithETH(address _tokenOutAddress, uint256 _deadline)
        virtual
        payable
        public
    returns (
        uint256 amountOut,
        uint256 platformFee
    ) {}

    receive() virtual external payable {}
}
