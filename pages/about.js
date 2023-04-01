import Head from 'next/head'

const About = () => {
  return (
    <div>
      <Head>
        <title>Job Application Tracker - About</title>
      </Head>
        <h1>About Job Application Tracker</h1>
      <p>Job application tracker is a tool that helps job seekers manage and organize the jobs they have applied to. It allows users to keep track of their job applications, including the job title, company, and date applied.</p>
      The job application tracker have the following features:
      <ul>
        <li>A list view that displays all of the user's job applications, including the job title, company name, and date applied.</li>
        <li>The ability to add new job applications by entering the job title, company name, and date applied.</li>
        <li>The ability to edit or delete existing job applications.</li>
        <li>A search function that allows users to search for specific job applications by job title, company name, or date applied.</li>
        <li>The ability to categorize job applications by status (e.g. "pending," "interview scheduled," "offer received," etc.).</li>
      </ul>
      <h3>Upcoming features</h3>
      <ul>
        <li>Sign in/ sign up for multiple users</li>
        <li>A notification system that reminds users to follow up on their job applications at a specified interval.</li>
        <li>A calendar view that displays the user's job application deadlines and interviews.</li>
      </ul>

      <h1>About The Author</h1>
      <p>Joling is an Information Systems student with 1.5 years of experience in software development, network security, and database management. She has built several full-stack projects using technologies such as Next.js, Node.js, React.js, and PHP, and has experience with both SQL and NoSQL databases.</p>
    </div>
  );
}

export default About;