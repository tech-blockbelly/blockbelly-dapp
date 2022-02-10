async function main () {
    // We get the contract to deploy
    const Registry = await ethers.getContractFactory('BlockbellyBrokerRegistry');
    const registry = await Registry.attach('0x20A2aca22cEC1A6f495e5964BC193800b91c1cB8');
    const registerd = await registry.registerBroker("uniswap", "0xEFf9E55Bc6A4EeAEF590f2De58F918828831C442", 1)
    const details = await registry.getBrokerDetails("uniswap")
    console.log('Contract deployed to:', details.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });


