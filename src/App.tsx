import { useState } from "react";
import { DegreeProgressReport } from "./components/DegreeProgressReport";
import { SignIn } from "./components/SignIn";
import { Registration } from "./components/Registration";
import { WeeklyScheduleDashboard } from "./components/WeeklyScheduleDashboard";
import { GatewayDashboard } from "./components/GatewayDashboard";
import { LandingPage } from "./components/LandingPage";
import { PaymentPage } from "./components/PaymentPage";
import { FinancialAidPage } from "./components/FinancialAidPage";
import { ClassPlanner } from "./components/ClassPlanner";
import { MobileNav } from "./components/MobileNav";
import { Button } from "./components/ui/button";
import { LogOut, User, Home, Calendar, Award, LayoutDashboard } from "lucide-react";

type View = "landing" | "signin" | "register" | "dashboard" | "gateway" | "schedule" | "degree" | "payment" | "financialaid" | "classplanner";

interface UserData {
  email: string;
  studentId: string;
  firstName?: string;
  lastName?: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>("landing");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [previousView, setPreviousView] = useState<View | null>(null);

  const navigateToView = (newView: View) => {
    setPreviousView(currentView);
    setCurrentView(newView);
  };

  const navigateBack = () => {
    if (previousView) {
      setCurrentView(previousView);
      setPreviousView(null);
    }
  };

  const handleSignIn = (email: string, id: string, password: string) => {
    // In a real app, this would authenticate with a backend
    // For now, we'll just store the user data and show the gateway
    // Extract name from email or use mock data
    const emailName = email.split('@')[0];
    const nameParts = emailName.split('.');
    const firstName = nameParts[0] ? nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1) : 'John';
    const lastName = nameParts[1] ? nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1) : 'Doe';
    
    setUserData({
      email,
      studentId: id,
      firstName,
      lastName,
    });
    setCurrentView("gateway");
  };

  const handleRegister = (
    email: string,
    id: string,
    firstName: string,
    lastName: string,
    password: string
  ) => {
    // In a real app, this would create a new user account
    // For now, we'll just store the user data and show the gateway
    setUserData({
      email,
      studentId: id,
      firstName,
      lastName,
    });
    setCurrentView("gateway");
  };

  const handleSignOut = () => {
    setUserData(null);
    setCurrentView("landing");
  };

  if (currentView === "landing") {
    return (
      <LandingPage
        onNavigateToSignIn={() => setCurrentView("signin")}
        onNavigateToRegister={() => setCurrentView("register")}
      />
    );
  }

  if (currentView === "signin") {
    return (
      <SignIn
        onSignIn={handleSignIn}
        onSwitchToRegister={() => setCurrentView("register")}
        onBackToLanding={() => setCurrentView("landing")}
      />
    );
  }

  if (currentView === "register") {
    return (
      <Registration
        onRegister={handleRegister}
        onSwitchToSignIn={() => setCurrentView("signin")}
        onBackToLanding={() => setCurrentView("landing")}
      />
    );
  }

  // Payment Page
  if (currentView === "payment") {
    const getBackText = () => {
      if (previousView === "gateway") return "Back to Gateway";
      if (previousView === "schedule") return "Back to Schedule";
      if (previousView === "degree") return "Back to Degree Progress";
      return "Back";
    };

    return (
      <PaymentPage
        onBack={navigateBack}
        balance={-2450.00}
        backText={getBackText()}
      />
    );
  }

  // Financial Aid Page
  if (currentView === "financialaid") {
    const getBackText = () => {
      if (previousView === "gateway") return "Back to Gateway";
      if (previousView === "schedule") return "Back to Schedule";
      if (previousView === "degree") return "Back to Degree Progress";
      return "Back";
    };

    return (
      <FinancialAidPage
        onBack={navigateBack}
        backText={getBackText()}
      />
    );
  }

  // Class Planner Page
  if (currentView === "classplanner") {
    const getBackText = () => {
      if (previousView === "gateway") return "Back to Gateway";
      if (previousView === "schedule") return "Back to Schedule";
      if (previousView === "degree") return "Back to Degree Progress";
      return "Back";
    };

    return (
      <ClassPlanner
        onBack={navigateBack}
        backText={getBackText()}
      />
    );
  }

  // Gateway Dashboard
  if (currentView === "gateway") {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Navigation Header */}
        <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
            {/* Mobile Menu */}
            <div className="md:hidden">
              <MobileNav
                currentView={currentView}
                userData={userData || undefined}
                onNavigate={(view) => setCurrentView(view as View)}
                onSignOut={handleSignOut}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm md:text-base">
                    {userData?.firstName && userData?.lastName
                      ? `${userData.firstName} ${userData.lastName}`
                      : userData?.email}
                  </p>
                  <p className="text-xs text-gray-500">ID: {userData?.studentId}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentView("gateway")}
                  className="flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Gateway
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentView("schedule")}
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentView("degree")}
                  className="flex items-center gap-2"
                >
                  <Award className="h-4 w-4" />
                  Degree Progress
                </Button>
              </div>
            </div>

            {/* Mobile Title */}
            <div className="md:hidden flex-1 text-center">
              <h1 className="font-semibold text-purple-700">SFSU Gateway</h1>
            </div>

            {/* Desktop Sign Out */}
            <Button 
              variant="outline" 
              onClick={handleSignOut} 
              className="hidden md:flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        <GatewayDashboard 
          userData={userData || undefined} 
          onNavigateToPayment={() => navigateToView("payment")} 
          onNavigateToFinancialAid={() => navigateToView("financialaid")} 
        />
      </div>
    );
  }

  // Weekly Schedule Dashboard
  if (currentView === "schedule") {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Navigation Header */}
        <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
            {/* Mobile Menu */}
            <div className="md:hidden">
              <MobileNav
                currentView={currentView}
                userData={userData || undefined}
                onNavigate={(view) => setCurrentView(view as View)}
                onSignOut={handleSignOut}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm md:text-base">
                    {userData?.firstName && userData?.lastName
                      ? `${userData.firstName} ${userData.lastName}`
                      : userData?.email}
                  </p>
                  <p className="text-xs text-gray-500">ID: {userData?.studentId}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentView("gateway")}
                  className="flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Gateway
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentView("schedule")}
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentView("degree")}
                  className="flex items-center gap-2"
                >
                  <Award className="h-4 w-4" />
                  Degree Progress
                </Button>
              </div>
            </div>

            {/* Mobile Title */}
            <div className="md:hidden flex-1 text-center">
              <h1 className="font-semibold text-purple-700">Schedule</h1>
            </div>

            {/* Desktop Sign Out */}
            <Button 
              variant="outline" 
              onClick={handleSignOut} 
              className="hidden md:flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        <WeeklyScheduleDashboard 
          userData={userData || undefined}
          onNavigateToDegree={() => navigateToView("degree")}
          onNavigateToPayment={() => navigateToView("payment")}
          onNavigateToFinancialAid={() => navigateToView("financialaid")}
          onNavigateToClassPlanner={() => navigateToView("classplanner")}
        />
      </div>
    );
  }

  // Degree Progress Dashboard
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Header */}
      <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileNav
              currentView={currentView}
              userData={userData || undefined}
              onNavigate={(view) => setCurrentView(view as View)}
              onSignOut={handleSignOut}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm md:text-base">
                  {userData?.firstName && userData?.lastName
                    ? `${userData.firstName} ${userData.lastName}`
                    : userData?.email}
                </p>
                <p className="text-xs text-gray-500">ID: {userData?.studentId}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentView("gateway")}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Gateway
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentView("schedule")}
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Schedule
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentView("degree")}
                className="flex items-center gap-2"
              >
                <Award className="h-4 w-4" />
                Degree Progress
              </Button>
            </div>
          </div>

          {/* Mobile Title */}
          <div className="md:hidden flex-1 text-center">
            <h1 className="font-semibold text-purple-700">Degree Progress</h1>
          </div>

          {/* Desktop Sign Out */}
          <Button 
            variant="outline" 
            onClick={handleSignOut} 
            className="hidden md:flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      <DegreeProgressReport userData={userData || undefined} />
    </div>
  );
}