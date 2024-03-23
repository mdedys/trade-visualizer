import ThemeProvider from "./components/theme/ThemeProvider";
import globals from "./globals";
import Root from "./views/Root";

function App() {
  return (
    <>
      <div className={globals} />
      <ThemeProvider />
      <Root />
    </>
  );
}

export default App;
