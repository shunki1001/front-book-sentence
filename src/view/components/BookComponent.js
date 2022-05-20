import React from 'react'

import { Box, Divider, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import BookFace from './BookFace'
import pic from '../../static/images/example-book.png'
import SpeechBubble from './ItemsOfBookComponent/SpeechBubble'
import MemoComponent from './ItemsOfBookComponent/MemoComponent'
import { Link } from 'react-router-dom';

// 丸いアイコン
const circleButtonStyle = {
    backgroundColor: '#262628',
    borderRadius: '50%'
}

const BookComponent = () => {
    const editHandleClick = () =>{
        console.log('編集ボタンクリック')
    }
    const copyHandleClick = () =>{
        console.log('ボタンクリック')
    }
  return (
        <div id='invisibleSidebar' style={{width:'100%', overflowX:'scroll'}}>
            {/* 650/375=173% */}
            <Box sx={{display: 'flex', mt:1, width:'173%', lineHeight:'20px',fontSize: '14px','& div':{mx:1}, '& hr':{mx:1, my:0.5}}}>
                <Box sx={{width:'9%',pl:1, my:4}}> {/* 45/650=0.069 */}
                    <BookFace src={pic} />
                </Box>
                <Box sx={{width:'38%', ml:4, my:1}}> {/* 250/650=0.384 */}
                    <SpeechBubble content="prop-test" />
                </Box>
                <Divider orientation='vertical' flexItem sx={{borderWidth:1, borderColor: '#FDFEFF'}} />
                <Box sx={{width:'38%'}}> {/* 250/650=0.384 */}
                    <MemoComponent />
                </Box>
                <Divider orientation='vertical' flexItem sx={{borderWidth:1, borderColor: '#FDFEFF'}} />
                <Box sx={{width:'6%', textAlign:'center'}}> {/* 36/650=0.055 */}
                    <Link to={"/detailbook"}>
                        <IconButton style={circleButtonStyle} onClick={editHandleClick}><EditIcon /></IconButton>
                    </Link>
                    <span style={{fontSize:'10px'}}>編集</span>
                    <IconButton style={circleButtonStyle} onClick={copyHandleClick}><ContentCopyIcon /></IconButton>
                    <span style={{fontSize:'10px'}}>コピー</span>
                </Box>
            </Box>
        </div>
  )
}

export default BookComponent