import { Button } from "./ui/button";
import { GraduationCap, Calendar, BookOpen, TrendingUp } from "lucide-react";

interface LandingPageProps {
  onNavigateToSignIn: () => void;
  onNavigateToRegister: () => void;
}

export function LandingPage({ onNavigateToSignIn, onNavigateToRegister }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* SFSU Logo and Title */}
            <div className="flex items-center gap-3">
              <svg
                viewBox="0 0 100 100"
                className="h-12 w-12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SFSU Logo - Purple and Gold Shield */}
                <circle cx="50" cy="50" r="45" fill="#4B2E83" />
                <path
                  d="M50 15 L70 35 L70 75 L50 85 L30 75 L30 35 Z"
                  fill="#FFB81C"
                />
                <text
                  x="50"
                  y="55"
                  textAnchor="middle"
                  fill="#4B2E83"
                  fontSize="24"
                  fontWeight="bold"
                >
                  SF
                </text>
                <text
                  x="50"
                  y="72"
                  textAnchor="middle"
                  fill="#4B2E83"
                  fontSize="12"
                  fontWeight="bold"
                >
                  SU
                </text>
              </svg>
              <div>
                <h1 className="text-purple-900">SFSU Degree Progress</h1>
                <p className="text-gray-600">San Francisco State University</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={onNavigateToSignIn}
                className="text-purple-900 hover:text-purple-700 hover:bg-purple-50"
              >
                Sign In
              </Button>
              <Button
                onClick={onNavigateToRegister}
                className="bg-purple-900 hover:bg-purple-800 text-white"
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white py-24">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1689270117466-46d4619280ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW4lMjBmcmFuY2lzY28lMjBzdGF0ZSUyMHVuaXZlcnNpdHklMjBjYW1wdXN8ZW58MXx8fHwxNzY1MzIyNzkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="SFSU Campus"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <GraduationCap className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
            <h2 className="mb-6">Track Your Academic Journey</h2>
            <p className="mb-8 text-purple-100">
              Monitor your degree progress, calculate your GPA, manage your schedule, and stay on top of your academic goals with SFSU Degree Progress.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                onClick={onNavigateToRegister}
                className="bg-yellow-400 hover:bg-yellow-500 text-purple-900"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onNavigateToSignIn}
                className="bg-white/10 backdrop-blur text-white border-white/30 hover:bg-white/20"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-purple-900 mb-4">Everything You Need to Succeed</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed specifically for SFSU students to manage their academic progress and achieve their goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-purple-900" />
              </div>
              <h4 className="text-purple-900 mb-3">Degree Progress Tracking</h4>
              <p className="text-gray-600">
                Monitor your progress towards graduation with comprehensive course tracking and requirement fulfillment visualization.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
              <div className="bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <h4 className="text-purple-900 mb-3">GPA Calculator</h4>
              <p className="text-gray-600">
                Project your cumulative GPA by entering current grades and planned courses. Make informed decisions about your academic path.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-purple-900" />
              </div>
              <h4 className="text-purple-900 mb-3">Weekly Schedule</h4>
              <p className="text-gray-600">
                Organize your classes with detailed schedule views including time, location, and course mode information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="mb-4">Ready to Take Control of Your Academic Journey?</h3>
          <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
            Join thousands of SFSU students already using Degree Progress to stay organized and achieve their academic goals.
          </p>
          <Button
            size="lg"
            onClick={onNavigateToRegister}
            className="bg-yellow-400 hover:bg-yellow-500 text-purple-900"
          >
            Create Your Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h5 className="text-white mb-4">SFSU Degree Progress</h5>
              <p>
                Empowering San Francisco State University students to track and achieve their academic goals.
              </p>
            </div>
            <div>
              <h5 className="text-white mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={onNavigateToSignIn}
                    className="hover:text-white transition-colors"
                  >
                    Sign In
                  </button>
                </li>
                <li>
                  <button
                    onClick={onNavigateToRegister}
                    className="hover:text-white transition-colors"
                  >
                    Register
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white mb-4">Contact</h5>
              <p>San Francisco State University</p>
              <p>1600 Holloway Avenue</p>
              <p>San Francisco, CA 94132</p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center">
            <p>&copy; 2025 SFSU Degree Progress. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
