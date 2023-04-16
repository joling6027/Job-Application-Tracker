# Job-Application-Tracker
Job application tracker is a tool that helps job seekers manage and organize the jobs they have applied to. It allows users to keep track of their job applications, including the job title, company, and date applied.

Demo: [Job application Tracker](https://job-application-tracker-pgl7.vercel.app/statistics)

## Table of Contents
- [Installation & Usage](#installationusage)
- [Examples](#examples)
- [Contributing](#contributing)

## Installation&Usage

To install and run Job Application Tracker, follow these steps:
1. Make sure you have Node.js and MongoDB installed.
2. Clone the repository to your local folder.
3. Create a .env file in your root folder and put your local mongoDB URL such as: MONGODB_URI="mongodb://localhost:27017/your_db_name"
4. Navigate to the folder, first run `npm intall` to install the dependencies and then run `npm run dev` to run the program.
5. Open your browser and navigate to localhost:3000. (make sure it's running on port 3000, otherwise you'll need to change the url in statistics.js page to the corresponding port.)
6. Now you can use it to track your job applications.

## Examples

1. Enter the job you just applied
<img src="https://github.com/joling6027/Job-Application-Tracker/blob/main/JAT_index.JPG" alt="enter new job application" style="height: 300px; width:550px;"/>

2. Manage your records ( update status or simply delete it)
<img src="https://github.com/joling6027/Job-Application-Tracker/blob/main/public/JAT_joblist.JPG" alt="job list" style="height: 300px; width:550px;"/>

3. Personalized statistics
<img src="https://github.com/joling6027/Job-Application-Tracker/blob/main/public/JAT_statistics.JPG" alt="job list" style="height: 300px; width:550px;"/>

## Contributing

- Fork the repository.
- Make your changes in a new branch.
- Submit a pull request.
