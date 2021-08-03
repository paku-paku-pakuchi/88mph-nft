import 'dotenv/config'
import { HardhatUserConfig } from 'hardhat/config'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-ethers'
import 'hardhat-typechain'
import 'hardhat-deploy'
import 'hardhat-etherscan-abi'
import 'hardhat-dependency-compiler'

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
const ROPSTEN_ALCHEMY_API_KEY = process.env.ROPSTEN_ALCHEMY_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const BLOCK_NUMBER = process.env.BLOCK_NUMBER
const MNEMONIC = process.env.MNEMONIC

const LOWEST_OPTIMIZER_COMPILER_SETTINGS = {
    version: '0.8.3',
    settings: {
        optimizer: {
            enabled: true,
            runs: 1_000,
        },
        metadata: {
            bytecodeHash: 'none',
        },
    },
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
    defaultNetwork: 'hardhat', //rinkeby
    networks: {
        localhost: {
            url: 'http://127.0.0.1:8545',
        },
        hardhat: {
            chainId: 1,
            forking: {
                url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
                blockNumber: parseInt(BLOCK_NUMBER),
                enabled: true,
            },
        },
        ropsten: {
            url: `https://eth-ropsten.alchemyapi.io/v2/${ROPSTEN_ALCHEMY_API_KEY}`,
            accounts: {
                mnemonic: MNEMONIC,
            },
        },
    },
    dependencyCompiler: {
        paths: [],
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    solidity: {
        compilers: [
            {
                version: '0.7.6',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: '0.8.3',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
        overrides: {
            'contracts/test/NFTDescriptorTest.sol': LOWEST_OPTIMIZER_COMPILER_SETTINGS,
            'contracts/libraries/NFTDescriptor.sol': LOWEST_OPTIMIZER_COMPILER_SETTINGS,
        },
    },
    paths: {
        sources: './contracts',
        tests: './test',
        cache: './cache',
        artifacts: './artifacts',
    },
}

export default config
