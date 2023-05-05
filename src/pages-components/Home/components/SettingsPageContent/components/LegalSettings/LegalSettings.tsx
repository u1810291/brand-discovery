import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { styled } from '@mui/material'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'

export const LegalSettings = () => {
  return (
    <List
      sx={{ width: '100%', bgcolor: 'white', paddingBottom: 0 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={<ListSubheaderStyled id="nested-list-subheader">Legal</ListSubheaderStyled>}
    >
      <ListItemButton onClick={() => console.error('error')}>
        <ListItemTextStyled primary="Terms of Service" color="primary" />
        <ArrowForwardIosIcon fontSize="small" sx={{ color: '#9AA09E' }} />
      </ListItemButton>
    </List>
  )
}

const ListItemTextStyled = styled(ListItemText)`
  width: 262px;
  height: 24px;

  font-family: 'Manrope';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 147.7%;
  flex: none;
  order: 0;
  flex-grow: 1;
  color: ${(color) => (color.color === 'primary' ? '#000000' : '#9aa09e')};
`

const ListSubheaderStyled = styled(ListSubheader)`
  width: 100%;
  height: 50px;
  background: #f8f9fb;
  font-family: Manrope;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  text-transform: uppercase;
  color: #747978;
  justify-content: center;
  flex: none;
  order: 0;
  flex-grow: 0;
`
