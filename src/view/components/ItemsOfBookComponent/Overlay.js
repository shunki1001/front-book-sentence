// オーバーレイのスタイル
const overlayStyleContent = {
    background: 'linear-gradient(180deg, rgba(38,38,40,0) 0%, rgba(38,38,40,1) 100%)',
    width:'100%',
    height:'3.5em', 
    margin: 0,
    position:'absolute',
    bottom:0,
    left:0,
    zIndex:10,
    opacity: 0.8
}
const overlayStyleMemo = {
  background: 'linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,1) 100%)',
  width:'100%',
  height:'3.5em', 
  margin: 0,
  position:'absolute',
  bottom:0,
  left:0,
  zIndex:10,
  opacity: 0.8
}

const Overlay = (props) => {
  const {styleFor} = props;

  if (styleFor === 'content'){
    return <div style={overlayStyleContent}></div>
  }else{
    return <div style={overlayStyleMemo}></div>
  }
  
}

export default Overlay