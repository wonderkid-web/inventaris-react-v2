import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ContactsIcon from '@mui/icons-material/Contacts';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import OutboxIcon from '@mui/icons-material/Outbox';
import CategoryIcon from '@mui/icons-material/Category';
import {Stack} from '@mui/material'

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export const DashboardCard = ({title, number, icon}) => {
 

  return (
    <Card sx={{ minWidth: 275}}>
      <CardContent>
        <Box sx={{width: 1}}>
          <Stack direction="row" spacing={2}>
            <Box sx={{width: 1/4, color: 'rgb(25 118 208 / 1)', }}>
              {icon == 1 ? <ContactsIcon sx={{fontSize: '60px', margin: 'auto'}} /> : null}
              {icon == 2 ? <OutboxIcon sx={{fontSize: '60px', margin: 'auto'}} /> : null}
              {icon == 3 ? <MoveToInboxIcon sx={{fontSize: '60px', margin: 'auto'}} /> : null}
              {icon == 4 ? <CategoryIcon sx={{fontSize: '60px', margin: 'auto'}} /> : null}
            </Box>
            <Box sx={{width: 1}}>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="p">{number}</Typography>
            </Box>
            
          </Stack>
        </Box>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}