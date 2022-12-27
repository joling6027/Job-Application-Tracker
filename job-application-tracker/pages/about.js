import styles from '../styles/Home.module.css'

const About = () => {
  return ( 
    <div>
      <h1>About</h1>
      <p>Job application tracker is a tool that helps job seekers manage and organize the jobs they have applied to. It allows users to keep track of their job applications, including the job title, company, and date applied.</p>
        The job application tracker have the following features:
        <ul>
          <li>A list view that displays all of the user's job applications, including the job title, company name, and date applied.</li>
          <li>The abliity to add new job applications by entering the job title, company name, and date applied.</li>
          <li>The abliity to edit or delete existing job applications.</li>
          <li>A search function that allows users to search for specific job applications by job title, company name, or date applied.</li>
          <li>A notification system that reminds users to follow up on their job applications at a specified interval.</li>
          <li>The abliity to categorize job applications by status (e.g. "pending," "interview scheduled," "offer received," etc.).</li>
          <li>A calendar view that displays the user's job application deadlines and interviews.</li>
          <li>The abliity to export the job application tracker data as a CSV flie for easy importing into other tools or systems.</li>
        </ul>
    </div>
   );
}
 
export default About;