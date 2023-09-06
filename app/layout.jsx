import { Toaster } from "react-hot-toast";

import Provider from "@components/Provider";
import Nav from "@components/Nav";

import "@styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
};

export default RootLayout;
