import { useEffect, useState } from "react";
import GranularSynthesiser from "../components/granular-synthesiser/GranularSyntesiser";
import Loading from "../components/Loading";
import Minimap from "../components/minimap/Minimap";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { useGranular } from "../providers/granular.provider";
import { useTrack } from "../providers/track.provider";
import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";

const Ingame = () => {
  const { handleStop } = useTrack();
  const [loading, setLoading] = useState<boolean>(true);

  const granular = useGranular();

  useEffect(() => {
    if (loading) {
      handleStop();
      if (isEnvBrowser()) setLoading(false);
      else {
        fetchNui("clientcore:setInFreeroam").then((_) => {
          setLoading(false);
        });
      }
    }
  }, []);

  useNuiEvent<any>("updateRpms", (data: any) => {
    granular.playGrains(data.rpms);
    // granular.setRpms(data.rpms);
  });

  return (
    <>
      {loading && <Loading />}
      {!loading && <Minimap />}
    </>
  );
};

export default Ingame;
