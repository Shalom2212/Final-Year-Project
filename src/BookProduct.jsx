export const BookProduct = ({ web3, smartContract, productPrice }) => {
  const payForCourse = async () => {
    if (!web3 || !smartContract) return;

    const accounts = await web3.eth.getAccounts();
    smartContract.methods
      .sendAndSplitEther()
      .send({
        from: accounts[0],
        value: web3.utils.toWei(productPrice, "ether"),
      })
      .on("transactionHash", (hash) => {
        console.log("Transaction hash:", hash);
      })
      .on("receipt", (receipt) => {
        console.log("Transaction successful:", receipt);
      })
      .on("error", (error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <br />
      <h1>Book Product</h1>
      <p>Product Price: {productPrice} ETH</p>
      <button onClick={payForCourse}>Pay for Product</button>
    </div>
  );
};
