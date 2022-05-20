import { useState } from 'react'

import { Typography, IconButton } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import Overlay from './Overlay';

const MemoComponent = () => {
    const [memoOpen, setMemoOpen] = useState(false);

    const handleClick = () =>{
        setMemoOpen(!memoOpen)
    }

  return (
    <>
        <Typography variant='h6'>Memo</Typography>
        <div style={{overflowWrap: 'break-word', paddingBottom:'8px',paddingTop:'8px',position:'relative', width:'100%'}}>
            メモをここに残す。メモをここに残す。メモをここに残す。メモをここに残す。メモをここに残す。メモをここに残す。メモをここに残す。メモを
            {memoOpen === true ? 
            <>ここに残す。メモをここに残す。メモをここに残す。メモをここに残す。メモをここに残す。</> :
            <>...
            <Overlay props='memo' />
            </>
            }
            <span style={{position:'absolute', bottom:0, right:0, }}>
            {memoOpen === true ? 
            <IconButton onClick={handleClick} sx={{px:0, zIndex:20}}><ExpandLessIcon /></IconButton> :
            <IconButton onClick={handleClick} sx={{px:0, zIndex:20}}><ExpandMoreIcon /></IconButton>
            }
            </span>
        </div>
    </>
  )
}

export default MemoComponent