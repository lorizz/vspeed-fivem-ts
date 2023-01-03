import Slider from "react-slick";
import styles from "./MainMenuBar.module.css";
import iconCarSelect from "../assets/images/menu/iconCarSelect.png";
import iconDominants from "../assets/images/menu/iconDominants.png";
import iconFreeroam from "../assets/images/menu/iconFreeroam.png";
import iconOptions from "../assets/images/menu/iconOptions.png";
import { useEffect, useRef, useState } from "react";

import cursorSfx from "../assets/sfx/cursor.wav";
import confirmSfx from "../assets/sfx/cursor.wav";
import useSound from "use-sound";
import Loading from "./Loading";
import { useRouter } from "../providers/router.provider";

const MainMenuBar = () => {
  const slider = useRef<Slider>(null);
  const [label, setLabel] = useState<string>("Career");
  const [audioLoaded, setAudioLoaded] = useState<boolean>(false);

  const { setCurrentRoute } = useRouter();

  const [playConfirm] = useSound(confirmSfx, {
    interrupt: true,
  });

  const [playCursor] = useSound(cursorSfx, {
    interrupt: true,
    onload: () => setAudioLoaded(true),
  });

  const settings = {
    arrows: false,
    centerMode: true,
    centerPadding: "60px",
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    speed: 200,
    swipe: false,
    touchMove: false,
    beforeChange: (oldIndex: number, newIndex: number) => {
      switch (newIndex) {
        case 0:
          setLabel("Freeroam");
          break;
        case 1:
          setLabel("Garage");
          break;
        case 2:
          setLabel("Dominants");
          break;
        case 3:
          setLabel("Options");
          break;
      }
    },
  };

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key == "ArrowLeft") {
        playCursor();
        slider.current?.slickPrev();
      } else if (e.key == "ArrowRight") {
        playCursor();
        slider.current?.slickNext();
      } else if (e.key == "Enter") {
        playConfirm();
        setCurrentRoute("ingame");
      }
    };

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [audioLoaded]);

  return (
    <>
      <div className={styles.content}>
        <Slider ref={slider} {...settings}>
          <div className={styles.icon}>
            <img src={iconFreeroam} width="128px" />
          </div>
          <div className={styles.icon}>
            <img src={iconCarSelect} width="128px" />
          </div>
          <div className={styles.icon}>
            <img src={iconDominants} width="128px" />
          </div>
          <div className={styles.icon}>
            <img src={iconOptions} width="128px" />
          </div>
        </Slider>
        <p className={styles.text}>{label}</p>
      </div>
    </>
  );
};

export default MainMenuBar;
