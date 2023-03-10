import JobListTable from "./table";
import connectMongodb from "../utility/connectMongodb";
import JobApplied from "../models/jobModel";

export const getServerSideProps = async () => {
  try {
    // console.log('CONNECTION TO MONGO');
    await connectMongodb();
    // console.log('CONNECTED TO MONGODB');
    // console.log('FETCHING DOCUMENT');
    const jobs = await JobApplied.find().sort({ updated_at: -1});
    // console.log('DOCUMENT FETCHED');

    return {
      props: {
        jobs: JSON.parse(JSON.stringify(jobs))
      },
    };

  } catch (err) {
    res.json({ err });
    return {
      notFound: true,
    };
  }

}

const JobList = ({jobs}) => {

  return ( 
    <>
      <h1>Job Application List</h1>
      <p>Here shows the jobs you have already applied</p>
      <JobListTable jobs={jobs}/>
    </>
   );
}
 
export default JobList;