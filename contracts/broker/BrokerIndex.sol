//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

struct BrokerIndex {
    string name;
    string symbol;
    string cgId;
    address tkOutAddr;
    address tkInAddr;
    uint24 poolFee;
    address prOracleAddr;
    bool invOraclePrice;
}