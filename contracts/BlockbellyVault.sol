//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract BlockbellyBrokerVault is Ownable {
    struct InvestorDetails {
        address owner;
        string brokerName;
        address brokerIndexAddress;
        uint256 monthlyContrib;
        uint256 totalInvested;
        uint256 currentBalance;
    }

    struct InvestorFinances {
        address token;
        uint256 balance;
    }

    mapping(string => InvestorDetails) registry;
    mapping(address => InvestorFinances) investorBalance;
    // mapping(address => SIPDetails) sipPool;
}