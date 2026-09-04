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

    // Replace with your auth state/context
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
        return () => document.removeEventListener("mousedown", close);
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
        <header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 50,
                width: "100%",
                backgroundColor: "var(--background)",
                borderBottom: "1px solid var(--border)",
                backdropFilter: "blur(12px)",
            }}
        >
            <div
                className="container"
                style={{
                    display: "flex",
                    height: "64px",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* Brand / Logo */}
                <Link
                    to="/"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        textDecoration: "none",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            height: "40px",
                            width: "40px",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "var(--radius)",
                            backgroundColor: "var(--primary)",
                            color: "#ffffff",
                            boxShadow: "var(--shadow)",
                        }}
                    >
                        <Sparkles size={20} />
                    </div>

                    <div>
                        <h1
                            style={{
                                fontSize: "1rem",
                                fontWeight: 700,
                                color: "var(--text)",
                                margin: 0,
                                lineHeight: 1.2,
                            }}
                        >
                            Media Operator
                        </h1>
                        <p className="subtitle" style={{ margin: 0, fontSize: "0.75rem" }}>
                            file folders
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation & Actions */}
                <div
                    className="desktop-menu"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                    }}
                >
                    <Link
                        to="/gallery"
                        className="btn"
                        style={{
                            padding: "0.5rem 1rem",
                            fontSize: "0.9rem",
                            textDecoration: "none",
                            color: "var(--text-light)",
                            backgroundColor: "transparent",
                        }}
                    >
                        <ImageIcon size={18} className="icon" />
                        Gallery
                    </Link>

                    <button
                        type="button"
                        aria-label="Notifications"
                        className="icon-btn"
                        style={{ position: "relative" }}
                    >
                        <Bell size={18} />
                        <span
                            style={{
                                position: "absolute",
                                top: "8px",
                                right: "8px",
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                backgroundColor: "var(--secondary)",
                            }}
                        />
                    </button>

                    <div
                        style={{
                            height: "20px",
                            width: "1px",
                            backgroundColor: "var(--border)",
                            margin: "0 0.25rem",
                        }}
                    />

                    {/* User Profile Dropdown */}
                    {isLoggedIn ? (
                        <div
                            ref={profileRef}
                            style={{
                                position: "relative",
                            }}
                        >
                            {/* Profile Trigger */}
                            <button
                                type="button"
                                onClick={() =>
                                    setProfileOpen((prev) => !prev)
                                }
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.6rem",
                                    padding: "0.3rem 0.45rem 0.3rem 0.65rem",
                                    borderRadius: "999px",
                                    border: "1px solid var(--border)",
                                    backgroundColor: "var(--surface)",
                                    color: "var(--text)",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor =
                                        "var(--primary)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor =
                                        "var(--border)";
                                }}
                            >
                                {/* Avatar */}
                                <div
                                    style={{
                                        width: "34px",
                                        height: "34px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "50%",
                                        backgroundColor: "var(--primary)",
                                        color: "#fff",
                                        fontSize: "0.85rem",
                                        fontWeight: 700,
                                        flexShrink: 0,
                                    }}
                                >
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>

                                {/* Name */}
                                <span
                                    style={{
                                        maxWidth: "120px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        fontSize: "0.9rem",
                                        fontWeight: 500,
                                    }}
                                >
                                    {user?.name}
                                </span>

                                <ChevronDown
                                    size={16}
                                    style={{
                                        color: "var(--text-light)",
                                        transition: "transform 0.2s ease",
                                        transform: profileOpen
                                            ? "rotate(180deg)"
                                            : "rotate(0deg)",
                                    }}
                                />
                            </button>

                            {/* Dropdown */}
                            {profileOpen && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "calc(100% + 10px)",
                                        right: 0,
                                        width: "260px",
                                        padding: "0.5rem",
                                        borderRadius: "14px",
                                        border: "1px solid var(--border)",
                                        backgroundColor: "var(--surface)",
                                        boxShadow:
                                            "0 12px 35px rgba(0, 0, 0, 0.12)",
                                        zIndex: 1000,
                                    }}
                                >
                                    {/* User Information */}
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.75rem",
                                            padding: "0.75rem",
                                            marginBottom: "0.35rem",
                                            borderRadius: "10px",
                                            backgroundColor:
                                                "var(--background)",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "42px",
                                                height: "42px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: "50%",
                                                backgroundColor: "var(--primary)",
                                                color: "#fff",
                                                fontSize: "1rem",
                                                fontWeight: 700,
                                                flexShrink: 0,
                                            }}
                                        >
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </div>

                                        <div
                                            style={{
                                                minWidth: 0,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    color: "var(--text)",
                                                    fontSize: "0.9rem",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {user?.name}
                                            </div>

                                            <div
                                                style={{
                                                    marginTop: "2px",
                                                    color: "var(--text-light)",
                                                    fontSize: "0.75rem",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {user?.email}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Navigation */}
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "2px",
                                        }}
                                    >
                                        <Link
                                            to="/gallery"
                                            onClick={() =>
                                                setProfileOpen(false)
                                            }
                                            className="profile-link"
                                        >
                                            <ImageIcon size={17} />
                                            <span>Gallery</span>
                                        </Link>

                                        <Link
                                            to="/profile"
                                            onClick={() =>
                                                setProfileOpen(false)
                                            }
                                            className="profile-link"
                                        >
                                            <User size={17} />
                                            <span>Profile</span>
                                        </Link>

                                        <Link
                                            to="/settings"
                                            onClick={() =>
                                                setProfileOpen(false)
                                            }
                                            className="profile-link"
                                        >
                                            <Settings size={17} />
                                            <span>Settings</span>
                                        </Link>
                                    </div>

                                    {/* Divider */}
                                    <div
                                        style={{
                                            height: "1px",
                                            backgroundColor: "var(--border)",
                                            margin: "0.45rem 0",
                                        }}
                                    />

                                    {/* Logout */}
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="logout-button"
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.65rem",
                                            padding: "0.65rem 0.75rem",
                                            border: "none",
                                            borderRadius: "9px",
                                            background: "transparent",
                                            color: "var(--text-light)",
                                            fontSize: "0.875rem",
                                            cursor: "pointer",
                                            textAlign: "left",
                                            transition: "all 0.2s ease",
                                        }}
                                    >
                                        <LogOut size={17} />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                            }}
                        >
                            <Link
                                to="/login"
                                className="btn"
                                style={{ textDecoration: "none" }}
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="btn"
                                style={{ textDecoration: "none" }}
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle Button */}
                <div className="mobile-toggle">
                    <button
                        type="button"
                        onClick={() => setMobileOpen((prev) => !prev)}
                        className="icon-btn"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div
                    style={{
                        borderTop: "1px solid var(--border)",
                        backgroundColor: "var(--background)",
                        padding: "1.25rem 1.5rem",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            paddingBottom: "1rem",
                            borderBottom: "1px solid var(--border)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                height: "40px",
                                width: "40px",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "50%",
                                backgroundColor: "var(--primary)",
                                color: "#ffffff",
                                fontSize: "0.875rem",
                                fontWeight: 700,
                            }}
                        >
                            {user?.name[0]}
                        </div>
                        <div>
                            <h3
                                style={{
                                    margin: 0,
                                    fontSize: "0.9rem",
                                    fontWeight: 600,
                                    color: "var(--text)",
                                }}
                            >
                                {user?.name}
                            </h3>
                            <p className="caption" style={{ margin: "0.2rem 0 0 0" }}>
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    <nav style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <Link
                            to="/gallery"
                            onClick={() => setMobileOpen(false)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                padding: "0.75rem",
                                borderRadius: "10px",
                                color: "var(--text)",
                                textDecoration: "none",
                                fontSize: "0.9rem",
                            }}
                        >
                            <ImageIcon size={18} className="icon" />
                            Gallery
                        </Link>
                        <Link
                            to="/profile"
                            onClick={() => setMobileOpen(false)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                padding: "0.75rem",
                                borderRadius: "10px",
                                color: "var(--text)",
                                textDecoration: "none",
                                fontSize: "0.9rem",
                            }}
                        >
                            <User size={18} className="icon" />
                            Profile
                        </Link>
                        <Link
                            to="/settings"
                            onClick={() => setMobileOpen(false)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                padding: "0.75rem",
                                borderRadius: "10px",
                                color: "var(--text)",
                                textDecoration: "none",
                                fontSize: "0.9rem",
                            }}
                        >
                            <Settings size={18} className="icon" />
                            Settings
                        </Link>
                        <button
                            type="button"
                            onClick={handleLogout}
                            style={{
                                display: "flex",
                                width: "100%",
                                alignItems: "center",
                                gap: "0.75rem",
                                padding: "0.75rem",
                                borderRadius: "10px",
                                color: "var(--danger)",
                                backgroundColor: "transparent",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "0.9rem",
                                textAlign: "left",
                            }}
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </nav>
                </div>
            )}

            {/* Helper CSS Rule for Mobile Toggle Visibility */}
            <style>{`
        @media (min-width: 640px) {
          .mobile-toggle { display: none !important; }
          .desktop-menu { display: flex !important; }
        }
        @media (max-width: 639px) {
          .mobile-toggle { display: block !important; }
          .desktop-menu { display: none !important; }
        }
      `}</style>
        </header>
    );
}