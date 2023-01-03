import { useEffect, useState } from "react";
import useSound from "use-sound";
import Loading from "../components/Loading";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { useRouter } from "../providers/router.provider";
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";
import styles from "./Startup.module.css";
import startupSfx from "../assets/sfx/startup.wav";
import confirmSfx from "../assets/sfx/confirm.wav";
import transitionStartupSfx from "../assets/sfx/transitions/transitionStartup.wav";

debugData([
  {
    action: "gameLoaded",
    data: true,
  },
]);

function Startup() {
  const { currentRoute, setCurrentRoute } = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [postLoading, setPostLoading] = useState<boolean>(false);
  const [textAnimation, setTextAnimation] = useState<string>(styles.firstAnim);
  const [audioLoaded, setAudioLoaded] = useState<boolean>(false);

  const [playStartup, startupData] = useSound(startupSfx, {
    interrupt: true,
    onload: () => setAudioLoaded(true),
  });

  const [playConfirm] = useSound(confirmSfx, {
    interrupt: true,
  });

  const [playTransition] = useSound(transitionStartupSfx, {
    interrupt: true,
  });

  useNuiEvent<boolean>("gameLoaded", (data) => {
    setLoading(!data);
    new Promise((res) => setTimeout(res, 200)).then((_) => {
      setTextAnimation(styles.secondAnim);
    });
  });

  useEffect(() => {
    if (!audioLoaded) return;
    playStartup();
  }, [audioLoaded]);

  useEffect(() => {
    if (loading) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (e.key == "Enter") {
        startupData.stop();
        playConfirm();
        if (!isEnvBrowser()) fetchNui("clientcore:initGarage");
        setPostLoading(true);
        new Promise((resolve) => setTimeout(resolve, 300)).then((_) => {
          playTransition();
          setCurrentRoute("menu");
        });
      }
    };

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [loading]);

  return (
    <>
      {postLoading && <Loading />}
      <div className={styles.background}></div>
      <div
        className={`
          ${styles.content} w-100 h-100 position-absolute d-flex flex-column align-items-center justify-content-end`}
      >
        {!loading && (
          <h2 className={`${styles.bold} ${textAnimation} text-white`}>
            Press ENTER to continue
          </h2>
        )}
        <h2 className={`${styles.bold} text-white mt-3`}>
          Copyright: VSpeed 2022
        </h2>
      </div>
    </>
  );
}

export default Startup;
