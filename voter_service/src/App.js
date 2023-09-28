import Header from "./components/header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";


export default function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />  {/* This is a dynamic area  - meaning here our components will reside depending on the route. */}
      <Footer />
    </div>
  );
}