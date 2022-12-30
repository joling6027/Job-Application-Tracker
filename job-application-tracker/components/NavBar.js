import Link from 'next/link';
import Image from 'next/image';

const NavBar = () => {
  return ( 
    <nav>
      <div className="logo">
        <Image src="/Job_application_tracker_logo.png" alt="" width={128} height={100} />
      </div>
      <Link href="/">Home</Link>
      <Link href="/joblist">Job List</Link>
      <Link href="/statistic">Statistic</Link>
      <Link href="/about">About</Link>
    </nav>
   );
}
 
export default NavBar;