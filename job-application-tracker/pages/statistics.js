import MyResponsiveLine from '../components/LineChart'
import MyResponsivePie from '../components/PieChart'
import MyResponsiveBar from '../components/BarChart';
import data from '../data/data';
import pieData from '../data/data_pie';
import barData from '../data/data_bar';
import { Box, Grid, Typography, Card, CardContent, CardActionArea } from '@mui/material';
import moment from 'moment/moment';

export const getServerSideProps = async () => {
  const URL = "http://localhost:3000"
  const endpoint = '/api/test/queries'

  const response = await fetch(URL + endpoint)
  const data = await response.json();
  // console.log(data)
      return {
      props: {
          status_stat: JSON.parse(JSON.stringify(data.status_stat)),
          jobAppliedCount: JSON.parse(JSON.stringify(data.jobAppliedCount))
      },
    };
}

const Statistic = ({ status_stat, jobAppliedCount }) => {

  console.log(jobAppliedCount)
  console.log(status_stat)

  const data_line = [
    {
      "id": "Job Applied",
      "data": jobAppliedCount
    }
  ]
  

  return (
    // <div className="statistic">

    <Grid container spacing={2} sx={{ height: 1000 }}>
        <Grid item xs={6}>
          <h1>Job Applied Each Month</h1>
          <Box sx={{ width: 550, height: 300 }}>
          <MyResponsiveLine data={data_line} />
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
        <h1>Status Statistics</h1>
        <Card sx={{ maxWidth: 550, height: 300 }}>
          <CardActionArea sx={{ maxWidth: 550, height: 300 }}>
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                As of Today ({moment().format('LL')})
              </Typography>
              <Typography variant="h5" gutterBottom>Total Application sent: </Typography>
              {status_stat && status_stat.map((stat) => (
                <Typography variant="h5" gutterBottom>{stat.status}: {stat.count}</Typography>
              ))}
            </CardContent>
          </CardActionArea>
        </Card>
        </Grid>
      </Grid>
    // </div>
  );
}

export default Statistic;