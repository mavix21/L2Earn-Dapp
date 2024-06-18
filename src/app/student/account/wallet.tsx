"use client"

import { AccountButton } from "./account-button";

type Props = {
    balance: {
      value: string;
      unit: string;
    } | undefined;//Account['balance'];
    address: string;
    name: string | undefined;
    onClick: () => void;
  };
  
  function Wallet({ balance, address, name, onClick }: Props) {
    return (
      <div>
        <p>
          {balance?.value} <span >{balance?.unit}</span>
        </p>
        <AccountButton address={address} name={name} onClick={onClick} />
      </div>
    );
  }
  
  export { Wallet };
  