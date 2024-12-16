'use client'

import {
  AppBar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { KeyboardArrowDown } from '@mui/icons-material'
import { useState } from 'react'

export default function AudioTranscription() {
  const [knowledgeAnchor, setKnowledgeAnchor] = useState<null | HTMLElement>(null)
  const [financeAnchor, setFinanceAnchor] = useState<null | HTMLElement>(null)
  const [toolsAnchor, setToolsAnchor] = useState<null | HTMLElement>(null)

  return (
    <Box sx={{ bgcolor: '#4b4b4b' }}>
      <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: 'none' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: 'black',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              好理家在
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                endIcon={<KeyboardArrowDown />}
                onClick={(e) => setKnowledgeAnchor(e.currentTarget)}
                sx={{ color: 'black' }}
              >
                知識庫
              </Button>
              <Menu
                anchorEl={knowledgeAnchor}
                open={Boolean(knowledgeAnchor)}
                onClose={() => setKnowledgeAnchor(null)}
              >
                <MenuItem>Option 1</MenuItem>
                <MenuItem>Option 2</MenuItem>
              </Menu>

              <Button
                endIcon={<KeyboardArrowDown />}
                onClick={(e) => setFinanceAnchor(e.currentTarget)}
                sx={{ color: 'black' }}
              >
                財務快餐
              </Button>
              <Menu
                anchorEl={financeAnchor}
                open={Boolean(financeAnchor)}
                onClose={() => setFinanceAnchor(null)}
              >
                <MenuItem>Option 1</MenuItem>
                <MenuItem>Option 2</MenuItem>
              </Menu>

              <Button
                endIcon={<KeyboardArrowDown />}
                onClick={(e) => setToolsAnchor(e.currentTarget)}
                sx={{ color: '#0066cc' }}
              >
                工具箱
              </Button>
              <Menu
                anchorEl={toolsAnchor}
                open={Boolean(toolsAnchor)}
                onClose={() => setToolsAnchor(null)}
              >
                <MenuItem>Option 1</MenuItem>
                <MenuItem>Option 2</MenuItem>
              </Menu>

              <Typography sx={{ color: 'black' }}>解決麻煩事</Typography>

              <Button
                variant="contained"
                sx={{
                  bgcolor: '#cc0000',
                  '&:hover': { bgcolor: '#aa0000' },
                  borderRadius: 0,
                  px: 3,
                }}
              >
                登入
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}

