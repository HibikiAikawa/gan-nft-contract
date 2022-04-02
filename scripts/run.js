async function main() {
  const [owner, other1, other2] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("GanNft");
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);

  let tx = await contract.mintRequest();
  tx.wait();

  tx = await contract.setTokenURI('test');
  tx.wait();

  console.log('owner end.');

  tx = await contract.transferOwnership(other1.address);
  tx.wait();

  tx = await contract.mintRequest();
  tx.wait();

  tx = await contract.connect(other1).setTokenURI('test');
  tx.wait();

  console.log('finish.')
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });