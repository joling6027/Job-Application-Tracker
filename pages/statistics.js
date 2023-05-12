import MyResponsiveLine from '../components/LineChart';
import MyResponsivePie from '../components/PieChart';
import MyResponsiveBar from '../components/BarChart';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import moment from 'moment/moment';
import styles from './statistics.module.css';

export const getServerSideProps = async () => {
  // const URL = "http://localhost:3000"
  const URL = "https://job-application-tracker-pgl7.vercel.app"
  const endpoint = '/api/test/queries'

  try {
    const response = await fetch(URL + endpoint)
    const data = await response.json();
    console.log(data)
    return {
      props: {
        status_stat: JSON.parse(JSON.stringify(data.status_stat)),
        jobAppliedCount: JSON.parse(JSON.stringify(data.jobAppliedCount)),
        skillsCount: JSON.parse(JSON.stringify(data.skillsCount)),
        applicationCount: JSON.parse(JSON.stringify(data.applicationCount)),
        locationDistribution: JSON.parse(JSON.stringify(data.locationDistribution))
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        status_stat: [],
        jobAppliedCount: [],
        skillsCount: [],
        applicationCount: 0,
        locationDistribution: []
      },
    };
  }

}

const Statistic = ({ status_stat, jobAppliedCount, skillsCount, applicationCount, locationDistribution }) => {

  const data_line = [
    {
      "id": "Job Applied",
      "data": jobAppliedCount
    }
  ]

  return (
    <div className={styles['chart-container']}>
      <div className={styles['chart-item']}>
        <h1>Job Applied Each Month</h1>
        <Box sx={{ height: 300 }}>
          <MyResponsiveLine data={data_line} />
        </Box>
      </div>
      <div className={styles['chart-item']}>
        <h1>Skills Required</h1>
        <Box sx={{ height: 300, minWidth: 300 }}>
          <MyResponsivePie data={skillsCount} />
        </Box>
      </div>
      <div className={styles['chart-item']}>
        <h1>Location Distribution</h1>
        <Box sx={{ height: 300 }}>
          <MyResponsiveBar data={locationDistribution} />
        </Box>
      </div>
      <div className={styles['chart-item']}>
        <h1>Status Statistics</h1>
        <Card sx={{ height: 300 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              As of Today ({moment().format('LL')})
            </Typography>
            <Typography variant="h6" gutterBottom>Total Application sent: {applicationCount}</Typography>
            {status_stat && status_stat.map((stat) => (
              <Typography variant="h6" gutterBottom key={Math.random()}>{stat.status}: {stat.count}</Typography>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Statistic;