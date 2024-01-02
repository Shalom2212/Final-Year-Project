import "./App.css";
import Web3 from "web3";
import { contractABI } from "./abi";
import { BookProduct } from "./BookProduct";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [web3, setWeb3] = useState(null);
  const [smartContract, setSmartContract] = useState(null);
  const [productPrice, setProductPrice] = useState("");
  // const contractAddress = '0x9c0752F29BaBC33de9bad860d5eF5D15aC81e2Dc';
  const contractAddress = "0xfA7b8b5d23eC137f6520A467a7ADF0100DA580b0";

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(() => {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const courseInstance = new web3Instance.eth.Contract(
            contractABI,
            contractAddress
          );
          setSmartContract(courseInstance);

          courseInstance.methods
            .productPrice()
            .call()
            .then((fee) => {
              setProductPrice(web3Instance.utils.fromWei(fee, "ether"));
            });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert("Please install an another Ethereum wallet.");
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <BookProduct
                web3={web3}
                smartContract={smartContract}
                productPrice={productPrice}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
