import "./index.css"

import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";

import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./contexts/themeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="foodDelivery-theme">
      <HelmetProvider>
        <Toaster richColors position="top-right" />
        <Helmet titleTemplate="%s | Delivery" />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </HelmetProvider>
    </ThemeProvider>
  )
}

export default App;
