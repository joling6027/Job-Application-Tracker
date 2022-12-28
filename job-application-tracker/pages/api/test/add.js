import connectMongodb from '../../../utility/connectMongodb';
import JobApplied from '../../../models/jobModel';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function addTest(req, res) {
  // const { appliedDate, companyName, location, title, skills } = req.body;

  try {
    console.log('CONNECTION TO MONGO');

    await connectMongodb();
    console.log('CONNECTED TO MONGODB');

    console.log('CREATING DOCUMENT');
    const job = await JobApplied.create(req.body);
    console.log('DOCUMENT CREATED');

    res.json({ job });

  } catch (err) {
    res.json({ err });
  }


}

