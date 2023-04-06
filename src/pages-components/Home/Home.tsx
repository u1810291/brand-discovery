import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import SettingsIcon from '@mui/icons-material/Settings'
import { Box } from '@mui/material'
import { TabsPanel } from 'src/components/TabsPanel'
import { MainLayout } from 'src/layouts/MainLayout'

const tabs = [
  { icon: <HomeIcon />, content: <Box>Slider</Box> },
  { icon: <FavoriteBorderIcon />, content: <Box>Like</Box> },
  { icon: <InfoIcon />, content: <Box>Info</Box> },
  { icon: <SettingsIcon />, content: <Box>Setting</Box> },
]

export const Home = () => {
  return (
    <MainLayout>
      <TabsPanel tabs={tabs} />
    </MainLayout>
  )
}
