import { forwardRef, useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { HoverAtom , SelectedAtom } from "../Utils/HoverAtom.jsx";
import { useAtom } from 'jotai'
import gsap from 'gsap'
export default forwardRef(function Iphone({...props},ref) {
  const { nodes, materials, scene } = useGLTF('/models/custom-iphone.glb')
  const innerIphone = useRef(null)
  const [HoverItem,setHoverItem] = useAtom(HoverAtom)
  const [SelectedItem,setSelectedItem] = useAtom(SelectedAtom)

  const wallpaperRef = useRef()
  
  useEffect(() => {
    if (wallpaperRef.current) {
      wallpaperRef.current.material.roughness = 1
    }
  }, [])
  

  function HandlePointerEnter(e){
    if (SelectedItem !== 'iphone') {
      gsap.to(innerIphone.current.position,{
        y:0.04 + .1
      })
      setHoverItem('iphone')
    }
    document.body.style.cursor = 'pointer'
    
  }
  function HandlePointerLeave(e){
    if (SelectedItem !== 'iphone') {
      gsap.to(innerIphone.current.position,{
        y:0.04
      })
      setHoverItem('')
    }
    document.body.style.cursor = 'inherit'
  }


  function HandlePointerDown(e){
    if (SelectedItem == 'iphone') {
      setSelectedItem('')
    } else {
      setSelectedItem('iphone')
    }
  }


  useEffect(() => {
    scene.traverse(node => {
      if (node?.castShadow) {
        node.castShadow = true
      }
      if (node?.receiveShadow) {
        node.receiveShadow = true
      }
    })
  }, [])

  useEffect(() => {

    // if the selected item is iphone then doing transformations
    if (SelectedItem == 'iphone' && ref.current) {

      // setting the position for view the iphone
      gsap.to(ref.current.position,{
        x:.45,
        y:.4,
        z:0
      })
      // rotating the iphone to insure that it faces towards the camera
      gsap.to(ref.current.rotation,{
        x:Math.PI/2,
        y:0,
        z:Math.PI
      })
    } else {

      // setting the position to initial position
      gsap.to(ref.current.position,{
        x:.45,
        y:0,
        z:0
      }) 
      // setting the rotation to initial rotation
      gsap.to(ref.current.rotation,{
        x:0,
        y:0,
        z:Math.PI * 0
      })
    }
  }, [SelectedItem])

  return (
    <group onPointerDown={HandlePointerDown} receiveShadow={true} castShadow={true} onPointerLeave={HandlePointerLeave} onPointerEnter={HandlePointerEnter} scale={.2} rotation={[0,0,0]} {...props} ref={ref} dispose={null}>
      <group ref={innerIphone} rotation={[-Math.PI/2,0,0]} position={[0,0.04,0]}  name="iphoneglb">
        <group name="iPhone13ProMaxfbx" scale={0.01}>
          <group name="Frame" scale={100}>
            <mesh name="Frame_Frame_0" geometry={nodes.Frame_Frame_0.geometry} material={materials.Frame} />
            <mesh name="Frame_Frame2_0" geometry={nodes.Frame_Frame2_0.geometry} material={materials.Frame2} />
            <mesh name="Frame_Port_0" geometry={nodes.Frame_Port_0.geometry} material={materials.Port} />
            <mesh name="Frame_Antenna_0" geometry={nodes.Frame_Antenna_0.geometry} material={materials.Antenna} />
            <mesh name="Frame_Mic_0" geometry={nodes.Frame_Mic_0.geometry} material={materials.material} />
            <mesh name="Body_Mic_0" geometry={nodes.Body_Mic_0.geometry} material={materials.material} />
            <mesh name="Body_Bezel_0" geometry={nodes.Body_Bezel_0.geometry} material={materials.Bezel} />
            <mesh name="Body_Body_0" geometry={nodes.Body_Body_0.geometry} material={materials.Body} />
            <mesh ref={wallpaperRef} name="wallpaper" geometry={nodes.wallpaper.geometry} material={materials.Wallpaper} />
            <mesh name="Body_Camera_Glass_0" geometry={nodes.Body_Camera_Glass_0.geometry} material={materials.Camera_Glass} />
            <mesh name="Body_Lens_0" geometry={nodes.Body_Lens_0.geometry} material={materials.Lens} />
            <mesh name="Body_Material_0" geometry={nodes.Body_Material_0.geometry} material={materials.Material} />
            <mesh name="Camera_Body_0" geometry={nodes.Camera_Body_0.geometry} material={materials.Body} />
            <mesh name="Camera_Glass_0" geometry={nodes.Camera_Glass_0.geometry} material={materials.Glass} />
            <mesh name="Camera_Camera_Frame001_0" geometry={nodes.Camera_Camera_Frame001_0.geometry} material={materials['Camera_Frame.001']} />
            <mesh name="Camera_Mic_0" geometry={nodes.Camera_Mic_0.geometry} material={materials.material} />
            <mesh name="Body001_Screen_Glass_0" geometry={nodes.Body001_Screen_Glass_0.geometry} material={materials.Screen_Glass} />
            <mesh name="Button_Frame_0" geometry={nodes.Button_Frame_0.geometry} material={materials.Frame} />
            <mesh name="Circle003_Frame_0" geometry={nodes.Circle003_Frame_0.geometry} material={materials.Frame} />
            <mesh name="Apple_Logo_Logo_0" geometry={nodes.Apple_Logo_Logo_0.geometry} material={materials.Logo} />
            <mesh name="Camera001_Body_0" geometry={nodes.Camera001_Body_0.geometry} material={materials.Body} />
            <mesh name="Camera001_Gray_Glass_0" geometry={nodes.Camera001_Gray_Glass_0.geometry} material={materials.Gray_Glass} />
            <mesh name="Camera001_Flash_0" geometry={nodes.Camera001_Flash_0.geometry} material={materials.Flash} />
            <mesh name="Camera001_Port_0" geometry={nodes.Camera001_Port_0.geometry} material={materials.Port} />
            <mesh name="Camera001_Camera_Frame_0" geometry={nodes.Camera001_Camera_Frame_0.geometry} material={materials.Camera_Frame} />
            <mesh name="Camera001_Camera_Glass_0" geometry={nodes.Camera001_Camera_Glass_0.geometry} material={materials.Camera_Glass} />
            <mesh name="Camera001_Lens_0" geometry={nodes.Camera001_Lens_0.geometry} material={materials.Lens} />
            <mesh name="Camera001_Black_Glass_0" geometry={nodes.Camera001_Black_Glass_0.geometry} material={materials.Black_Glass} />
            <mesh name="Camera003_Material002_0" geometry={nodes.Camera003_Material002_0.geometry} material={materials['Material.002']} />
          </group>
        </group>
      </group>
    </group>
  )
})

useGLTF.preload('/models/custom-iphone.glb')
