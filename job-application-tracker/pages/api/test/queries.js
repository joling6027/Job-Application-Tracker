import connectMongodb from '../../../utility/connectMongodb';
import JobApplied from '../../../models/jobModel';

export default async function handler(req, res) {

  const { method } = req
  // const { } = req.query

  await connectMongodb();
  if(method === 'GET'){
    try {
      const applicationCount = await JobApplied.find({}).count();
      const status_stat = await JobApplied.aggregate([
        { $match: { status: { $exists: true } } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
        {
          $project: {
            _id: 0,
            "status": "$_id",
            "count": 1
          }
        },
      ]);
      const jobAppliedCount = await JobApplied.aggregate([
        {
          $group: {
            _id: { $substr: ['$appliedDate', 0, 7] },
            y: { $sum: {$toInt: 1} }
          }
        },
        {
          $project: {
            _id: 0,
            x: "$_id",
            y: 1,
          }
        },
        { $sort: { x: 1 } },
        { $limit: 6 }
      ])
      const skillsCount = await JobApplied.aggregate([
        { $unwind: "$skills" },
        { $group: { _id: "$skills", value: { $sum: { $toInt: 1 } } } },
        {
          $project: {
            _id: 0,
            id: "$_id",
            value: 1
          }
        }
      ])

      //location distribution
      const locationDistribution = await JobApplied.aggregate([
        { $group: { _id: "$location", count: { $sum: 1 } } },
        {
          $project: {
            _id: 0,
            city: "$_id",
            jobs: "$count"
          }
        }
      ])

      res.status(200).json({ status_stat, jobAppliedCount, skillsCount, applicationCount, locationDistribution })

    } catch (error) {
      res.status(400).json({ success: false })
    }
  }

}