import styles from "./TrackDetails.module.css";
import vstrax from "../assets/images/menu/vstrax.png";
import vstraxContent from "../assets/images/menu/vstraxContent.png";
import vstraxEnd from "../assets/images/menu/vstraxEnd.png";
import { useTrack } from "../providers/track.provider";
import { useEffect, useState } from "react";

const TrackDetails = () => {
  const { track } = useTrack();

  return (
    <>
      <div className={`${styles.base} position-absolute`}>
        <img
          src={vstraxContent}
          className={`${styles.content}`}
          height="128px"
        />
        <img src={vstrax} className={`${styles.start}`} width="128px" />
        <img src={vstraxEnd} className={`${styles.end}`} height="128px" />
        <div className={styles.textContent}>
          <h2>{track.name}</h2>
          <h5>{track.author}</h5>
          {track.album && <h5>{track.album}</h5>}
        </div>
      </div>
    </>
  );
};

export default TrackDetails;
