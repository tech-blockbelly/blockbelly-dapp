// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../broker/BrokerIndex.sol";

interface IBroker {
    function initialize(
        address _swapAddress,
        uint16 _version
    )
        external
        returns (
            address brokerAddress
        );

    function getIndices()
        external
        view
        returns (
            BrokerIndex[] memory indices
        );

    function buyIndex(address _tokenOutAddress, uint256 _exactAmountIn, uint256 _deadline)
        external
        returns (
            uint256 amountOut,
            uint256 platformFee
        );

    function addIndex(
        string calldata _name,
        string calldata _symbol,
        string calldata  _cgId,
        address _tkOutAddr,
        address _tkInAddr,
        uint256 _poolFee,
        address _prOracleAddr,
        bool _invOraclePrice
    )
        external
        returns (
            address brokerIndexAddr
        );
}