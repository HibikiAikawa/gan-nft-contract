async function main() {
  const [owner, other1, other2] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("GanNft");
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);

  console.log('finish.')
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });