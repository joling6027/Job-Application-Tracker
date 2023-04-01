import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from 'next/head';

const NotFoundPage = () => {

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    },3000)

  },[])

  return ( 
    <div>
      <Head>
        <title>Job Application Tracker - Page Not Found</title>
      </Head>
      <h1>Page Not Found</h1>
      <p>Go back to the <Link className="not-found-link" href="/">Home Page</Link></p>
    </div>
   );
}
 
export default NotFoundPage;