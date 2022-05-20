import { Box, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { useState } from 'react';
import Overlay from './Overlay';

// 吹き出しのスタイル
const babbleStyle = {
    position: 'relative',
    display: 'inline-block',
    padding: ' 5px 0px',
    width: '100%',
    background: '#262628',
    borderRadius: '10px',
    '&::before':{
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '-30px',
        marginTop: '-15px',
        border: '15px solid transparent',
        borderRight: '15px solid #262628',
    }, 
}

const SpeechBubble = (props) => {
    const { content } = props;

    const [openContent, setOpenContent] = useState(false)

    const handleClick = () =>{
        setOpenContent(!openContent);
    }
  return (
    <Box sx={babbleStyle}>
        <div style={{overflowWrap: 'break-word', paddingBottom:'8px' ,position: 'relative'}}>
        “スタートアップとは科学のように試行錯誤するものである。だからして経験談に基づく偶発的な思考をすることは非常に愚かだといわざるを得な
            {openContent === true ? 
            <>い。引用をここに表示します。引用をここに表示します。引用をここに表示します。引用をここに表示します。引用をここに表示します。</> :
            <>...
            <Overlay styleFor='content' />
            </>
            }
            <span style={{position:'absolute', bottom:0, right:0, }}>
                {openContent === true ? 
            <IconButton onClick={handleClick} sx={{px:0, zIndex:20}}><ExpandLessIcon /></IconButton> :
            <IconButton onClick={handleClick} sx={{px:0, zIndex:20}}><ExpandMoreIcon /></IconButton>
            }
            </span>
        </div>
    </Box>
  )
}

export default SpeechBubble