import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/Home";
import Catalogue from "@/pages/Catalogue";
import Services from "@/pages/Services";
import Informations from "@/pages/Informations";
import NotFound from "@/pages/not-found";

// Create a wrapper for simple scroll-to-top behavior
function ScrollToTop() {
  if (typeof window !== "undefined") {
    window.scrollTo(0, 0);
  }
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/catalogue" component={Catalogue} />
      <Route path="/services" component={Services} />
      <Route path="/informations" component={Informations} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="kx-location-theme" attribute="class">
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
