// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../interfaces/IPriceConsumerV3.sol";


contract ConvertTokens {
    // PriceConsumer contract instance;
    IPriceConsumerV3 PriceConsumer;

    constructor(address PriceConsumerV3) payable {
        PriceConsumer = IPriceConsumerV3(PriceConsumerV3);
    }

    function getPriceETHinUSD() public view returns (int){
        return PriceConsumer.getLatestPriceETHinUSD();
    }

    function convertUSDtoWei(uint256 _usd) public view returns (uint256){
        return (_usd * (10**8)) * (10**18) / uint(getPriceETHinUSD()) ;
    }

    function convertWeitoUSD(uint256 _wei) public view returns (uint256){
        return (_wei * uint(getPriceETHinUSD()) / ((10**8) * (10**18))) + 1;
    }

    function getDecimals() public view returns (uint8){
        return PriceConsumer.getDecimals();
    }
        
}