"use client"

import Identicon from '@polkadot/react-identicon';

type Props = {
    address: string;
    name: string | undefined;
    onClick: () => void;
    isActive?: boolean;
    block?: boolean;
  };
  
  function AccountButton({ address, name, onClick, isActive, block }: Props) {
    return (
      <button type="button" onClick={onClick}>
        <Identicon value={address} theme="polkadot" size={28} />
        {name}
      </button>
    );
  }
  
  export { AccountButton };