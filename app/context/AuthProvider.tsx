"use client"
import { store } from "@/lib/store";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux'




export function AuthProvider({ children }: { children: React.ReactNode }) {
  <Toaster
    position="top-center"
    reverseOrder={false}
  />
  return <SessionProvider>
    <Provider store={store}>
      {children}

    </Provider>
  </SessionProvider>;

}