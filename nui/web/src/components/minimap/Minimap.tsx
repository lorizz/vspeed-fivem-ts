import styles from "./Minimap.module.css";
import carMarker from "../../assets/images/ingame/carMarker.png";
import map from "../../assets/images/ingame/map.png";
import { useEffect, useState } from "react";
import { useNuiEvent } from "../../hooks/useNuiEvent";

interface ICoordinates {
  x: number;
  y: number;
}

const topLeft: ICoordinates = { x: -10630, y: 3459.6 };
const bottomRight: ICoordinates = { x: -3970.3, y: -3200.4 };
const clampedRangeMax = 2048;

const Minimap = () => {
  const [coordinates, setCoordinates] = useState<ICoordinates>({ x: 0, y: 0 });
  const [heading, setHeading] = useState<number>(180);

  useNuiEvent<any>("updatePosAndRot", (data: any) => {
    setCoordinates({x: data.coordinates[0], y: data.coordinates[1]});
    setHeading(data.heading);
  });

  // NewValue = (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin
  function getScaledValue(value: number, sourceMin: number, sourceMax: number) {
    return ((value - sourceMin) * clampedRangeMax) / (sourceMax - sourceMin);
  }

  return (
    <>
      <div className={styles.minimapWrapper}>
        <img src={carMarker} className={styles.player} style={{
          transform: `rotateZ(-${heading}deg)`
        }} />
        {/* <div className={styles.player}></div> */}
        <div className={styles.base}>
          <div className={styles.inner}>
            <img
              src={map}
              className={styles.map}
              style={{
                transform: `translate(
                  ${-getScaledValue(coordinates.x, bottomRight.x, topLeft.x)}px,
                  ${-getScaledValue(coordinates.y, bottomRight.y, topLeft.y)}px
                )`,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Minimap;
