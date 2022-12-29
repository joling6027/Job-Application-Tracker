import connectMongodb from '../../../utility/connectMongodb';
import JobApplied from '../../../models/jobModel';

export default async function handler(req, res){

  const { method } = req
  const { jobid } = req.query
  await connectMongodb();

  switch(method){
    case 'GET':
      try {
        const job = await JobApplied.find((job) => job._id === jobid)
        res.status(200).json(job);

      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    case 'DELETE':
      try {
        const deleteJob = await JobApplied.deleteOne({_id: jobid})
        res.status(200).json(deleteJob);

      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;

  }

  
  
}