import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { chapters } from 'src/constants/termOfUse'
import { useWindowSize } from 'src/hooks'
import { MainLayout } from 'src/layouts/MainLayout'

export const TermsOfUse = () => {
  const listRef = useRef<HTMLDivElement | null>(null)
  const selectChapter = (index: number) => {
    listRef.current?.children[index].scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const { height } = useWindowSize()
  const router = useRouter()

  return (
    <MainLayout
      showBackButton
      sx={{ backgroundColor: 'rgba(248, 249, 251, 1)' }}
      padding={0}
      headerProps={{
        paddingTop: 3,
        paddingBottom: 2,
        marginBottom: 0,
        sx: { backgroundColor: 'rgba(255, 255, 255, 1)' },
      }}
      navbar={
        <Stack direction="row" alignItems="center" width="100%">
          <Typography width="100%" textAlign="center" fontWeight={800} fontSize={18} lineHeight="25px">
            Terms of use
          </Typography>
          <Button onClick={() => router.back()} sx={{ fontSize: 18, fontWeight: 800, lineHeight: '25px' }}>
            Done
          </Button>
        </Stack>
      }
    >
      <Stack
        sx={{ backgroundColor: 'rgba(255, 255, 255, 1)', height: `calc:${height} - 96px`, overflowY: 'auto' }}
        flex={1}
        paddingX={3}
      >
        <Typography fontWeight={800} fontSize={40} lineHeight="55px" textAlign="center" marginBottom={3}>
          Terms Of Use
        </Typography>
        <Stack spacing={2} color="rgba(116, 121, 120, 1)" divider={<Divider sx={{ marginBlock: 1.25 }} />}>
          <Text>
            The popupshops.com-Website (the “Site”) is a service for our registered users and visitors and is owned and
            operated by Spacewise Ltd. (“POP UP SHOPS”, “We” or “Us”). This service consists of an online platform and
            allows landlords (as defined below) to list a property and to directly conclude rental transactions with
            tenants with the help of the provided online tools (collectively our “Service”).
          </Text>
          <List component="ol">
            {chapters.map((item, index) => (
              <ListItem key={item.title} onClick={() => selectChapter(index)}>
                {item.title}
              </ListItem>
            ))}
          </List>
          <Stack ref={listRef}>
            {chapters.map((item) => (
              <Stack key={item.title} spacing={1}>
                <Title>{item.title}</Title>
                {item.content.map((text, textIndex) => (
                  <Text key={textIndex}>{text}</Text>
                ))}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </MainLayout>
  )
}

const Text = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  white-space: pre-wrap;
`

const Title = styled(Typography)`
  font-weight: 800;
  font-size: 18px;
  line-height: 27px;
  color: rgba(0, 0, 0, 1);
`
