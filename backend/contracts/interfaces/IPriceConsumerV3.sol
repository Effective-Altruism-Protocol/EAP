// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IPriceConsumerV3 {
    function getLatestPriceETHinUSD() external view returns (int);

    function getDecimals() external view returns (uint8);
}