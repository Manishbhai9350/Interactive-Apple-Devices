import { CameraControls } from "@react-three/drei"
import Ground from "./Ground"
import {  useEffect, useRef } from "react"
import Macbook from "./Macbook";
import Ipad from './Ipad';
import Iphone from './Iphone';
// Declare module augmentations for the missing declaration files
import { useAtom } from "jotai"
import { SelectedAtom } from "../Utils/HoverAtom"

const Experience = () => {
  const Camera = useRef(null)

  // Initial center box 
  const initialBoxCenter = useRef(null)
  /** Macbook */
  const macbook = useRef(null)
  const macbookOpenedBox = useRef(null)
  
  /** Ipad */
  const ipad = useRef(null)
  const ipadBoxFlying = useRef(null)
  
  /** Iphone */
  const iphone = useRef(null)
  const iphoneBoxFlying = useRef(null)

  const [SelectedItem,setSelectedItem] = useAtom(SelectedAtom)

  function fitCamToBox(cam,box) {
    cam.fitToBox(box, true)
  }

  useEffect(() => {
    const cam = Camera.current
    if (cam && initialBoxCenter.current) {
      initialBoxCenter.current.position.set(...macbook.current.position)
      // cam.setPosition(0,0,0)
      cam.dolly(3)
      cam.smoothTime = .8
      cam.dolly(-3)
      fitCamToBox(cam,initialBoxCenter.current)
    }
  }, [])

  useEffect(() => {
    MoveToCurrentItemBox()
  }, [SelectedItem])


  function MoveToCurrentItemBox(){
    const cam = Camera.current
    if (cam) {
      if (SelectedItem == 'macbook') {
        fitCamToBox(cam,macbookOpenedBox.current)
      }
      else if (SelectedItem == 'ipad') {
        fitCamToBox(cam,ipadBoxFlying.current)
      }
      else if(SelectedItem == 'iphone'){
        fitCamToBox(cam,iphoneBoxFlying.current)
      }
      else if (SelectedItem == '') {
        fitCamToBox(cam,initialBoxCenter.current)
      }
    }
  }

  useEffect(() => {
    function HandleResize(){
      MoveToCurrentItemBox()
    }
    window.addEventListener('resize',HandleResize)
    return () => {
      window.removeEventListener('resize',HandleResize)
    }
  }, [SelectedItem])
  
  return (
    <>
    {/* <fog attach={'fog'} args={['#444444',4,7]} />
    <color attach={'background'} args={['#444444']} /> */}
    <fog attach={'fog'} args={['#999999',3,4]} />
    <color attach={'background'} args={['#999999']} />
    <ambientLight intensity={.5} />
    <directionalLight castShadow position={[0,2,2]} color={'#ffffff'} intensity={3} />
    <directionalLight castShadow position={[0,2,-2]} color={'#ffffff'} intensity={3} />
    <directionalLight receiveShadow={true} castShadow={true} position={[0,3,0]} intensity={3} color={0xffffff} />
    <pointLight position={[0,.5,0]} intensity={1} color={0xc7c7c7} />
    <pointLight position={[.45,.4,.1]} intensity={.3} color={0xc7c7c7} />
      {/* Adding Box For Camera Animations */}
        {/* Initial Box */}
          <mesh ref={initialBoxCenter} position={[0,-.3,.5]} visible={true} >
              <boxGeometry args={[1,.7,.1]} />
              <meshStandardMaterial color={'red'} transparent visible={false} opacity={.5} />
          </mesh>
        {/* Macbook Boxes */}
          <mesh ref={macbookOpenedBox} position={[0,.22,-.22]} >
              <boxGeometry args={[.8,.3,.1]} />
              <meshStandardMaterial color={'red'} transparent visible={false} opacity={.5} />
          </mesh>
        {/* Ipad Boxes */}
          <mesh position={[-.55,.4,.1]} visible={false} ref={ipadBoxFlying} >
            <boxGeometry args={[.4,.3,.1]} />
            <meshStandardMaterial color={'red'} transparent opacity={.5} />
          </mesh>
        {/* Iphone Boxes */}
          <mesh position={[.45,.4,0]} visible={false} ref={iphoneBoxFlying} >
            <boxGeometry args={[.1,.2,.1]} />
            <meshStandardMaterial color={'red'} transparent opacity={.5} />
          </mesh>
    <CameraControls maxPolarAngle={Math.PI/2.5} minPolarAngle={-Math.PI/2} ref={Camera} />
    {/* <CameraControls ref={Camera} makeDefault /> */}
    <Macbook position={[0,0,0]} ref={macbook} />
    {/* <Ipad position={[-.55,.4,-.05]} ref={ipad} /> */}
    <Ipad position={[-.55,0,-.1]} ref={ipad} />
    <Iphone position={[.45,0,0]} ref={iphone} />
    <Ground />
    </>
  )
}

export default Experience