
const Item = ({name, selected , onClick}) => {
  return (
    <div className={`item ${selected === name ? 'selected' : ''}`} onClick={onClick}><p>{name}</p></div>
  )
}

export default Item