import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import 'hardhat-typechain'

import dotenv from "dotenv" ;
import { HardhatUserConfig } from "hardhat/types";
import "hardhat-deploy";

dotenv.config();

const config: HardhatUserConfig = {
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    hardhat: {
    },
    titangoerli: {
      url: 'https://goerli.optimism.tokamak.network',
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 5050,
      gasPrice: 250000,
      deploy: ['deploy_titan_goerli']
    },
    titan: {
      url: 'https://rpc.titan.tokamak.network',
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 55004,
      gasPrice: 250000,
      deploy: ['deploy_titan']
    },
  },
  deterministicDeployment: (network: string) => {
    // Skip on hardhat's local network.
    if (network === "31337") {
        return undefined;
    } else {
      return {
        factory: "0x4e59b44847b379578588920ca78fbf26c0b4956c",
        deployer: "0x3fab184622dc19b6109349b94811493bf2a45362",
        funding: "10000000000000000",
        signedTx: "0x00",
      }
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    // apiKey: `${process.env.ETHERSCAN_API_KEY}`
    apiKey: {
      goerli: `${process.env.ETHERSCAN_API_KEY}`,
      titangoerli: "abc",
      titan: "verify"
    } ,
    customChains: [
      {
        network: "titangoerli",
        chainId: 5050,
        urls: {
          apiURL: "https://goerli.explorer.tokamak.network/api",
          browserURL: "https://goerli.explorer.tokamak.network"
        }
      },
      {
        network: "titan",
        chainId: 55004,
        urls: {
          apiURL: "https://explorer.titan.tokamak.network/api",
          browserURL: "https://explorer.titan.tokamak.network"
        }
      }
    ]
  },
  solidity: {
    version: '0.8.12',
    settings: {
      optimizer: {
        enabled: true,
        runs: 625,
      },
      metadata: {
        // do not include the metadata hash, since this is machine dependent
        // and we want all generated code to be deterministic
        // https://docs.soliditylang.org/en/v0.8.12/metadata.html
        bytecodeHash: 'none',
      },
    },
  },
};

export default config;

