import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full h-12 shadow-md flex items-center justify-start">
      <div className="px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* Logo */}
            <div>
              <Link href="/">
                <span className="font-bold text-2xl">MDX Blog</span>
              </Link>
            </div>
          </div>

          {/* Links section */}
          {/* <div className="hidden md:flex items-center space-x-1">
            <Link href="/">Home</Link>
            
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
