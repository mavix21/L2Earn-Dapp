"use client"

import {
    ApiProvider as GearApiProvider,
    AlertProvider as GearAlertProvider,
    AccountProvider,
    ProviderProps,
} from '@gear-js/react-hooks';
import { ComponentType } from 'react';
//import { BrowserRouter } from 'react-router-dom';

function ApiProvider({ children }: ProviderProps) {
    return <GearApiProvider initialArgs={{ endpoint: process.env.NEXT_PUBLIC_NODE_ADDRESS }}>{children}</GearApiProvider>;
}

//   function AlertProvider({ children }: ProviderProps) {
//     return (
//       <GearAlertProvider template={Alert} containerClassName={alertStyles.root}>
//         {children}
//       </GearAlertProvider>
//     );
//   }

const providers = [ApiProvider, AccountProvider];

function withProviders(Component: ComponentType) {
    return () => providers.reduceRight((children, Provider) => <Provider>{children}</Provider>, <Component />);
}

export { withProviders };