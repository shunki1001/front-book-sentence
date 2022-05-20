import { Box, Divider, IconButton, Button, Typography, Dialog, DialogTitle } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { Link } from 'react-router-dom';

import Header from './components/Header'
import BookFace from './components/BookFace'
import pic from '../static/images/example-book.png'
import { useState } from 'react';



const DetailBook = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpenModal =()=>{
    setOpen(true);
  }
  const handleClose = () =>{
    setOpen(false)
  }

  return (
    <div>
      <Header HeaderName="センテンス登録"/>
      <Box sx={{display:'flex', mx:2, my:4, justifyContent: 'center', alignItems:'center'}}>
        <Box sx={{width: '13%', mx:2}}> {/* 45/(375-20*2)=0.134 */}
            <BookFace src={pic} />
        </Box>
        <Box sx={{my:1, maxWidth: '195px'}} flexGrow={1}>
            <Typography variant='h6'>起業の科学</Typography>
            <Typography variant='p'>田所雅之</Typography>
        </Box>
        <Box sx={{width: '70px',height:'70px',background: '#282826', borderRadius: '10px', textAlign:'center',p:1}}>
          <IconButton size='large' sx={{pb:0}}><CameraAltIcon /></IconButton>
          <p style={{fontSize: '10px', marginTop:0}}>（必須）</p>
        </Box>
      </Box>
      <Box sx={{mx:3, '& p':{my:1, lineHeight: 1.5, fontSize: '16px'}}}>
        <Typography variant='caption'>センテンス</Typography>
        <Typography>“スタートアップとは科学のように試行錯誤するものである。だからして経験談に基づく偶発的な思考をすることは非常に愚かだといわざるを得ない。</Typography>
        <Divider variant='middle' />
        <Typography variant='caption'>メモ</Typography>
        <Typography>メモをここに表示します。メモをここに表示します。メモをここに表示します。メモをここに表示します。メモをここに表示します。メモをここに表示します。</Typography>
        <Divider variant='middle' />
        <Typography variant='caption'>タグ</Typography>
        <Typography>#ビジネス #起業 #名言 </Typography>
        <Divider variant='middle' />
      </Box>
      <Box sx={{mx:3,mt:6, '& button':{my:1}}}>
        <Button fullWidth variant='contained' sx={{borderRadius:'10px', color:'#0a0a0a', fontSize:'20px'}} onClick={handleClickOpenModal}>送信</Button>
        <Link to="/listbook" style={{textDecoration:'none'}}><Button variant='outlined' fullWidth sx={{borderRadius:'10px', fontSize:'20px'}}>戻る</Button></Link>
      </Box>

      {/* 送信前ダイアログ */}
      <Dialog open={open} onClose={handleClose} fullWidth sx={{textAlign:'center'}} >
        <DialogTitle color='secondary'>送信が完了しました！</DialogTitle>
        <Box sx={{mx:3, '& button':{my:1}}}>
          <Link to="/listbook" style={{textDecoration:'none'}}><Button fullWidth variant='contained' color='success' sx={{borderRadius:'10px', fontSize:'20px'}}>連続で投稿する</Button></Link>
          <Link to="/mysentence" style={{textDecoration:'none'}}><Button variant='outlined' color='secondary' fullWidth sx={{borderRadius:'10px', fontSize:'20px'}}>マイセンテンスに戻る</Button></Link>
        </Box>
      </Dialog>

      {/* カメラアップロードダイアログ */}
      
    </div>
  )
}

export default DetailBook