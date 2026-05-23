import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Communities from "./pages/Communities";
import Join from "./pages/Join";
import Contact from "./pages/Contact";
import CommunityDetail from "./pages/CommunityDetail";
import CreateCommunity from "./pages/CreateCommunity";
import Directory from "./pages/Directory";
import Register from "./pages/Register";
import Store from "./pages/Store";
import Media from "./pages/Media";
import Basar from "./pages/Basar";
import Umla from "./pages/Umla";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/services"} component={Services} />
      <Route path={"/communities"} component={Communities} />
      <Route path={"/communities/basar"} component={Basar} />
      <Route path={"/communities/umla"} component={Umla} />
      <Route path={"/communities/:id"} component={CommunityDetail} />
      <Route path={"/join"} component={Join} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/create-community"} component={CreateCommunity} />
      <Route path={"/directory"} component={Directory} />
      <Route path={"/register"} component={Register} />
      <Route path={"/store"} component={Store} />
      <Route path={"/media"} component={Media} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider defaultLang="ar">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
