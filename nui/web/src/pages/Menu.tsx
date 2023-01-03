import { useEffect, useState } from "react";
import MainMenuBar from "../components/MainMenuBar";
import TrackDetails from "../components/TrackDetails";
import { useTrack } from "../providers/track.provider";
import styles from "./Menu.module.css";

function Menu() {
  const { handlePlay, contentLoaded, track } = useTrack();

  useEffect(() => {
    if (!contentLoaded) return;
    new Promise((resolve) => setTimeout(resolve, 500)).then((_) => {
      handlePlay();
    });
  }, [contentLoaded]);

  return (
    <>
      {contentLoaded && <TrackDetails />}
      <div className={styles.background}></div>
      <div className={styles.barWrapper}>
        <MainMenuBar />
      </div>
    </>
  );
}

export default Menu;
