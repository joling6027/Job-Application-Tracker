import Link from 'next/link';
import Image from 'next/image';

const NavBar = () => {
  return ( 
    <nav>
      <div className="logo">
        <Image src="/JobApplicationTracker_logo.png" alt="" width={128} height={70} />
      </div>
      <Link href="/">Home</Link>
      <Link href="/joblist">Job List</Link>
      <Link href="/about">About</Link>
    </nav>
   );
}
 
export default NavBar;