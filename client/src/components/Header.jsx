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
import { logoutUser } from "../api/auth.api.js";

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
            await logoutUser();   // Wait for server to clear cookies
        } catch (err) {
            console.error(err);
        }

        logout();
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
                    <div style={{ position: "relative" }} ref={profileRef}>
                        <button
                            type="button"
                            onClick={() => setProfileOpen((prev) => !prev)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.6rem",
                                padding: "0.35rem 0.75rem",
                                borderRadius: "var(--radius)",
                                border: "1px solid var(--border)",
                                backgroundColor: "var(--surface)",
                                cursor: "pointer",
                                color: "var(--text)",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    height: "32px",
                                    width: "32px",
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

                            <ChevronDown
                                size={16}
                                style={{
                                    color: "var(--text-light)",
                                    transition: "transform 0.2s ease",
                                    transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)",
                                }}
                            />
                        </button>

                        {profileOpen && (
                            <div
                                style={{
                                    position: "absolute",
                                    right: 0,
                                    marginTop: "0.75rem",
                                    width: "270px",
                                    overflow: "hidden",
                                    borderRadius: "var(--radius)",
                                    border: "1px solid var(--border)",
                                    backgroundColor: "var(--surface)",
                                    boxShadow: "var(--shadow)",
                                    padding: "0.5rem",
                                    zIndex: 100,
                                }}
                            >
                                {/* User Info Section */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.75rem",
                                        padding: "0.75rem",
                                        borderBottom: "1px solid var(--border)",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            height: "40px",
                                            width: "40px",
                                            flexShrink: 0,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "50%",
                                            backgroundColor: "var(--primary)",
                                            color: "#ffffff",
                                            fontSize: "1rem",
                                            fontWeight: 700,
                                        }}
                                    >
                                        {user?.name[0]}
                                    </div>
                                    <div style={{ overflow: "hidden" }}>
                                        <h3
                                            style={{
                                                margin: 0,
                                                fontSize: "0.9rem",
                                                fontWeight: 600,
                                                color: "var(--text)",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {user?.name}
                                        </h3>
                                        <p
                                            className="caption"
                                            style={{
                                                margin: "0.2rem 0 0 0",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Dropdown Links */}
                                <div style={{ paddingTop: "0.5rem" }}>
                                    <Link
                                        to="/gallery"
                                        onClick={() => setProfileOpen(false)}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.75rem",
                                            padding: "0.6rem 0.85rem",
                                            fontSize: "0.875rem",
                                            color: "var(--text)",
                                            textDecoration: "none",
                                            borderRadius: "10px",
                                            transition: "background 0.2s",
                                        }}
                                        onMouseEnter={(e) =>
                                        (e.currentTarget.style.backgroundColor =
                                            "rgba(255,255,255,0.06)")
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.backgroundColor = "transparent")
                                        }
                                    >
                                        <ImageIcon size={18} className="icon" />
                                        Gallery
                                    </Link>

                                    <Link
                                        to="/profile"
                                        onClick={() => setProfileOpen(false)}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.75rem",
                                            padding: "0.6rem 0.85rem",
                                            fontSize: "0.875rem",
                                            color: "var(--text)",
                                            textDecoration: "none",
                                            borderRadius: "10px",
                                            transition: "background 0.2s",
                                        }}
                                        onMouseEnter={(e) =>
                                        (e.currentTarget.style.backgroundColor =
                                            "rgba(255,255,255,0.06)")
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.backgroundColor = "transparent")
                                        }
                                    >
                                        <User size={18} className="icon" />
                                        Profile
                                    </Link>

                                    <Link
                                        to="/settings"
                                        onClick={() => setProfileOpen(false)}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.75rem",
                                            padding: "0.6rem 0.85rem",
                                            fontSize: "0.875rem",
                                            color: "var(--text)",
                                            textDecoration: "none",
                                            borderRadius: "10px",
                                            transition: "background 0.2s",
                                        }}
                                        onMouseEnter={(e) =>
                                        (e.currentTarget.style.backgroundColor =
                                            "rgba(255,255,255,0.06)")
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.backgroundColor = "transparent")
                                        }
                                    >
                                        <Settings size={18} className="icon" />
                                        Settings
                                    </Link>

                                    <div
                                        style={{
                                            margin: "0.4rem 0",
                                            borderTop: "1px solid var(--border)",
                                        }}
                                    />

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        style={{
                                            display: "flex",
                                            width: "100%",
                                            alignItems: "center",
                                            gap: "0.75rem",
                                            padding: "0.6rem 0.85rem",
                                            fontSize: "0.875rem",
                                            color: "var(--danger)",
                                            backgroundColor: "transparent",
                                            border: "none",
                                            borderRadius: "10px",
                                            cursor: "pointer",
                                            textAlign: "left",
                                            transition: "background 0.2s",
                                        }}
                                        onMouseEnter={(e) =>
                                        (e.currentTarget.style.backgroundColor =
                                            "rgba(239, 68, 68, 0.1)")
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.backgroundColor = "transparent")
                                        }
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
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