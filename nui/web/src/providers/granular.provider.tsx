import React, {
  Context,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const GranularCtx = createContext<GranularProviderValue | null>(null);

interface GranularProviderValue {
  playGrains: (offset: number) => void;
  stopGrains: () => void;
  setRpms: (rpm: number) => void;
}

const env = {
  attack: 0.03,
  release: 0.05,
  spread: 0.16,
};

class Grain {
  constructor(
    context: AudioContext,
    buffer: AudioBuffer,
    startOffset: number,
    masterGain: GainNode
  ) {
    const source = context.createBufferSource();
    source.buffer = buffer;
    const gain = context.createGain();
    source.connect(gain);
    gain.connect(masterGain);
    const offset = startOffset * buffer.duration;
    const randomOffset = Math.random() * env.spread - env.spread / 2;
    source.start(
      context.currentTime,
      Math.max(0, offset + randomOffset),
      env.attack + env.release
    );
    gain.gain.setValueAtTime(0.0, context.currentTime);
    gain.gain.linearRampToValueAtTime(1.0, context.currentTime + env.attack);
    gain.gain.linearRampToValueAtTime(
      0,
      context.currentTime + (env.attack + env.release)
    );
    source.stop(context.currentTime + env.attack + env.release + 0.2);
    setTimeout(() => {
      gain.disconnect();
    }, (env.attack + env.release) * 1000 + 200);
  }
}

export const GranularProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const audioContext = new window.AudioContext();
  const masterGain = audioContext.createGain();
  masterGain.connect(audioContext.destination);
  const [buffer, setBuffer] = useState<AudioBuffer>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [grains, setGrains] = useState<Grain[]>([]);
  const [grainsCount, setGrainsCount] = useState<number>(0);

  useEffect(() => {
    fetch("http://localhost:5173/granulars/accel_test.wav")
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
      .then((buffer) => {
        setBuffer(buffer);
      });
  }, []);

  const playGrains = (offset: number) => {
    const grain = new Grain(audioContext, buffer!, offset, masterGain!);
    setIsPlaying(true);
  };

  const stopGrains = () => {
    setIsPlaying(false);
  };

  const setRpms = (rpms: number) => {
    setOffset(rpms);
  };

  // useEffect(() => {
  //   if (isPlaying) {
  //     const interval = setInterval(() => {
  //       console.log(offset);
  //       const grain = new Grain(audioContext, buffer!, offset, masterGain!);
  //       const newGrains = [...grains];
  //       newGrains[grainsCount] = grain;
  //       const newGrainsCount = grainsCount + 1;
  //       setGrainsCount(newGrainsCount);
  //       setGrains(newGrains);
  //       if (grainsCount > 10) {
  //         setGrainsCount(0);
  //       }
  //     }, 50);
  //     return () => clearInterval(interval);
  //   }
  //   // if (isPlaying) {
  //   //   const interval = setTimeout(() => {
  //   //     Grain(audioContext, buffer!, 0, masterGain!);
  //   //   }, 200);
  //   //   return () => clearInterval(interval);
  //   // }
  // }, [offset]);

  // const stopGrains = () => {
  //   stop();
  // };

  return (
    <GranularCtx.Provider
      value={{
        playGrains,
        stopGrains,
        setRpms,
      }}
    >
      {children}
    </GranularCtx.Provider>
  );
};

export const useGranular = () =>
  useContext<GranularProviderValue>(
    GranularCtx as Context<GranularProviderValue>
  );
