import MyResponsiveLine from '../components/LineChart'
import MyResponsivePie from '../components/PieChart'
import MyResponsiveBar from '../components/BarChart';
import data from '../data/data';
import pieData from '../data/data_pie';
import barData from '../data/data_bar';
import { Box, Grid, Typography, Card, CardContent, CardActionArea } from '@mui/material';

const Statistic = () => {
  return (
    // <div className="statistic">

    <Grid container spacing={2} sx={{ height: 1000 }}>
        <Grid item xs={6}>
          <h1>Job Applied Each Month</h1>
          <Box sx={{ width: 550, height: 300 }}>
            <MyResponsiveLine data={data} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <h1>Skills Required</h1>
          <Box sx={{ width: 600, height: 300 }}>
            <MyResponsivePie data={pieData}/>
          </Box>
        </Grid>
        <Grid item xs={6}>
        <h1>Location Distribution</h1>
          <Box sx={{ width: 550, height: 300 }}>
            <MyResponsiveBar data={barData} />
          </Box>
        </Grid>
        <Grid item xs={6}>
        <h1>Status Statistic</h1>
        <Card sx={{ maxWidth: 550, height: 300 }}>
          {/* <CardActionArea sx={{ maxWidth: 550, height: 300 }}> */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                As For Today (2023/01/02)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <h3>Total Application sent:</h3>
                <h3>Pending:</h3>
                <h3>Rejected:</h3>
                <h3>Interview Scheduled:</h3>
                <h3>Offer Received:</h3>
              </Typography>
            </CardContent>
          {/* </CardActionArea> */}
        </Card>
        </Grid>
      </Grid>
    // </div>
  );
}

export default Statistic;