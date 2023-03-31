import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "@/assets/styles/style.scss";
import { theme } from "@/theme";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
