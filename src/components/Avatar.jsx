import Avatar from "boring-avatars";
import { useState, useEffect } from "react";
import { ethers, formatEther } from "ethers";
import { Button, Container, Typography, Stack, Box } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";

const AccountInfo = ({ size }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState("");

  const handleProfileChange = async () => {
    let provider = new ethers.BrowserProvider(window.ethereum);
    let acc = (await provider.listAccounts())[0];

    let balance = await provider.getBalance(acc.address);

    setWalletBalance(formatEther(balance));
    setWalletAddress(acc.address);
  };

  const handleAccountsChanged = async () => {
    handleProfileChange();
  };

  useEffect(() => {
    handleProfileChange();
    window.ethereum.on("accountsChanged", handleAccountsChanged);
  }, []);

  return (
    <>
      <Stack ml={2} mt={2} direction={"column"} alignItems={"center"}>
        <Avatar
          size={size}
          name={walletAddress}
          variant="beam"
          colors={["#001427", "#708D81", "#F4D58D", "#BF0603", "#8D0801"]}
        />
        <Box sx={{ position: "relative", top: -15 }}>
          <Button
            sx={{ borderRadius: "16px", width: `${size * 1.5}px`}}
            size="small"
            variant="contained"
            startIcon={<ContentCopy />}
          >
            {walletAddress.substring(0, 5) +
              "..." +
              walletAddress.substring(walletAddress.length - 4)}
          </Button>
          <Typography fontSize={size * 0.15}>
            {" "}
            Balance: {parseFloat(walletBalance).toFixed(2)} ETH{" "}
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

export default AccountInfo;