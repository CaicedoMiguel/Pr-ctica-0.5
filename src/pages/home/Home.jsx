import { Canvas } from "@react-three/fiber";
import Controls from "./controls/Controls";
import Lights from "./lights/Lights";
import { Physics } from "@react-three/rapier";
import Beach from "./world/Beach";
import Staging from "./staging/Staging";
import { Loader, PositionalAudio } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Suspense, useCallback, useRef, useState, } from "react";
import Video from "./world/Video";
import PostProcessing from "./postprocessing/PostProcessing";

const Home = () => {
  const cameraSettings = {
    position: [0, 15, 15],
  };

  const audioRef = useRef();
  

  const handleAudio = useCallback(() => {
    audioRef.current.play();
    audioRef.current.setVolume(10);
  }, []);

  // El valor inicial del estado
  const [ audioPlaying, setAudioPlaying ] = useState(false);

  const handleButtonAudio = () => {
    if (!audioPlaying) { //Como inicialmente no se reproduce el audio, se cambian el valor del estado. 
      handleAudio();
      setAudioPlaying(true);
    }
  };

  return (
    <>
      <Canvas camera={cameraSettings}>
        <Suspense fallback={null}>
          <PostProcessing />
          <Perf position={"top-left"} />
          <Controls />
          <Lights />
          <Staging />
          <Physics debug={false}>
            <Beach />
          </Physics>
          <Video name="screen" position-y={10} scale={8}  />
          <group position={[0, 5, 0]}>
            <PositionalAudio ref={audioRef} loop url="/sounds/waves.mp3" distance={5} />
          </group>
        </Suspense>
      </Canvas>
      <Loader />

    {/* Estilo del botton */}
    <div style={{ position: "absolute", bottom: "100px", left: "50%", transform: "translateX(-50%)" }}>
        <button onClick={handleButtonAudio} style={{ padding: "10px 20px", fontSize: "16px" }}>
          Reproducir Audio
        </button>
      </div>
    </>
  );
};

export default Home;
