import Link from 'next/link';

const NavBar = () => {
  return ( 
    <nav>
      <div className="logo">
        
      </div>
      <Link href="/">Home</Link>
      <Link href="/joblist">Job List</Link>
      <Link href="/about">About</Link>
    </nav>
   );
}
 
export default NavBar;