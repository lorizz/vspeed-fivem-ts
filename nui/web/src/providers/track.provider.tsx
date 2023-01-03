import React, {
  Context,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useSound from "use-sound";
import { gameTracks } from "../assets/sfx/tracks";

const TrackCtx = createContext<TrackProviderValue | null>(null);

interface TrackProviderValue {
  contentLoaded: boolean;
  track: any;
  handlePlay: () => void;
  handleStop: () => void;
}

export const TrackProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contentLoaded, setContentLoaded] = useState<boolean>(false);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [track, setTrack] = useState<any>(gameTracks[trackIndex]);
  const [play, { stop }] = useSound(track.id, {
    interrupt: true,
    onload: () => {
      setContentLoaded(true);
    },
    onend: () => {
      setContentLoaded(false);
      const nextTrackIndex = trackIndex + 1;
      if (nextTrackIndex >= gameTracks.length) return;
      setTrackIndex(trackIndex + 1);
      setTrack(gameTracks[nextTrackIndex]);
    }
  });

  useEffect(() => {
    if (contentLoaded) play();
  }, [track]);

  const handlePlay = () => {
    play();
  };

  const handleStop = () => {
    stop();
  }
  // const [contentLoaded, setContentLoaded] = useState<boolean>(false);
  // const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  // const [currentTrack, setCurrentTrack] = useState<any>(gameTracks[currentTrackIndex]);
  // const [playTrack] = useSound(gameTracks[currentTrackIndex].id, {
  //   interrupt: true,
  //   onload: () => setContentLoaded(true)
  // });

  // const updateTrackHook = useCallback(() => playTrack)

  // // See options here https://github.com/goldfire/howler.js#options
  // // const [playTracks] = useSound(
  // //   gameTracks.map((t) => t.id),
  // //   {
  // //     interrupt: true,
  // //     onload: () => setContentLoaded(true),
  // //     onend: () => setCurrentTrackIndex(currentTrackIndex + 1),
  // //     onplay: () => setCurrentTrack(gameTracks[currentTrackIndex]),
  // //   }
  // // );

  // const handlePlay = () => {
  //   // play();
  //   playTrack();
  // };

  return (
    <TrackCtx.Provider
      value={{
        contentLoaded,
        track,
        handlePlay,
        handleStop,
      }}
    >
      {children}
    </TrackCtx.Provider>
  );
};

export const useTrack = () =>
  useContext<TrackProviderValue>(TrackCtx as Context<TrackProviderValue>);
