async function main() {
    // We get the contract to deploy
    const Contract = await ethers.getContractFactory('BlockbellyUniswapBroker');
    console.log('Deploying Contract...');
    const contract = await Contract.deploy();
    await contract.deployed();
    console.log('Contract deployed to:', contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
