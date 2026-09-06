import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
    User,
    LogOut,
    Settings,
    Image as ImageIcon,
    Bell,
    ChevronDown,
    Menu,
    X,
    Sparkles,
} from "lucide-react";

export default function Header() {
    const navigate = useNavigate();

    const {
        user,
        isLoggedIn,
        logout,
    } = useAuth();

    const [profileOpen, setProfileOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const profileRef = useRef(null);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const close = (e) => {
            if (!profileRef.current?.contains(e.target)) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", close);

        return () =>
            document.removeEventListener("mousedown", close);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error(err);
        }

        setProfileOpen(false);
        setMobileOpen(false);
        navigate("/login");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-black/[0.06] bg-white/80 backdrop-blur-xl">

            {/* ========================================= */}
            {/* DESKTOP / MAIN HEADER */}
            {/* ========================================= */}

            <div className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

                {/* ===================================== */}
                {/* BRAND */}
                {/* ===================================== */}

                <Link
                    to="/"
                    className="group flex items-center gap-3 no-underline"
                >
                    {/* Logo */}

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111111] text-white shadow-sm transition-transform duration-200 group-hover:scale-[1.03]">
                        <Sparkles
                            size={17}
                            strokeWidth={1.8}
                        />
                    </div>

                    {/* Brand text */}

                    <div className="hidden sm:block">
                        <h1 className="text-[14px] font-semibold tracking-[-0.02em] text-[#111111]">
                            Media Operator
                        </h1>

                        <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.15em] text-black/30">
                            File folders
                        </p>
                    </div>
                </Link>

                {/* ===================================== */}
                {/* DESKTOP MENU */}
                {/* ===================================== */}

                <div className="hidden items-center gap-2 sm:flex">

                    {/* Gallery */}

                    <Link
                        to="/gallery"
                        className="group flex h-10 items-center gap-2 rounded-xl px-3.5 text-sm font-medium text-black/50 no-underline transition-all duration-200 hover:bg-black/[0.04] hover:text-black"
                    >
                        <ImageIcon
                            size={17}
                            strokeWidth={1.7}
                            className="text-black/35 transition-colors group-hover:text-black/70"
                        />

                        <span>Gallery</span>
                    </Link>

                    {/* Notification */}

                    <button
                        type="button"
                        aria-label="Notifications"
                        className="relative flex h-10 w-10 items-center justify-center rounded-xl text-black/40 transition-all duration-200 hover:bg-black/[0.04] hover:text-black"
                    >
                        <Bell
                            size={18}
                            strokeWidth={1.7}
                        />

                        {/* Notification dot */}

                        <span className="absolute right-[9px] top-[8px] h-1.5 w-1.5 rounded-full bg-black" />
                    </button>

                    {/* Divider */}

                    <div className="mx-2 h-6 w-px bg-black/[0.07]" />

                    {/* ================================= */}
                    {/* LOGGED IN */}
                    {/* ================================= */}

                    {isLoggedIn ? (
                        <div
                            ref={profileRef}
                            className="relative"
                        >

                            {/* Profile trigger */}

                            <button
                                type="button"
                                onClick={() =>
                                    setProfileOpen(
                                        (prev) => !prev
                                    )
                                }
                                className={`flex h-10 items-center gap-2 rounded-xl border px-1.5 pr-2.5 transition-all duration-200 ${profileOpen
                                        ? "border-black/[0.12] bg-black/[0.035]"
                                        : "border-black/[0.07] bg-white hover:border-black/[0.12] hover:bg-black/[0.025]"
                                    }`}
                            >

                                {/* Avatar */}

                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111111] text-xs font-semibold uppercase text-white">
                                    {user?.name
                                        ?.charAt(0)
                                        .toUpperCase()}
                                </div>

                                {/* Name */}

                                <span className="max-w-[120px] truncate text-sm font-medium text-black/70">
                                    {user?.name}
                                </span>

                                <ChevronDown
                                    size={15}
                                    strokeWidth={1.8}
                                    className={`text-black/35 transition-transform duration-200 ${profileOpen
                                            ? "rotate-180"
                                            : ""
                                        }`}
                                />
                            </button>

                            {/* ================================= */}
                            {/* PROFILE DROPDOWN */}
                            {/* ================================= */}

                            {profileOpen && (
                                <div className="absolute right-0 top-[calc(100%+10px)] w-[270px] overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-1.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)]">

                                    {/* User info */}

                                    <div className="mb-1 rounded-xl bg-black/[0.025] p-3">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#111111] text-sm font-semibold uppercase text-white">
                                                {user?.name
                                                    ?.charAt(0)
                                                    .toUpperCase()}
                                            </div>

                                            <div className="min-w-0">

                                                <p className="truncate text-sm font-semibold text-black/80">
                                                    {user?.name}
                                                </p>

                                                <p className="mt-0.5 truncate text-xs text-black/35">
                                                    {user?.email}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Menu */}

                                    <div className="space-y-0.5">

                                        <Link
                                            to="/gallery"
                                            onClick={() =>
                                                setProfileOpen(
                                                    false
                                                )
                                            }
                                            className="flex h-10 items-center gap-3 rounded-xl px-3 text-sm text-black/55 no-underline transition hover:bg-black/[0.04] hover:text-black"
                                        >
                                            <ImageIcon
                                                size={16}
                                                strokeWidth={1.7}
                                            />

                                            <span>
                                                Gallery
                                            </span>
                                        </Link>

                                        <Link
                                            to="/profile"
                                            onClick={() =>
                                                setProfileOpen(
                                                    false
                                                )
                                            }
                                            className="flex h-10 items-center gap-3 rounded-xl px-3 text-sm text-black/55 no-underline transition hover:bg-black/[0.04] hover:text-black"
                                        >
                                            <User
                                                size={16}
                                                strokeWidth={1.7}
                                            />

                                            <span>
                                                Profile
                                            </span>
                                        </Link>

                                        <Link
                                            to="/settings"
                                            onClick={() =>
                                                setProfileOpen(
                                                    false
                                                )
                                            }
                                            className="flex h-10 items-center gap-3 rounded-xl px-3 text-sm text-black/55 no-underline transition hover:bg-black/[0.04] hover:text-black"
                                        >
                                            <Settings
                                                size={16}
                                                strokeWidth={1.7}
                                            />

                                            <span>
                                                Settings
                                            </span>
                                        </Link>

                                    </div>

                                    {/* Divider */}

                                    <div className="my-1.5 h-px bg-black/[0.06]" />

                                    {/* Logout */}

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="flex h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-sm text-black/45 transition hover:bg-red-500/[0.06] hover:text-red-600"
                                    >
                                        <LogOut
                                            size={16}
                                            strokeWidth={1.7}
                                        />

                                        <span>
                                            Logout
                                        </span>
                                    </button>

                                </div>
                            )}
                        </div>
                    ) : (
                        /* ================================= */
                        /* LOGGED OUT */
                        /* ================================= */

                        <div className="flex items-center gap-2">

                            <Link
                                to="/login"
                                className="flex h-10 items-center rounded-xl px-4 text-sm font-medium text-black/55 no-underline transition hover:bg-black/[0.04] hover:text-black"
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="flex h-10 items-center rounded-xl bg-[#111111] px-4 text-sm font-medium text-white no-underline shadow-sm transition hover:bg-black hover:shadow-md"
                            >
                                Sign Up
                            </Link>

                        </div>
                    )}

                </div>

                {/* ===================================== */}
                {/* MOBILE MENU BUTTON */}
                {/* ===================================== */}

                <button
                    type="button"
                    onClick={() =>
                        setMobileOpen(
                            (prev) => !prev
                        )
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.07] bg-white text-black/60 transition hover:bg-black/[0.03] hover:text-black sm:hidden"
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? (
                        <X
                            size={19}
                            strokeWidth={1.8}
                        />
                    ) : (
                        <Menu
                            size={19}
                            strokeWidth={1.8}
                        />
                    )}
                </button>

            </div>

            {/* ========================================= */}
            {/* MOBILE DRAWER */}
            {/* ========================================= */}

            {mobileOpen && (
                <div className="border-t border-black/[0.06] bg-white px-5 py-4 sm:hidden">

                    {/* Logged in user */}

                    {isLoggedIn && (
                        <div className="mb-3 rounded-2xl bg-black/[0.025] p-3">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#111111] text-sm font-semibold uppercase text-white">
                                    {user?.name?.[0]}
                                </div>

                                <div className="min-w-0">

                                    <p className="truncate text-sm font-semibold text-black/80">
                                        {user?.name}
                                    </p>

                                    <p className="mt-0.5 truncate text-xs text-black/35">
                                        {user?.email}
                                    </p>

                                </div>

                            </div>

                        </div>
                    )}

                    {/* Mobile navigation */}

                    <nav className="space-y-1">

                        <Link
                            to="/gallery"
                            onClick={() =>
                                setMobileOpen(false)
                            }
                            className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-black/60 no-underline transition hover:bg-black/[0.04] hover:text-black"
                        >
                            <ImageIcon
                                size={18}
                                strokeWidth={1.7}
                            />

                            Gallery
                        </Link>

                        {isLoggedIn && (
                            <>
                                <Link
                                    to="/profile"
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                    className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-black/60 no-underline transition hover:bg-black/[0.04] hover:text-black"
                                >
                                    <User
                                        size={18}
                                        strokeWidth={1.7}
                                    />

                                    Profile
                                </Link>

                                <Link
                                    to="/settings"
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                    className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-black/60 no-underline transition hover:bg-black/[0.04] hover:text-black"
                                >
                                    <Settings
                                        size={18}
                                        strokeWidth={1.7}
                                    />

                                    Settings
                                </Link>

                                <div className="my-2 h-px bg-black/[0.06]" />

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium text-red-500 transition hover:bg-red-500/[0.05]"
                                >
                                    <LogOut
                                        size={18}
                                        strokeWidth={1.7}
                                    />

                                    Logout
                                </button>
                            </>
                        )}

                        {!isLoggedIn && (
                            <div className="mt-3 grid grid-cols-2 gap-2">

                                <Link
                                    to="/login"
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                    className="flex h-11 items-center justify-center rounded-xl border border-black/[0.07] text-sm font-medium text-black/60 no-underline transition hover:bg-black/[0.03] hover:text-black"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/signup"
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                    className="flex h-11 items-center justify-center rounded-xl bg-[#111111] text-sm font-medium text-white no-underline transition hover:bg-black"
                                >
                                    Sign Up
                                </Link>

                            </div>
                        )}

                    </nav>

                </div>
            )}

        </header>
    );
}