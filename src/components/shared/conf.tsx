"use client"
import { Header } from "@/app/student/header";
import { useAccount, useApi } from "@gear-js/react-hooks";
import Curso from "../courses/page";
import { withProviders } from "@/app/student/account/hocs";

import { useEffect, useState } from 'react';

function useWalletSync() {
  const { account, isAccountReady } = useAccount();
  const { address } = account || {};
  const WALLET_ID_LOCAL_STORAGE_KEY = 'wallet';

  useEffect(() => {
    if (!isAccountReady) return;
    if (!account) return localStorage.removeItem(WALLET_ID_LOCAL_STORAGE_KEY);

    localStorage.setItem(WALLET_ID_LOCAL_STORAGE_KEY, account.meta.source);
  }, [isAccountReady, address, account]);
}

function Component() {
  const { isApiReady } = useApi();
  const { isAccountReady } = useAccount();

  useWalletSync();

  const isAppReady = isApiReady && isAccountReady;
  console.log(isAppReady)
  console.log(isAccountReady);
  return (
    <>
      <Header isAccountVisible={isAccountReady} />
      {isAppReady ? <Curso /> : <p>Se está cargando</p>}
    </>
  );
}

export const App = withProviders(Component);