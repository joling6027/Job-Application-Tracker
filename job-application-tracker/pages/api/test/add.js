import connectMongodb from '../../../utility/connectMongodb';
import JobApplied from '../../../models/jobModel';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function handler(req, res) {
  // const { appliedDate, companyName, location, title, skills } = req.body;

  // try {
  //   console.log('CONNECTION TO MONGO');

  //   await connectMongodb();
  //   console.log('CONNECTED TO MONGODB');

  //   console.log('CREATING DOCUMENT');
  //   const job = await JobApplied.create(req.body);
  //   console.log('DOCUMENT CREATED');

  //   res.json({ job });

  // } catch (err) {
  //   res.json({ err });
  // }

  const { method } = req

  await connectMongodb();

  switch (method) {
    case 'GET':
      try {
        const jobs = await JobApplied.find({})
        res.status(200).json({ success: true, jobs })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const jobs = await JobApplied.create(req.body)
        res.status(201).json({ success: true, jobs })
      } catch (error) {
        res.status(400).json(error)
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }



}

