
"use client"
import { useState } from "react";
import {
    useApi,
    useAccount,
    useBalance,
    useBalanceFormat,
  } from "@gear-js/react-hooks";
import { Wallet } from "./wallet";
import { Button } from "@/components/ui/button";
import { AccountsModal } from "./account-modal";

export function AccountInfo() {
    const { isApiReady } = useApi();
    const { account, accounts } = useAccount();
    const { balance } = useBalance(account?.address);
    const { getFormattedBalance } = useBalanceFormat();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formattedBalance =
      isApiReady && balance ? getFormattedBalance(balance) : undefined;
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    return (
      <>
        {account ? (
          <Wallet
            balance={formattedBalance}
            address={account.address}
            name={account.meta.name}
            onClick={openModal}
          />
        ) : (
          <Button onClick={openModal}>Sign In</Button>
        )}
        {isModalOpen && <AccountsModal accounts={accounts} close={closeModal} />}
      </>
    );
  }