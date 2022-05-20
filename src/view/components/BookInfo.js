import { Box, Typography } from '@mui/material'

import BookFace from './BookFace'
import pic from '../../static/images/example-book.png'

const BookInfo = () => {
  return (
    <Box sx={{display:'flex', mx:2, my:4}}>
        <Box sx={{width: '13%', mx:2}}> {/* 45/(375-20*2)=0.134 */}
            <BookFace src={pic} />
        </Box>
        <Box sx={{my:1}}>
            <Typography variant='h6'>起業の科学</Typography>
            <Typography variant='p'>田所雅之</Typography>
        </Box>
    </Box>
  )
}

export default BookInfo