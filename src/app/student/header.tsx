"use client"

import { AccountInfo } from "./account/account-info";

type Props = {
    isAccountVisible: boolean;
  };
  
  export function Header({ isAccountVisible }: Props) {
  
  
    return (
      <div>
        
        {isAccountVisible && <AccountInfo />}
      </div>
    );
  
    
  }