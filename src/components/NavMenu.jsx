import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const routes = [
    { name: "Home", href: "/", isActive: true },
    // { name: "Services", href: "/services", isActive: false },
    { name: "Dashboard", href: "/dashboard", isActive: false },
];

const NavMenu = ({ routes }) => (
    <>
        {routes.map((route, i) => (
            <li key={i}>
                <a
                    className={`px-4 ${route.isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
                        }`}
                    href={route.href}
                >
                    {route.name}
                </a>
            </li>
        ))}
    </>
);

NavMenu.propTypes = {
    routes: PropTypes.array.isRequired,
};
const AuthNavMenu = () => {
    const { user, logout } = useAuth();

    return (
        <>
            {!user ? (
                <li className="navbar-end space-x-2">
                    <button
                        className="btn bg-red-500 text-white hidden lg:block"
                    >
                        <Link to={'/login'}>
                            Login
                        </Link>
                    </button>
                </li>
            ) : (
                <li className="navbar-end space-x-2">
                    <button
                        onClick={logout}
                        className="btn bg-red-500 text-white hidden lg:block"
                    >
                        Logout
                    </button>
                </li>
            )}
        </>
    );
};

export const Navigation2 = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="ezy__nav2 light py-6 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative">
            <nav>
                <div className="container px-4">
                    <div className="flex justify-between items-center">
                        <a className="font-black text-3xl" href="#!">
                            Task Hub
                        </a>
                        <button
                            className="block lg:hidden cursor-pointer h-10 z-20"
                            type="button"
                            id="hamburger"
                            onClick={toggleMenu}
                        >
                            <div className="h-0.5 w-7 bg-black dark:bg-white -translate-y-2"></div>
                            <div className="h-0.5 w-7 bg-black dark:bg-white"></div>
                            <div className="h-0.5 w-7 bg-black dark:bg-white translate-y-2"></div>
                        </button>
                        <ul
                            className={`flex flex-col lg:flex-row justify-center items-center text-3xl gap-6 lg:text-base lg:gap-2 absolute h-screen w-screen top-0 left-full lg:left-0 lg:relative lg:h-auto lg:w-auto bg-white dark:bg-[#0b1727] lg:bg-transparent transition-transform duration-300 ${isMenuOpen ? "transform translate-x-0" : "transform -translate-x-full lg:translate-x-0"
                                }`}
                            id="navbar"
                        >
                            <NavMenu routes={routes} />
                            <AuthNavMenu />
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};
