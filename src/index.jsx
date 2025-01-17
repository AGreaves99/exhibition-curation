import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";
import { Header } from "./components/Header.jsx";
import { Home } from "./pages/Home.jsx";
import { NotFound } from "./pages/_404.jsx";
import "./styles/index.css";
import { SingleArtwork } from "./pages/SingleArtwork.jsx";
import { Collections } from "./pages/Collections.jsx";

export function App() {
  return (
    <LocationProvider>
      <Header />
      <main>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/artic/:id" component={SingleArtwork} />
          <Route path="/collections" component={Collections} />
          <Route default component={NotFound} />
        </Router>
      </main>
    </LocationProvider>
  );
}

render(<App />, document.getElementById("app"));
