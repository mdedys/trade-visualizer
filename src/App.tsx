import Grid from "./components/layout/Grid";
import Theme from "./components/theme/theme";
import Root from "./views/Root";

function App() {
  return (
    <>
      <Theme mode="light" />
      <Grid>
        <Root />
      </Grid>
    </>
  );
}

export default App;
