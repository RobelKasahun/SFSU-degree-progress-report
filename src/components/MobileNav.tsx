import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Home, Calendar, Award, LogOut, Menu, User, X } from "lucide-react";

interface MobileNavProps {
  currentView: string;
  userData?: {
    firstName?: string;
    lastName?: string;
    studentId?: string;
    email?: string;
  };
  onNavigate: (view: string) => void;
  onSignOut: () => void;
}

export function MobileNav({ currentView, userData, onNavigate, onSignOut }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (view: string) => {
    onNavigate(view);
    setIsOpen(false);
  };

  const userName = userData?.firstName && userData?.lastName
    ? `${userData.firstName} ${userData.lastName}`
    : userData?.email || "Guest";

  const userInitials = userData?.firstName && userData?.lastName
    ? `${userData.firstName[0]}${userData.lastName[0]}`
    : "U";

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="w-[280px] sm:w-[320px] bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50"
      >
        <SheetHeader className="border-b pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white shadow-lg">
              <span className="font-semibold">{userInitials}</span>
            </div>
            <div className="flex-1 text-left">
              <SheetTitle className="text-base">{userName}</SheetTitle>
              {userData?.studentId && (
                <p className="text-xs text-gray-600 mt-1">ID: {userData.studentId}</p>
              )}
            </div>
          </div>
        </SheetHeader>

        <nav className="space-y-2">
          <Button
            variant={currentView === "gateway" ? "default" : "ghost"}
            className={`w-full justify-start gap-3 h-12 ${
              currentView === "gateway"
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                : "hover:bg-white/60"
            }`}
            onClick={() => handleNavigation("gateway")}
          >
            <Home className="h-5 w-5" />
            <span>Gateway</span>
          </Button>

          <Button
            variant={currentView === "schedule" ? "default" : "ghost"}
            className={`w-full justify-start gap-3 h-12 ${
              currentView === "schedule"
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                : "hover:bg-white/60"
            }`}
            onClick={() => handleNavigation("schedule")}
          >
            <Calendar className="h-5 w-5" />
            <span>Weekly Schedule</span>
          </Button>

          <Button
            variant={currentView === "degree" ? "default" : "ghost"}
            className={`w-full justify-start gap-3 h-12 ${
              currentView === "degree"
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                : "hover:bg-white/60"
            }`}
            onClick={() => handleNavigation("degree")}
          >
            <Award className="h-5 w-5" />
            <span>Degree Progress</span>
          </Button>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12 border-2 border-red-300 text-red-600 hover:bg-red-50"
            onClick={() => {
              setIsOpen(false);
              onSignOut();
            }}
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
