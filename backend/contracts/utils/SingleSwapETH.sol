// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract SingleSwap {
  address internal constant UNISWAP_ROUTER_ADDRESS = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D; //goerli
  //address internal constant UNISWAP_ROUTER_ADDRESS = 0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45;

  IUniswapV2Router02 public uniswapRouter;
  address private USDTToken = 0xC2C527C0CACF457746Bd31B2a698Fe89de2b6d49; //goerli

  constructor() {
    uniswapRouter = IUniswapV2Router02(UNISWAP_ROUTER_ADDRESS);
  }

  function convertEthToUSDT(uint _usdtAmount) public payable {
    uint deadline = block.timestamp + 15; // using 'now' for convenience, for mainnet pass deadline from frontend!
    uniswapRouter.swapETHForExactTokens{ value: msg.value }(_usdtAmount, getPathForETHtoUSDT(),  msg.sender, deadline);
    
    // refund leftover ETH to user
    (bool success,) = msg.sender.call{ value: address(this).balance }("");
    require(success, "refund failed");
  }
  
  function getEstimatedETHforUSDT(uint _usdtAmount) public view returns (uint[] memory) {
    return uniswapRouter.getAmountsIn(_usdtAmount, getPathForETHtoUSDT());
  }

  function getPathForETHtoUSDT() private view returns (address[] memory) {
    address[] memory path = new address[](2);
    path[0] = uniswapRouter.WETH();
    path[1] = USDTToken;
    
    return path;
  }
  
  // important to receive ETH
  receive() payable external {}
}