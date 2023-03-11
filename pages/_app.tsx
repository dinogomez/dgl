import { createTheme, NextUIProvider } from "@nextui-org/react";
import { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Box } from "../components/@dgl_cmp_box";
import Navbar from "../components/@dgl_cmp_nav";
import { useSSR } from "@nextui-org/react";

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {},
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const darkTheme = createTheme({
    type: "dark",
  });
  const { isBrowser } = useSSR();

  return (
    isBrowser && (
      <SessionContextProvider supabaseClient={supabaseClient}>
        <NextUIProvider>
          {/* Navbar theme={darkTheme}*/}
          <Navbar />
          {/* Container */}
          <Box
            css={{
              px: "$12",
              py: "$15",
              mt: "$12",
              "@xsMax": { px: "$10" },
              maxWidth: "70%",
              margin: "0 auto",
            }}
          >
            <Component {...pageProps} />
          </Box>
        </NextUIProvider>
      </SessionContextProvider>
    )
  );
}

export default MyApp;
