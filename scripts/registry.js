async function main () {
    // We get the contract to deploy
    const Registry = await ethers.getContractFactory('BlockbellyComponentRegistry');
    const registry = await Registry.attach('0x20A2aca22cEC1A6f495e5964BC193800b91c1cB8');
    const registerd = await registry.registerBroker("uniswap", "0x3e0AAEB43E09F4a80b25bc17927317FC32a1c763", 3);
    const details = await registry.getComponentDetails("uniswap");
    
    const UniswapBroker = await ethers.getContractFactory('BlockbellyUniswapBroker');
    const broker = await UniswapBroker.attach('0x3e0AAEB43E09F4a80b25bc17927317FC32a1c763');
    const initializeUniswapBroker = await broker.initialize("0xE592427A0AEce92De3Edee1F18E0157C05861564",3);
    const indices = await broker.getIndices();

    const added = await broker.addIndex("RAI Reflex Index", "RAI", "rai", "0x76b06a2f6dF6f0514e7BEC52a9AfB3f603b477CD", "0x5D732E21FA371F7f07c3e2D3a4314dED1559A02b", 3000, "0x4ad7B025127e89263242aB68F0f9c4E5C033B489", true)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });


