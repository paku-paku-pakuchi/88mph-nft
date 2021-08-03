import hre from 'hardhat'
import { ethers } from 'hardhat'
import { NFTDescriptor, NFTV2 } from '../typechain'

const main = async () => {
    const [owner] = await hre.ethers.getSigners()
    const deploy = async () => {
        const NFTDescriptorLibraryFactory = await ethers.getContractFactory('NFTDescriptor')
        const nftDescriptorLibrary = (await NFTDescriptorLibraryFactory.deploy()) as NFTDescriptor

        const NFTV2Factory = await ethers.getContractFactory('NFTV2', {
            signer: owner,
            libraries: {
                NFTDescriptor: nftDescriptorLibrary.address,
            },
        })
        return (await NFTV2Factory.deploy()) as NFTV2
    }
    const nft: NFTV2 = await deploy()

    console.log('nft.address :>> ', nft.address)

    // ----- initialize -----
    await nft.initialize('88mph MockToken Bond', '88mph-MOCKTKN-BOND')
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
