import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  NavLink,
} from "react-router";
import {
  BookOpen,
  Clock,
  FileText,
  Layers,
  Lightbulb,
  Search,
  Target,
  Users,
} from "lucide-react";
import { TABS } from "./constants/config";
import "./index.css";

const iconMap = {
  Search: <Search size={16} />,
  BookOpen: <BookOpen size={16} />,
  Users: <Users size={16} />,
  Clock: <Clock size={16} />,
  FileText: <FileText size={16} />,
  Layers: <Layers size={16} />,
  Target: <Target size={16} />,
  Lightbulb: <Lightbulb size={16} />,
};

const getIcon = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || null;
};

const tabToPath: Record<string, string> = {
  "core-rules": "/core-rules",
  "daily-patterns": "/",
  "advanced-cases": "/advanced-cases",
  "case-practice": "/case-practice",
  "present": "/present",
  "other-tenses": "/other-tenses",
  "vocabulary": "/vocabulary",
  "search": "/search",
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-6">
        <header className="text-center mb-12 pt-8">
          <div className="relative">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight">
              Greek Conjugation Reference
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-lg opacity-5 blur-xl" />
          </div>
          <p className="text-xl text-gray-600 font-medium mt-4 max-w-2xl mx-auto leading-relaxed">
            Your comprehensive pattern-based guide to Greek grammar
          </p>
        </header>

        <nav className="mb-10">
          <div className="flex flex-wrap gap-3 justify-center p-2 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
            {TABS.map((tab) => (
              <NavLink
                key={tab.id}
                to={tabToPath[tab.id]}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all shadow-sm ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {getIcon(tab.icon)}
                {tab.label}
              </NavLink>
            ))}
          </div>
        </nav>

        <main className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 p-8 mb-8">
          <Outlet />
        </main>

        <footer className="text-center mt-8 mb-8">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 shadow-lg border border-white/30">
            <p className="text-lg text-gray-700 font-medium">
              Remember: Patterns over memorization! Once you know the family,
              you know the conjugation.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
