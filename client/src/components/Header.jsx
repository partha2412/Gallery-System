import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Search,
    Upload,
    User,
    LogOut,
    Settings,
    Image,
    Home,
    Folder,
    Bell,
    ChevronDown,
    Menu,
    X,
} from "lucide-react";

export default function Header() {
    const navigate = useNavigate();

    // Replace with your auth context
    const isLoggedIn = true;

    const user = {
        name: "Partha",
        email: "parthasingh35@gmail.com",
    };

    const [profileOpen, setProfileOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const profileRef = useRef(null);

    useEffect(() => {
        const close = (e) => {
            if (!profileRef.current?.contains(e.target)) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", close);

        return () => {
            document.removeEventListener("mousedown", close);
        };
    }, []);

    const logout = () => {
        // await logout api
        navigate("/login");
    };

    return (
        <header className="sticky top-0 z-50 border-b border-sky-500/10 bg-[#07111f]/80 backdrop-blur-2xl">

            <div className="mx-auto flex h-16 w-full items-center justify-between px-6">

                {/* Logo */}

                <Link
                    to="/"
                    className="group flex items-center gap-4"
                >

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-sky-500 to-cyan-500 shadow-lg shadow-sky-500/20 transition duration-300 group-hover:scale-105">

                        <Image
                            size={22}
                            className="text-white"
                        />

                    </div>

                    <div>

                        <h1 className="text-lg font-bold tracking-wide text-white">
                            StudyZone
                        </h1>

                        <p className="text-xs text-sky-300">
                            AI Workspace
                        </p>

                    </div>

                </Link>



                {/* Right */}

                <div className="flex items-center gap-4">

                    <button className="w-20 cursor-pointer" onClick={()=>navigate("/gallery")}>
                        <div className="">
                            <span className="text-amber-50">Gallery</span>
                        </div>
                    </button>

                    <button
                        className="rounded-xl p-2 text-sky-200 transition hover:bg-sky-500/10 hover:text-white"
                    >
                        <Bell size={20} />
                    </button>

                    <div
                        className="relative"
                        ref={profileRef}
                    >

                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center gap-3 rounded-2xl border border-sky-500/10 bg-sky-500/5 px-3 py-2 transition hover:border-sky-400/30 hover:bg-sky-500/10"
                        >

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 font-bold text-white">
                                {user.name[0]}
                            </div>

                            <ChevronDown
                                size={18}
                                className="text-sky-300"
                            />

                        </button>

                        {profileOpen && (

                            <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-3xl border border-sky-500/10 bg-[#0c1728] shadow-2xl shadow-black/40">

                                <div className="border-b border-sky-500/10 p-6">

                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 text-2xl font-bold text-white">
                                        {user.name[0]}
                                    </div>

                                    <h3 className="font-semibold text-white">
                                        {user.name}
                                    </h3>

                                    <p className="mt-1 text-sm text-sky-200">
                                        {user.email}
                                    </p>

                                </div>

                                <button
                                    onClick={() => navigate("/gallery")}
                                    className="flex w-full items-center gap-3 px-6 py-4 text-left text-zinc-200 transition hover:bg-sky-500/10"
                                >
                                    <Image size={18} />
                                    Gallery
                                </button>

                                <button
                                    onClick={() => navigate("/profile")}
                                    className="flex w-full items-center gap-3 px-6 py-4 text-left text-zinc-200 transition hover:bg-sky-500/10"
                                >
                                    <User size={18} />
                                    Profile
                                </button>

                                <button
                                    onClick={() => navigate("/settings")}
                                    className="flex w-full items-center gap-3 px-6 py-4 text-left text-zinc-200 transition hover:bg-sky-500/10"
                                >
                                    <Settings size={18} />
                                    Settings
                                </button>

                                <div className="mx-5 border-t border-sky-500/10" />

                                <button
                                    onClick={logout}
                                    className="flex w-full items-center gap-3 px-6 py-4 text-left text-red-400 transition hover:bg-red-500/10"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </header>
    );
}