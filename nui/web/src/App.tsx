import Ingame from "./pages/Ingame";
import Menu from "./pages/Menu";
import Startup from "./pages/Startup";
import { useRouter } from "./providers/router.provider";

export const App = () => {
  const { currentRoute } = useRouter();

  return (
    <>
      {currentRoute == "startup" && <Startup />}
      {currentRoute == "menu" && <Menu />}
      {currentRoute == "ingame" && <Ingame />}
    </>
  );
};
