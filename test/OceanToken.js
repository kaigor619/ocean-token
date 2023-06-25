const { expect } = require("chai");

const hre = require("hardhat");

describe("OceanToken contract", function () {
  let Token;
  let oceanToken;
  let owner;
  let addr1;
  let addr2;
  let tokenCap = 100000000;
  let tokenBlockReward = 50;

  beforeEach(async () => {
    Token = await ethers.getContractFactory("OceanToken");
    [owner, addr1, addr2] = await hre.ethers.getSigners();

    oceanToken = await Token.deploy(tokenCap, tokenBlockReward);
  });

  describe("Deployment", () => {
    it("should set the right owner", async () => {
      expect(await oceanToken.owner()).to.equal(owner.address);
    });
    it("should assign the total supply of tokens to the owner", async () => {
      const ownerBalance = await oceanToken.balanceOf(owner.address);
      expect(await oceanToken.totalSupply()).to.equal(ownerBalance);
    });
    it("should set the max capped supply to the argument provided during deployment", async () => {
      const cap = await oceanToken.cap();
      expect(Number(cap)).to.equal(tokenCap * 10 ** 18);
    });
    it("should set the blockReward to the argument provided during deployment", async () => {
      const blockReward = await oceanToken.blockReward();
      expect(Number(blockReward)).to.equal(tokenBlockReward * 10 ** 18);
    });
  });
  describe("Transactions", () => {
    it("should transfer tokens between accounts", async () => {
      await oceanToken.transfer(addr1.address, 50);
      const addr1Balance = await oceanToken.balanceOf(addr1.address);

      expect(addr1Balance).to.equal(50);

      await oceanToken.connect(addr1).transfer(addr2.address, 30);
      expect(await oceanToken.balanceOf(addr2.address)).to.equal(30);
    });
  });
});
