import { Box, Typography } from '@mui/material'
import React from 'react'

export default function NoPage() {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      alignItems: "center",
      marginBlock: "3rem",
    }}>
      <Typography variant="h1" component={"h1"}>404</Typography>
      <Typography>Página não encontrada</Typography>
    </Box>
  )
}
