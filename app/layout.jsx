import "styles/globals.css";

import Nav from "./components/Nav";
import Provider from "./components/Provider";

export const metadata = {
  title: "Promtopia",
  description: "A place to share your AI prompts",
};
// this will wrap around all pages
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
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
      </body>
    </html>
  );
};

export default RootLayout;
