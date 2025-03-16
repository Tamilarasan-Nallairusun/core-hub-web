import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { Suspense } from "react";
import Loader from "./elements/Loader";

function App() {
  const element = useRoutes(routes);
  return <Suspense fallback={<Loader/>}>{element}</Suspense>;
}

export default App;
