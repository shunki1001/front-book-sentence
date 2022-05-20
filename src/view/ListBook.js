import { Box, IconButton } from '@mui/material'
import React from 'react'
import BarcodeIcon from './components/CustomIcon/BarcodeIcon'

import Header from './components/Header'
import Search from './components/Search'
import BookInfo from './components/BookInfo'

const ListBook = () => {
  const handleClickReader = () =>{
    console.log("バーコードリーダー起動")
  }
  return (
    <div>
      <Header HeaderName="書籍登録"/>
      <Box sx={{width:'100%', display:'flex', px:'20px'}}>
        <Search label="タイトル、著者" />
        <IconButton sx={{background: '#282826', borderRadius: '10px', mt:2, ml:1, pt:1.5,pr:1.5,'&:hover':{backgroundColor: '#282826'}}} onClick={handleClickReader}>
          <BarcodeIcon />
        </IconButton>
      </Box>
      <BookInfo />
      <BookInfo />
      <BookInfo />
      <BookInfo />
      <BookInfo />
    </div>
  )
}

export default ListBook
