import Link from "next/link";
import { useState } from "react";
import { SiFigshare } from "react-icons/si";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import { useSession, signOut, signIn } from "next-auth/react";
import ThemeToggle from "./theme-toggle";

const NavBar = () => {
  const { data: session } = useSession();

  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className="backdrop-blur-md flex items-center flex-wrap bg-quinary dark:bg-primary p-3 w-full lg:mx-auto justify-between sticky top-0 z-50 ">
        <Link href="/">
          <a className="inline-flex items-center p-2 mr-4 pl-0 lg:ml-72">
            <SiFigshare className="text-black dark:text-white lg:mr-2 lg:text-2xl text-xl mr-1" />
            <span className="text-xl text-black dark:text-white font-bold uppercase tracking-wide">
              Share U
            </span>
          </a>
        </Link>

        {/* Responsive Button */}
        <button
          className="inline-flex p-3 hover:bg-secondary rounded lg:hidden text-black dark:text-white hover:text-white  outline-none"
          onClick={handleClick}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}

        <div
          className={`${
            active ? "" : "hidden"
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className="flex flex-col lg:flex-row justify-between w-full lg:items-center lg:mr-72  ">
            <div>
              <Link href="/">
                <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black dark:text-white hover:text-white  font-bold items-center justify-center  lg:hover:bg-secondary ">
                  {session ? (
                    <div className="flex flex-row items-center">
                      <FaSignOutAlt className="mr-2" />
                      <button
                        className="md:mb-0 lg:mb-0"
                        onClick={() => signOut()}
                      >
                        {session?.user?.name}
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-row items-center">
                      <FaSignInAlt className="mr-2" />
                      <button
                        className="md:mb-0 lg:mb-0"
                        onClick={() => signIn("google")}
                      >
                        SignIn
                      </button>
                    </div>
                  )}
                </a>
              </Link>
              <Link href="/">
                <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black dark:text-white hover:text-white font-bold items-center justify-center   lg:hover:bg-secondary">
                  <div className="flex flex-row items-center">
                    <AiFillGithub className="mr-2" />
                    GitHub
                  </div>
                </a>
              </Link>
            </div>

            {/* Dark Toggle Button */}
            <ThemeToggle />
            {/* Dark Toggle Ends Here */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
