

const Ground = () => {
  return (
    <mesh receiveShadow={true} castShadow={true} rotation-x={-Math.PI/2}>
        <planeGeometry args={[50,50]} />
        <meshStandardMaterial roughness={.7} color={'#cfcfcf'} />
    </mesh>
  )
}

export default Ground