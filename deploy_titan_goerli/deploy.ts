import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    console.log('deployL2 hre.network.config.chainId', hre.network.config.chainId)
    console.log('deployL2 hre.network.name', hre.network.name)

    const { deployer } = await hre.getNamedAccounts();
    const { deploy } = hre.deployments;
    console.log('deployer', deployer)

    //==== UniswapV3Factory =================================

    const UniswapV3Factory = await deploy("UniswapV3Factory", {
        from: deployer,
        args: [
        ],
        log: true,
        deterministicDeployment: true,
    });
    console.log('UniswapV3Factory', UniswapV3Factory.address)

    //==== verify =================================

    // if (hre.network.name != "hardhat") {
    //     await hre.run("etherscan-verify", {
    //         network: hre.network.name
    //     });
    // }

};

export default deployContract;
deployContract.tags = [
    'deployContract'
];