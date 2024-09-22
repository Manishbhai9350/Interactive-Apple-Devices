import React, { forwardRef, useEffect, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { HoverAtom , SelectedAtom } from "../Utils/HoverAtom";
import { useAtom  } from "jotai";
import gsap from "gsap";
import { degToRad } from "three/src/math/MathUtils.js";
import * as THREE from 'three'

export default forwardRef(function Ipad({...props},ref) {
  const { nodes, materials } = useGLTF("/models/custom-ipad.glb");
  const wallpaperRef = useRef()
  const wallpaper = useTexture('/images/red.jpg')
  const innerIpad = useRef(null)
  wallpaper.colorSpace = THREE.SRGBColorSpace

  const [HoverItem,setHoverItem] = useAtom(HoverAtom)
  const [SelectedItem,setSelectedItem] = useAtom(SelectedAtom)



  useEffect(() => {
    wallpaperRef.current.material.map = wallpaper
  }, [])

  function HandlePointerEnter(e){
    // screen.current.rotation.x = -degToRad(7)
    document.body.style.cursor = 'pointer'
    if(SelectedItem !== 'ipad'){
    gsap.to(innerIpad.current.rotation,{
      x:Math.PI/2 - .1
    })
    setHoverItem('ipad')
  
    }
  }
  function HandlePointerLeave(e){
    document.body.style.cursor = 'inherit'
    if(SelectedItem !== 'ipad'){
      setHoverItem('')
      gsap.to(innerIpad.current.rotation,{
        x:Math.PI/2
      }) 
    }
  }

  

  function HandlePointerDown(e){
    if (SelectedItem == 'ipad') {
      setSelectedItem('')
    } else {
      setSelectedItem('ipad')
    }
  }

  useEffect(() => {
    if (SelectedItem == 'ipad') {
      gsap.to(ref.current.position,{
        x:-.54,
        y:.22,
        z:.1
      })
      gsap.to(innerIpad.current.rotation,{
        x:0
      }) 
    } else {
      gsap.to(ref.current.position,{
        x:props.position[0],
        y:props.position[1],
        z:props.position[2]
      })
      gsap.to(innerIpad.current.rotation,{
        x:Math.PI/2
      }) 

    }
  }, [SelectedItem])

  
  return (
    <group onPointerDown={HandlePointerDown}  receiveShadow={true} castShadow={true} onPointerLeave={HandlePointerLeave} onPointerEnter={HandlePointerEnter} ref={ref} rotation={[0,0,0]} scale={.4} {...props} dispose={null}>
      <group ref={innerIpad} name="ipadglb" position={[0,0,0]} rotation={[Math.PI/2,0,0]} scale={0.01}>
        <group name="iPad_Pro_2020" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            name="iPad_Pro_2020_Body_0"
            geometry={nodes.iPad_Pro_2020_Body_0.geometry}
            material={materials.Body}
          />
          <mesh 
            ref={wallpaperRef}
            name="wallpaper"
            geometry={nodes.wallpaper.geometry}
            material={materials.screen}
          />
          <mesh
            name="iPad_Pro_2020_bezel_0"
            geometry={nodes.iPad_Pro_2020_bezel_0.geometry}
            material={materials.bezel}
          />
          <mesh
            name="camera_module_Body_0"
            geometry={nodes.camera_module_Body_0.geometry}
            material={materials.Body}
          />
          <mesh
            name="camera_module_glass_0"
            geometry={nodes.camera_module_glass_0.geometry}
            material={materials.glass}
          />
          <mesh
            name="camera_module2_camera2_0"
            geometry={nodes.camera_module2_camera2_0.geometry}
            material={materials.camera2}
          />
          <mesh
            name="camera_cameraframe_and_logo_0"
            geometry={nodes.camera_cameraframe_and_logo_0.geometry}
            material={materials.cameraframe_and_logo}
          />
          <mesh
            name="camera_glass_0"
            geometry={nodes.camera_glass_0.geometry}
            material={materials.glass}
          />
          <mesh
            name="camera1_camera1_0"
            geometry={nodes.camera1_camera1_0.geometry}
            material={materials.camera1}
          />
          <mesh
            name="camera1_camera1(2)_0"
            geometry={nodes["camera1_camera1(2)_0"].geometry}
            material={materials.camera12}
          />
          <mesh
            name="camera2_camera2_0"
            geometry={nodes.camera2_camera2_0.geometry}
            material={materials.camera2}
          />
          <mesh
            name="LiDar_LiDar_0"
            geometry={nodes.LiDar_LiDar_0.geometry}
            material={materials.LiDar}
          />
          <mesh
            name="camera1001_camera1_0"
            geometry={nodes.camera1001_camera1_0.geometry}
            material={materials.camera1}
          />
          <mesh
            name="camera1001_camera1(2)_0"
            geometry={nodes["camera1001_camera1(2)_0"].geometry}
            material={materials.camera12}
          />
          <mesh
            name="camera_module2001_camera2001_0"
            geometry={nodes.camera_module2001_camera2001_0.geometry}
            material={materials["camera2.001"]}
          />
          <mesh
            name="camera_module2001_Camera_Flash_0"
            geometry={nodes.camera_module2001_Camera_Flash_0.geometry}
            material={materials.Camera_Flash}
          />
          <mesh
            name="camera_module2001_Mic_0"
            geometry={nodes.camera_module2001_Mic_0.geometry}
            material={materials.material}
          />
          <mesh
            name="Apple_logo_cameraframe_and_logo_0"
            geometry={nodes.Apple_logo_cameraframe_and_logo_0.geometry}
            material={materials.cameraframe_and_logo}
          />
          <mesh
            name="Connector__0"
            geometry={nodes.Connector__0.geometry}
            material={materials.material_12}
          />
          <mesh
            name="Front_camera_front_camera_0"
            geometry={nodes.Front_camera_front_camera_0.geometry}
            material={materials.front_camera}
          />
          <mesh
            name="Front_camera_camera1(2)_0"
            geometry={nodes["Front_camera_camera1(2)_0"].geometry}
            material={materials.camera12}
          />
          <mesh
            name="Front_camera_glass_0"
            geometry={nodes.Front_camera_glass_0.geometry}
            material={materials.glass}
          />
          <mesh
            name="Speakers_Mic_0"
            geometry={nodes.Speakers_Mic_0.geometry}
            material={materials.material}
          />
          <mesh
            name="Speakers_Body_0"
            geometry={nodes.Speakers_Body_0.geometry}
            material={materials.Body}
          />
          <mesh
            name="power_button_Body_0"
            geometry={nodes.power_button_Body_0.geometry}
            material={materials.Body}
          />
          <mesh
            name="Volume_button_Body_0"
            geometry={nodes.Volume_button_Body_0.geometry}
            material={materials.Body}
          />
          <mesh
            name="Apple_Pencil_apple_pencil_0"
            geometry={nodes.Apple_Pencil_apple_pencil_0.geometry}
            material={materials.apple_pencil}
          />
          <mesh
            name="Apple_logo001_apple_pencil001_0"
            geometry={nodes.Apple_logo001_apple_pencil001_0.geometry}
            material={materials["apple_pencil.001"]}
          />
          <mesh
            name="Text_apple_pencil001_0"
            geometry={nodes.Text_apple_pencil001_0.geometry}
            material={materials["apple_pencil.001"]}
          />
          <mesh
            name="Line_Line_0"
            geometry={nodes.Line_Line_0.geometry}
            material={materials.Line}
            position={[0, 0.017, 0.768]}
            rotation={[Math.PI / 2, 0, 0]}
          />
        </group>
      </group>
    </group>
  );
})

useGLTF.preload("/models/custom-ipad.glb");
