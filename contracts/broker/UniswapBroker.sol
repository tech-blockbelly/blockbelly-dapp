//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
// import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "./AbstractBroker.sol";

interface IUniswapRouter is ISwapRouter {
    function refundETH() external payable;
}

contract BlockbellyUniswapBroker is BlockbellyBroker {
    // ISwapRouter private constant swapRouter = IUniswapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
    BrokerIndex[] private brokerIndices;
    mapping(address => bool) private indexExists;
    mapping(address => uint256) private indexPosition;

    IUniswapRouter private swapRouter;
    uint private version;


    // Chainlink
    // function getCurrentPrice(address priceOracleAddress) private view returns (int) {
    //     AggregatorV3Interface priceFeed = AggregatorV3Interface(priceOracleAddress);
    //     (
    //         uint80 roundID,
    //         int price,
    //         uint startedAt,
    //         uint timeStamp,
    //         uint80 answeredInRound
    //     ) = priceFeed.latestRoundData();
    //     return price;
    // }

    /// @notice swapExactInputSingle swaps a fixed amount of DAI for a maximum possible amount of WETH9
    /// using the DAI/WETH9 0.3% pool by calling `exactInputSingle` in the swap router.
    /// @dev The calling address must approve this contract to spend at least `amountIn` worth of its DAI for this function to succeed.
    /// @param _amountIn The exact amount of DAI that will be swapped for WETH9.
    /// @return amountOut The amount of WETH9 received.
    function swapExactInputSingle(
        BrokerIndex memory _index,
        uint256 _amountIn,
        address _recipient,
        uint256 _deadline
    )
        private 
        returns (
            uint256 amountOut
        )
    {
        // Transfer the specified amount of tokenIn to this contract.
        // TransferHelper.safeTransferFrom(_index.tkInAddr, _recipient, address(this), _amountIn);

        // Approve the router to spend tokenIn.
        // TransferHelper.safeApprove(_index.tkInAddr, address(swapRouter), _amountIn);


        // Get amountOutMinimum from Price Oracle
        // int amountOutMinimum = getCurrentPrice(_index.prOracleAddr);

        // if (_index.invOraclePrice) {
        //     amountOutMinimum = 1 / amountOutMinimum;
        // }

        // We also set the sqrtPriceLimitx96 to be 0 to ensure we swap our exact input amount.
        ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: _index.tkInAddr,
                tokenOut: _index.tkOutAddr,
                fee: _index.poolFee,
                recipient: _recipient,
                deadline: block.timestamp + _deadline,
                amountIn: _amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        // The call to `exactInputSingle` executes the swap.
        amountOut = swapRouter.exactInputSingle{ value: _amountIn }(params);
        // amountOut = swapRouter.exactInputSingle(params);
        // platformFee = uint256(amountOutMinimum);
        swapRouter.refundETH();
    }

    function initialize(
        address _swapAddress,
        uint16 _version
    ) 
        public
        onlyOwner
        override
        returns (address brokerAddress)
    {
        swapRouter = IUniswapRouter(_swapAddress);
        version = _version;

        brokerAddress = address(this);
    }

    function getIndices() public view override returns (BrokerIndex[] memory indices) {
        indices = brokerIndices;
    }

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
        public
        onlyOwner
        override
        returns (address brokerIndexAddr)
    {
        // initialize an empty struct and then update it
        BrokerIndex memory index;

        index.name = _name;
        index.symbol = _symbol;
        index.cgId = _cgId;
        index.tkOutAddr = _tkOutAddr;
        index.tkInAddr = _tkInAddr;
        index.poolFee = _poolFee;
        index.prOracleAddr = _prOracleAddr;
        index.invOraclePrice = _invOraclePrice;

        require(!indexExists[_tkOutAddr], "Index already exists");

        // Set return value
        brokerIndexAddr = _tkOutAddr;

        indexExists[_tkOutAddr] = true;
        brokerIndices.push(index);
        indexPosition[_tkOutAddr] = brokerIndices.length - 1;
    }

    function buyIndexWithETH(address _tokenOutAddress, uint256 _deadline)
        public
        override
        payable
        returns (
            uint256 amountOut,
            uint256 platformFee
        ) 
    {
        require(indexExists[_tokenOutAddress], "Index does not exists");
        require(msg.value > 0, "Pass in non-0 input amount ETH");
        require(_deadline > 0, "Pass in non-0 deadline");

        uint256 position = indexPosition[_tokenOutAddress];
        BrokerIndex memory index = brokerIndices[position];

        ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: index.tkInAddr,
                tokenOut: index.tkOutAddr,
                fee: index.poolFee,
                recipient: msg.sender,
                deadline: block.timestamp + _deadline,
                amountIn: msg.value,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        // The call to `exactInputSingle` executes the swap.
        amountOut = swapRouter.exactInputSingle{ value: msg.value }(params);
        // amountOut = swapRouter.exactInputSingle(params);
        platformFee = 0;
        swapRouter.refundETH();
        // refund leftover ETH to user
        (bool success,) = msg.sender.call{ value: address(this).balance }("");
        require(success, "refund failed");
    }

    receive() external payable override {}
}
