const hre = require("hardhat");
// const { ethers } = require("ethers");

// const ethers = hre.ethers;

async function main() {
  const OceanToken = await hre.ethers.getContractFactory("OceanToken");

  const oceanToken = await OceanToken.deploy(100000000, 50);

  // await oceanToken.deployed();

  console.log(oceanToken.target);

  // console.log("Token address:", oceanToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
