import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  BookOpen,
  Calendar,
  CreditCard,
  DollarSign,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Users,
  Bell,
  CheckCircle2,
  AlertCircle,
  Newspaper,
  Calculator,
  Building,
  MessageSquare,
  Video,
  Briefcase,
} from "lucide-react";
import { useState } from "react";

const appIcons = [
  { icon: BookOpen, label: "Canvas", color: "bg-purple-700" },
  { icon: GraduationCap, label: "Degree", color: "bg-purple-700" },
  { icon: FileText, label: "Library", color: "bg-purple-700" },
  { icon: Mail, label: "Email", color: "bg-purple-700" },
  { icon: Calendar, label: "Calendar", color: "bg-purple-700" },
  { icon: MapPin, label: "Maps", color: "bg-purple-700" },
  { icon: Users, label: "Directory", color: "bg-purple-700" },
  { icon: CreditCard, label: "ID Card", color: "bg-purple-700" },
  { icon: DollarSign, label: "Finance", color: "bg-purple-700" },
];

// Additional hidden apps
const allApps = [
  { icon: BookOpen, label: "Canvas", color: "bg-purple-700" },
  { icon: GraduationCap, label: "Degree", color: "bg-purple-700" },
  { icon: FileText, label: "Library", color: "bg-purple-700" },
  { icon: Mail, label: "Email", color: "bg-purple-700" },
  { icon: Calendar, label: "Calendar", color: "bg-purple-700" },
  { icon: MapPin, label: "Maps", color: "bg-purple-700" },
  { icon: Users, label: "Directory", color: "bg-purple-700" },
  { icon: CreditCard, label: "ID Card", color: "bg-purple-700" },
  { icon: DollarSign, label: "Finance", color: "bg-purple-700" },
  { icon: Newspaper, label: "News", color: "bg-indigo-700" },
  { icon: Calculator, label: "Calculator", color: "bg-indigo-700" },
  { icon: Building, label: "Buildings", color: "bg-indigo-700" },
  { icon: MessageSquare, label: "Forums", color: "bg-indigo-700" },
  { icon: Video, label: "Zoom", color: "bg-indigo-700" },
  { icon: Briefcase, label: "Career Center", color: "bg-indigo-700" },
];

// Mock announcements data
const announcements = [
  {
    id: 1,
    title: "Spring 2025 Registration Open",
    date: "Dec 10, 2024",
    message: "Course registration for Spring 2025 is now open. Register early to secure your preferred classes.",
    fullDescription: "We are pleased to announce that course registration for the Spring 2025 semester is now open to all eligible students.\n\nRegistration will be available through your student portal on a rolling basis according to your priority registration date. Please check your account for your specific registration window.\n\nKey Information:\n• Registration Period: December 10, 2024 - January 20, 2025\n• Classes Begin: January 27, 2025\n• Add/Drop Deadline: February 10, 2025\n\nPlease note that popular courses fill up quickly, so we strongly encourage you to register as early as possible during your registration window. If you need assistance with course selection or registration, please contact your academic advisor or visit the Student Services Center.\n\nFor questions, contact the Registrar's Office at registrar@sfsu.edu or call (415) 338-2181.",
  },
  {
    id: 2,
    title: "Final Exam Schedule Released",
    date: "Dec 8, 2024",
    message: "The final exam schedule is now available. Check your dashboard for exam dates and locations.",
    fullDescription: "The final examination schedule for Fall 2024 has been officially released and is now available on your student portal.\n\nImportant Dates:\n• Final Exam Period: December 16-20, 2024\n• Study Day: December 15, 2024 (no classes)\n• Grades Due: December 27, 2024\n\nExam Locations:\nPlease note that some exams may be held in different locations than your regular classroom. Verify your exam location on your student portal at least 48 hours before each exam.\n\nAccommodations:\nStudents requiring testing accommodations should contact the Disability Programs and Resource Center (DPRC) immediately at dprc@sfsu.edu or (415) 338-2472.\n\nConflicts:\nIf you have three or more exams scheduled on the same day, or have other exam conflicts, please contact your instructors and the Office of the Registrar to arrange alternative testing times.\n\nGood luck on your finals!",
  },
  {
    id: 3,
    title: "Winter Break Campus Hours",
    date: "Dec 5, 2024",
    message: "The campus will have reduced hours during winter break (Dec 23 - Jan 5). Check individual department hours.",
    fullDescription: "As we approach the winter break period, please be aware that the university will operate on a reduced schedule to allow our faculty and staff to spend time with their families during the holidays.\n\nCampus Closure:\n• December 23, 2024 - January 5, 2025\n• Campus officially closed: December 24-26 and December 31 - January 1\n• Limited services available on other dates\n\nFacility Hours During Break:\n\nJ. Paul Leonard Library:\n• December 23-30: 8:00 AM - 5:00 PM\n• December 24-26, 31, Jan 1: CLOSED\n• January 2-5: 8:00 AM - 5:00 PM\n\nStudent Services Center:\n• Limited hours: 9:00 AM - 3:00 PM (December 23, 27-30, January 2-5)\n• Closed: December 24-26, 31, January 1\n\nRecreation & Wellness Center:\n• Closed for entire break period\n• Reopens: January 6, 2025\n\nEmergency Services:\nUPD (University Police Department) will maintain 24/7 operations throughout the break. In case of emergency, dial (415) 338-7200.\n\nRegular hours resume on Monday, January 6, 2025. Have a safe and happy holiday season!",
  },
];

// Mock to-do list data
const todoItems = [
  { id: 1, task: "Complete CS 270 Project", deadline: "Dec 15", completed: false, priority: "high" },
  { id: 2, task: "Submit MATH 320 Homework 8", deadline: "Dec 12", completed: false, priority: "medium" },
  { id: 3, task: "Register for Spring 2025 courses", deadline: "Dec 18", completed: false, priority: "high" },
  { id: 4, task: "Review for CS 310 final exam", deadline: "Dec 16", completed: true, priority: "medium" },
  { id: 5, task: "Meet with academic advisor", deadline: "Dec 14", completed: false, priority: "low" },
];

// Mock finance data
const financeData = {
  balance: -2450.00,
  dueDate: "January 5, 2025",
  items: [
    { description: "Spring 2025 Tuition", amount: 3500.00 },
    { description: "Payment Received", amount: -1050.00 },
  ],
};

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "grade",
    message: "New grade posted for CS 250",
    time: "2 hours ago",
    icon: CheckCircle2,
    color: "text-green-600",
    fullDescription: "A new grade has been posted for your CS 250 - Computer Architecture course.\n\nAssignment: Midterm Exam\nGrade: 92/100 (A-)\nClass Average: 78/100\nPosted by: Dr. Sarah Johnson\nPosted on: December 11, 2024 at 2:30 PM\n\nYour performance on this exam places you in the top 15% of the class. Excellent work!\n\nDetailed feedback:\n• Strong understanding of cache memory concepts (25/25)\n• Good grasp of pipelining architecture (28/30)\n• Minor errors in virtual memory problems (20/25)\n• Excellent work on assembly language section (19/20)\n\nIf you have questions about your exam or would like to review it, please attend office hours on Tuesdays and Thursdays from 2-4 PM in TH 912, or schedule an appointment via email at sjohnson@sfsu.edu.\n\nKeep up the great work!",
  },
  {
    id: 2,
    type: "reminder",
    message: "Assignment due tomorrow: CS 270 Project",
    time: "5 hours ago",
    icon: AlertCircle,
    color: "text-orange-600",
    fullDescription: "REMINDER: Important assignment due soon!\n\nCourse: CS 270 - Software Development\nAssignment: Final Project - Web Application\nDue Date: December 12, 2024 at 11:59 PM\nSubmission Method: Canvas\n\nProject Requirements:\n• Fully functional web application using React and Node.js\n• User authentication system\n• Database integration (MongoDB or PostgreSQL)\n• Responsive design\n• README with setup instructions\n• Code documentation and comments\n• Unit tests for critical functions\n\nSubmission Checklist:\n✓ Source code (GitHub repository link)\n✓ Deployed application (Heroku/Netlify link)\n✓ Project documentation (README.md)\n✓ Video demonstration (5-10 minutes)\n✓ Individual contribution statement\n\nLate Policy:\n• 10% deduction per day late\n• No submissions accepted after 3 days\n\nIf you're experiencing technical difficulties or have questions, please contact your instructor Dr. Michael Chen at mchen@sfsu.edu or attend virtual office hours via Zoom (link in Canvas).\n\nGood luck with your submission!",
  },
  {
    id: 3,
    type: "announcement",
    message: "New announcement from MATH 320",
    time: "1 day ago",
    icon: Bell,
    color: "text-blue-600",
    fullDescription: "New Course Announcement - MATH 320: Abstract Algebra\n\nFrom: Professor Emily Martinez\nDate: December 10, 2024\n\nDear Students,\n\nI hope this message finds you well as we approach the end of the semester.\n\nI wanted to inform you of several important updates regarding our final exam and course wrap-up:\n\n1. Final Exam Details:\n   • Date: December 18, 2024\n   • Time: 10:00 AM - 12:00 PM\n   • Location: Science Building, Room 301\n   • Format: Written exam (no calculators allowed)\n   • Topics: All material from Chapters 1-12, with emphasis on group theory and ring theory\n\n2. Review Session:\n   I will be hosting a comprehensive review session on December 15, 2024, from 2:00-4:00 PM in our regular classroom (TH 401). This is optional but highly recommended.\n\n3. Office Hours:\n   I will have extended office hours during finals week:\n   • December 16: 1:00-5:00 PM\n   • December 17: 10:00 AM-2:00 PM\n\n4. Extra Credit Opportunity:\n   Students may submit one additional problem set from Chapter 13 for up to 3% extra credit. Due by December 16 at 5:00 PM.\n\nPlease let me know if you have any questions or concerns.\n\nBest regards,\nProfessor Emily Martinez\nDepartment of Mathematics\nemartinez@sfsu.edu",
  },
];

interface GatewayDashboardProps {
  userData?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  onNavigateToPayment?: () => void;
  onNavigateToFinancialAid?: () => void;
}

export function GatewayDashboard({ userData, onNavigateToPayment, onNavigateToFinancialAid }: GatewayDashboardProps) {
  const [todos, setTodos] = useState(todoItems);
  const [isAppsDialogOpen, setIsAppsDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<typeof announcements[0] | null>(null);
  const [selectedNotification, setSelectedNotification] = useState<typeof notifications[0] | null>(null);

  const fullName = userData?.firstName && userData?.lastName 
    ? `${userData.firstName} ${userData.lastName}`
    : "Student Name";
  const initials = userData?.firstName && userData?.lastName
    ? `${userData.firstName[0]}${userData.lastName[0]}`
    : "SN";
  const major = "Computer Science"; // This could come from userData in a real app

  const handleToggleTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <Card className="border-2 border-blue-500 shadow-lg">
          <CardContent className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl">San Francisco State University</h1>
              <p className="text-yellow-500 text-base sm:text-lg md:text-xl">GATEWAY</p>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 sm:gap-4 pb-4 sm:pb-6 border-b">
              <Avatar className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 bg-purple-700 border-2 border-yellow-500">
                <AvatarFallback className="bg-purple-700 text-white">
                  <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-blue-600 hover:underline cursor-pointer text-sm sm:text-base">
                  {fullName}
                </p>
                <p className="text-gray-600 text-xs sm:text-sm">Major: {major}</p>
                {userData?.email && (
                  <p className="text-gray-500 text-xs sm:text-sm">{userData.email}</p>
                )}
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Left Column */}
              <div className="space-y-4 sm:space-y-6">
                {/* Announcements */}
                <Card className="border-2 border-blue-500 rounded-2xl">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-center text-base sm:text-lg">Announcements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 p-4 sm:p-6 pt-0 sm:pt-0">
                    {announcements.map((announcement) => (
                      <div 
                        key={announcement.id} 
                        className="border-b pb-3 last:border-b-0 cursor-pointer hover:bg-blue-50 rounded p-2 transition-colors"
                        onClick={() => setSelectedAnnouncement(announcement)}
                      >
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-1 sm:gap-2">
                          <h4 className="text-blue-600 hover:underline text-sm sm:text-base">{announcement.title}</h4>
                          <span className="text-gray-500 text-xs sm:text-sm whitespace-nowrap">{announcement.date}</span>
                        </div>
                        <p className="text-gray-600 mt-1 text-xs sm:text-sm">{announcement.message}</p>
                        <p className="text-blue-600 mt-1 text-xs sm:text-sm">Click to read more →</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Notifications */}
                <Card className="border-2 border-blue-500 rounded-2xl">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 p-4 sm:p-6 pt-0 sm:pt-0">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className="flex items-start gap-2 sm:gap-3 cursor-pointer hover:bg-gray-50 rounded p-2 transition-colors"
                        onClick={() => setSelectedNotification(notification)}
                      >
                        <notification.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${notification.color} flex-shrink-0 mt-0.5`} />
                        <div className="flex-1">
                          <p className="text-gray-700 hover:text-blue-600 text-xs sm:text-sm">{notification.message}</p>
                          <p className="text-gray-500 text-xs">{notification.time}</p>
                          <p className="text-blue-600 text-xs sm:text-sm">Click for details →</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Middle Column */}
              <div className="space-y-4 sm:space-y-6">
                {/* To Do List */}
                <Card className="border-2 border-blue-500 rounded-2xl">
                  <CardHeader>
                    <CardTitle>To Do List</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {todos.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-start gap-3 p-2 rounded ${
                          item.completed ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={item.completed}
                          readOnly
                          className="mt-1 h-4 w-4"
                          onClick={() => handleToggleTodo(item.id)}
                        />
                        <div className="flex-1">
                          <p className={item.completed ? "line-through text-gray-500" : "text-gray-700"}>
                            {item.task}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-gray-500">Due: {item.deadline}</span>
                            {item.priority === "high" && (
                              <Badge variant="destructive">High Priority</Badge>
                            )}
                            {item.priority === "medium" && (
                              <Badge variant="secondary">Medium</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - split into two */}
              <div className="space-y-4 sm:space-y-6">
                {/* Finances */}
                <Card className="border-2 border-blue-500 rounded-2xl">
                  <CardHeader>
                    <CardTitle>Finances</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <p className="text-gray-600">Current Balance</p>
                      <p className={`${financeData.balance < 0 ? "text-red-600" : "text-green-600"}`}>
                        ${Math.abs(financeData.balance).toFixed(2)}
                      </p>
                      {financeData.balance < 0 && (
                        <p className="text-gray-500">Due by {financeData.dueDate}</p>
                      )}
                    </div>
                    <div className="border-t pt-3 space-y-2">
                      {financeData.items.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-gray-600">{item.description}</span>
                          <span className={item.amount < 0 ? "text-green-600" : "text-gray-700"}>
                            ${Math.abs(item.amount).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full" onClick={onNavigateToPayment}>
                      Make Payment
                    </Button>
                    <Button variant="outline" className="w-full" onClick={onNavigateToFinancialAid}>
                      Apply for Financial Aid
                    </Button>
                  </CardContent>
                </Card>

                {/* Apps Grid */}
                <Card className="border-2 border-blue-500 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      {appIcons.map((app, index) => (
                        <button
                          key={index}
                          className={`${app.color} hover:opacity-90 transition-opacity rounded-lg p-3 flex flex-col items-center justify-center gap-1`}
                          title={app.label}
                        >
                          <app.icon className="h-6 w-6 text-white" />
                          <span className="text-white text-[10px]">{app.label}</span>
                        </button>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => setIsAppsDialogOpen(true)}>
                      See all apps
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Apps Dialog */}
      <Dialog open={isAppsDialogOpen} onOpenChange={setIsAppsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>All Apps</DialogTitle>
            <DialogDescription>
              Access all the applications available to you.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-3">
            {allApps.map((app, index) => (
              <button
                key={index}
                className={`${app.color} hover:opacity-90 transition-opacity rounded-lg p-3 flex flex-col items-center justify-center gap-1`}
                title={app.label}
              >
                <app.icon className="h-6 w-6 text-white" />
                <span className="text-white text-[10px]">{app.label}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Announcement Details Dialog */}
      <Dialog open={!!selectedAnnouncement} onOpenChange={() => setSelectedAnnouncement(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedAnnouncement?.title}</DialogTitle>
            <DialogDescription>
              Posted on {selectedAnnouncement?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="whitespace-pre-line text-gray-700">
              {selectedAnnouncement?.fullDescription}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notification Details Dialog */}
      <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              {selectedNotification && (
                <selectedNotification.icon className={`h-6 w-6 ${selectedNotification.color}`} />
              )}
              <div>
                <DialogTitle>{selectedNotification?.message}</DialogTitle>
                <DialogDescription>
                  {selectedNotification?.time}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <div className="whitespace-pre-line text-gray-700">
              {selectedNotification?.fullDescription}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}