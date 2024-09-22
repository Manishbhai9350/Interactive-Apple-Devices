import { Canvas } from "@react-three/fiber";
import "./App.css";
import Experience from "./components/Experience";
import UI from "./components/UI";
import { Suspense, useState } from "react";

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  return (
    <main>
      <Suspense >
        <Canvas shadows>
          {/* <Suspense  > */}
          <Experience />
          {/* </Suspense> */}
        </Canvas>
      </Suspense>
      <UI />
    </main>
  );
}

export default App;
