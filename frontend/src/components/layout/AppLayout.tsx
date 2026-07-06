import { Activity, BarChart3, Home, LogOut, Upload } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/upload", label: "Upload", icon: Upload },
  { to: "/demo", label: "Demo", icon: Activity }
];

export function AppLayout() {
  const { logout, token, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <header className="border-b border-app-border bg-app-bg/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-2 text-lg font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-app-blue text-white">
              <Activity className="h-5 w-5" />
            </span>
            AeroPredict
          </NavLink>

          <nav className="hidden items-center gap-2 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `btn ${isActive ? "bg-app-panel2 text-white" : "text-app-muted hover:text-white"}`
                }
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-app-muted sm:inline">{user?.username ?? "Guest"}</span>
            {token ? (
              <button
                className="btn-secondary px-3"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                aria-label="Log out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            ) : (
              <NavLink to="/login" className="btn-secondary">
                Login
              </NavLink>
            )}
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-app-border bg-app-bg/95 p-2 md:hidden">
        <div className="grid grid-cols-4 gap-2">
          <NavLink to="/" className="btn text-app-muted">
            <Home className="h-4 w-4" />
          </NavLink>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className="btn text-app-muted">
              <link.icon className="h-4 w-4" />
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
