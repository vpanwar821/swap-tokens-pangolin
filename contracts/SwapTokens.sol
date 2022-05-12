// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@pangolindex/exchange-contracts/contracts/pangolin-periphery/interfaces/IPangolinRouter.sol";

/**
 * @title SwapTokens
 * @dev swap tokens
 */
contract SwapTokens {
    address public router;

    constructor(address _router) {
        router = _router;
    }

    function swapMyTokens(address tokenA, address tokenB, uint256 amountIn) 
    public
    returns(uint[] memory)
    {
        IERC20(tokenA).approve(router, amountIn);
        uint256 allowedAmount = IERC20(tokenA).allowance(address(this), router);

        address[] memory path = new address[](2);
        path[0] = tokenA;
        path[1] = tokenB; 

        uint[] memory amounts = IPangolinRouter(router).swapExactTokensForTokens(
            allowedAmount,
            0,
            path,
            address(this),
            block.timestamp
        );

        IERC20(tokenB).transferFrom(address(this), msg.sender, amounts[1]);

        return amounts;
    }
    
}
