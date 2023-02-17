import React, { useState, useEffect } from "react";

import Loading from "./components/loading/Loading";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Data from "./source/data.json";

import { useAddress, useClaimNFT, useContract } from "@thirdweb-dev/react";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";

import "./App.css";
import "./responsive.css";
import { Config } from "./components/config/Config";

function App() {
  const [loading, setLoading] = useState(true);
  const [ClaimedSupply, setClaimedSupply] = useState<any>(0);
  const [TotalSupply, setTotalSupply] = useState<any>(0);
  const [RefreshData, setRefreshData] = useState<any>(0);
  const [mintedNftBanner, setmintedNftBanner] = useState<any>("");

  // wallet address
  const address = useAddress();

  // nft contract address
  const { contract, isLoading: contractisLoading } = useContract(
    `${Data.contractAddress.toString()}`,
    "nft-drop"
  );

  // mint nft
  const { mutateAsync: claimNft, isLoading: claimNftisLoading } =
    useClaimNFT(contract);

  // function for checking data.json
  function checkDataFile(): boolean {
    if (
      Data.nftImage !== "" &&
      Data.nftImage !== "" &&
      Data.projectDescription !== "" &&
      Data.contractAddress !== "" &&
      Data.headerLogo !== "" &&
      Data.copyright !== ""
    ) {
      return true;
    } else {
      return false;
    }
  }

  // check data.json
  useEffect(() => {
    try {
      if (checkDataFile() === true) {
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }, []);
  const filteredData = Object.entries(Data).filter(
    ([key, value]) => value === ""
  );

  // get nft-drop data
  useEffect(() => {
    const fetchNftDropData = async () => {
      setLoading(true);
      const claimedNFTCount = await contract?.totalClaimedSupply();
      const unclaimedNFTCount = await contract?.totalUnclaimedSupply();
      setClaimedSupply(claimedNFTCount);
      setTotalSupply(Number(unclaimedNFTCount) + Number(claimedNFTCount));
      setLoading(false);
    };
    if (checkDataFile()) {
      fetchNftDropData();
    }
  }, [RefreshData, contract]);

  // handleMint connected to button
  const handleMint = () => {
    mintasyncnft();
  };

  // mint function
  const mintasyncnft = async () => {
    try {
      await claimNft({ to: address, quantity: 1 }).then(async (tx: any) => {
        // const receipt = tx[0].receipt; // the transaction receipt
        // const claimedTokenId = tx[0].id; // the id of the NFT claimed
        const claimedNFT = await tx[0].data(); // (optional) get the claimed NFT metadata
        setmintedNftBanner(claimedNFT.metadata.image);
        toast.success(`Successfully Minted ${claimedNFT.metadata.name}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
      setRefreshData(RefreshData + 1);
    } catch (err: any) {
      toast.error(err.reason, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="nft-mint-page">
      {loading || (contractisLoading && Data.contractAddress) ? (
        <>
          <Loading />
        </>
      ) : checkDataFile() ? (
        <>
          <Header />
          {claimNftisLoading ? (
            <div className="claimNftisLoading">
              <PropagateLoader color="#36d7b7" />
            </div>
          ) : (
            <div className="MintContainer">
              <h1>🚨 Mint Your {Data.projectName} 🚨</h1>
              <div className="InnerMintContainer">
                <img
                  className="nft-image"
                  src={
                    mintedNftBanner === ""
                      ? require(`./assets/${Data.nftImage}`)
                      : mintedNftBanner
                  }
                  width="100px"
                  height={"100px"}
                  alt="NFT"
                />
                <div className="InnerMintContainer_main">
                  <div className="nft-description">
                    {Data.projectDescription}
                  </div>
                  <button
                    className={`mint-button ${
                      address === undefined && "lightred"
                    }`}
                    onClick={handleMint}
                    disabled={
                      address === undefined ||
                      claimNftisLoading ||
                      Number(ClaimedSupply) === Number(TotalSupply)
                    }
                  >
                    {Number(ClaimedSupply) === Number(TotalSupply)
                      ? "Sold Out"
                      : "Mint"}{" "}
                    ({Number(ClaimedSupply)}/{Number(TotalSupply)})
                  </button>
                </div>
              </div>
            </div>
          )}
          <Footer />
        </>
      ) : (
        <Config filteredData={filteredData} />
      )}
    </div>
  );
}

export default App;
