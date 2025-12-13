import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Calendar,
  MapPin,
  Monitor,
  Users,
  GraduationCap,
  DollarSign,
  CreditCard,
  BookOpen,
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  FileText,
} from "lucide-react";

const scheduleData = [
  {
    course: "CSC 615-02",
    title: "Advanced Computer Architecture",
    time: "6:00pm",
    endTime: "8:45pm",
    day: "Tue",
    location: "HUS Building 349",
    mode: "In Person",
    instructor: "Dr. Sarah Johnson",
    color: "bg-blue-500",
  },
  {
    course: "CSC 619-03",
    title: "Operating Systems Theory",
    time: "6:00pm",
    endTime: "8:45pm",
    day: "Mon",
    location: "HUS Building 349",
    mode: "In Person",
    instructor: "Dr. Michael Chen",
    color: "bg-purple-500",
  },
  {
    course: "CSC 642-01",
    title: "Web Development",
    time: "6:00pm",
    endTime: "8:45pm",
    day: "Sat",
    location: "HUS Building 349",
    mode: "In Person",
    instructor: "Prof. Emily Martinez",
    color: "bg-green-500",
  },
  {
    course: "ERTH 310-01",
    title: "Environmental Science",
    time: "TBA",
    endTime: "",
    day: "",
    location: "Online",
    mode: "Online",
    instructor: "Dr. Robert Lee",
    color: "bg-orange-500",
  },
  {
    course: "IS 330-01",
    title: "Information Systems Management",
    time: "TBA",
    endTime: "",
    day: "",
    location: "Online",
    mode: "Online",
    instructor: "Prof. Jennifer Wong",
    color: "bg-pink-500",
  },
];

// Holds and Alerts data
const holdsData = [
  {
    id: 1,
    type: "financial",
    title: "Financial Hold",
    description: "Outstanding balance on your account",
    severity: "high",
    icon: AlertTriangle,
    color: "text-red-600",
    fullDescription: "FINANCIAL HOLD\n\nType: Payment Hold\nStatus: Active\nDate Applied: November 15, 2024\n\nDescription:\nYou have an outstanding balance of $2,450.00 on your student account. This hold will prevent you from registering for classes, receiving transcripts, or obtaining your diploma until the balance is paid in full.\n\nOutstanding Balance: $2,450.00\nDue Date: January 5, 2025\n\nWhat this means:\n• Cannot register for Spring 2025 classes\n• Cannot request official transcripts\n Cannot receive degree/diploma\n• Cannot access certain student services\n\nHow to resolve:\n1. Make a payment through the student portal\n2. Set up a payment plan with the Bursar's Office\n3. Apply for emergency financial aid if eligible\n\nContact Information:\nBursar's Office\nEmail: bursar@sfsu.edu\nPhone: (415) 338-1527\nOffice Hours: Monday-Friday, 9:00 AM - 4:00 PM\n\nImportant: This hold must be cleared before the Spring 2025 registration deadline (January 20, 2025).",
  },
  {
    id: 2,
    type: "advising",
    title: "Advising Alert",
    description: "Required to meet with academic advisor",
    severity: "medium",
    icon: Bell,
    color: "text-orange-600",
    fullDescription: "ACADEMIC ADVISING ALERT\n\nType: Mandatory Advising Appointment\nStatus: Action Required\nDeadline: December 20, 2024\n\nDescription:\nYou are required to meet with your academic advisor before registering for Spring 2025 courses. This requirement has been placed on your account to ensure you are on track for graduation and selecting appropriate courses.\n\nReason for Alert:\n• Approaching senior year (90+ units completed)\n• Major declaration verification needed\n• Graduation planning required\n\nWhat you need to do:\n1. Schedule an appointment with your assigned advisor\n2. Prepare your unofficial transcript and degree audit\n3. Come prepared with questions about graduation requirements\n4. Discuss your academic and career goals\n\nYour Academic Advisor:\nDr. Patricia Anderson\nDepartment of Computer Science\nEmail: panderson@sfsu.edu\nOffice: Thornton Hall 908\nOffice Hours: Tuesday & Thursday, 2:00-4:00 PM\n\nScheduling:\n• Online: Navigate.sfsu.edu\n• Phone: (415) 338-1787\n• Walk-in: Limited availability\n\nTopics to Discuss:\n• Remaining degree requirements\n• Spring 2025 course selection\n• Graduation application timeline\n• Career planning and internship opportunities\n• Graduate school preparation (if applicable)\n\nThis alert will be removed once you complete your advising appointment.",
  },
];

// Upcoming Enrollments data
const enrollmentsData = [
  {
    id: 1,
    term: "Spring 2025",
    registrationDate: "December 15, 2024",
    status: "upcoming",
    details: "Your registration appointment is coming up",
    icon: Calendar,
    color: "text-blue-600",
    fullDescription: "SPRING 2025 REGISTRATION\n\nTerm: Spring 2025\nRegistration Opens: December 15, 2024 at 9:00 AM\nClasses Begin: January 27, 2025\n\nYour Priority Registration:\nDate: December 15, 2024\nTime: 9:00 AM PST\nPriority Level: Senior Standing\n\nRegistration Windows:\n• Seniors: December 15-17, 2024\n• Juniors: December 18-20, 2024\n• Sophomores: December 21-23, 2024\n• Freshmen: December 26-28, 2024\n• Open Registration: December 29, 2024 - January 20, 2025\n\nImportant Information:\n\nBefore You Register:\n✓ Clear all holds on your account\n✓ Meet with your academic advisor (if required)\n✓ Review your degree audit\n✓ Plan your course schedule using Class Planner\n✓ Check prerequisites for desired courses\n\nRegistration Tips:\n• Have backup courses ready in case primary choices are full\n• Register as early as possible during your window\n• Check for waitlist options if courses are full\n• Verify course times don't conflict\n• Consider both in-person and online options\n\nAdd/Drop Period:\n• Add Deadline: February 10, 2025\n• Drop Deadline (no W): February 10, 2025\n• Withdrawal Deadline (with W): April 15, 2025\n\nImportant Dates:\n• Spring Break: March 17-21, 2025\n• Last Day of Instruction: May 16, 2025\n• Final Exams: May 19-23, 2025\n• Grades Due: May 30, 2025\n\nCourse Load:\n• Full-time: 12+ units\n• Part-time: 6-11 units\n• Financial Aid: Minimum 12 units usually required\n• Maximum: 18 units (without petition)\n\nNeed Help?\nRegistrar's Office\nEmail: registrar@sfsu.edu\nPhone: (415) 338-2181\nStudent Services Building, 1st Floor\nMonday-Friday: 9:00 AM - 4:00 PM\n\nOnline Resources:\n• Class Schedule: schedule.sfsu.edu\n• Class Planner: mysfsu.sfsu.edu\n• Course Catalog: bulletin.sfsu.edu",
  },
  {
    id: 2,
    term: "Summer 2025",
    registrationDate: "March 1, 2025",
    status: "future",
    details: "Registration opens in March",
    icon: Clock,
    color: "text-green-600",
    fullDescription: "SUMMER 2025 REGISTRATION\n\nTerm: Summer 2025\nRegistration Opens: March 1, 2025\nSession Start Dates: Various (May - August)\n\nSummer Session Information:\nSFSU offers multiple summer sessions to help you accelerate your degree progress, make up credits, or explore new subjects.\n\nSession Options:\n\n6-Week Session (Session A):\n• Dates: May 27 - July 3, 2025\n• Registration: March 1 - May 20, 2025\n• Intensive format: 2-3 units typical\n\n6-Week Session (Session B):\n• Dates: July 7 - August 15, 2025\n• Registration: March 1 - July 1, 2025\n• Intensive format: 2-3 units typical\n\n10-Week Session:\n• Dates: May 27 - August 8, 2025\n• Registration: March 1 - May 20, 2025\n• Standard format: 3-4 units typical\n\nBenefits of Summer Enrollment:\n• Lighter course load allows focus on difficult subjects\n• Get ahead on degree requirements\n• Make up failed or dropped courses\n• Smaller class sizes\n• Flexible scheduling options\n• Many courses offered online\n• Take courses at any CSU campus\n\nPopular Summer Courses:\n• General Education requirements\n• Lower-division major prerequisites\n• Writing and communication courses\n• Math and science courses\n• Language courses\n\nTuition & Fees (Estimated):\n• Per Unit Fee: $280\n• 3-unit course: ~$840\n• 6-unit summer: ~$1,680\n• Financial aid may be available\n\nRegistration Process:\n1. Check summer schedule (available February 2025)\n2. Consult with academic advisor\n3. Register online during registration period\n4. Pay fees by deadline to avoid being dropped\n\nImportant Notes:\n• Summer courses are self-supporting (not covered by standard tuition)\n• Must be admitted to SFSU or registered as visiting student\n• Some courses may be cancelled due to low enrollment\n• Check prerequisite requirements before registering\n\nFor More Information:\nSummer Session Office\nEmail: summer@sfsu.edu\nPhone: (415) 338-1653\nWebsite: summer.sfsu.edu",
  },
  {
    id: 3,
    term: "Fall 2025",
    registrationDate: "April 15, 2025",
    status: "future",
    details: "Registration opens in April",
    icon: FileText,
    color: "text-purple-600",
    fullDescription: "FALL 2025 REGISTRATION\n\nTerm: Fall 2025\nRegistration Opens: April 15, 2025\nClasses Begin: August 25, 2025\n\nAdvance Notice:\nRegistration for Fall 2025 will open on April 15, 2025. Priority registration will be assigned based on units completed and class level at the time of registration.\n\nExpected Priority Windows:\n• Graduate Students: April 15-16, 2025\n• Seniors (90+ units): April 17-19, 2025\n• Juniors (60-89 units): April 20-22, 2025\n• Sophomores (30-59 units): April 23-25, 2025\n• Freshmen (0-29 units): April 26-28, 2025\n• Open Registration: April 29 - August 18, 2025\n\nPrepare Now:\n• Meet with your advisor in Spring 2025\n• Review your degree progress\n• Identify courses needed for Fall 2025\n• Check course rotation schedules\n• Plan for final year (if approaching graduation)\n\nGraduation Consideration:\nIf you plan to graduate in Spring 2026, Fall 2025 is crucial for:\n• Completing upper-division major requirements\n• Finishing any remaining GE requirements\n• Taking capstone or senior project courses\n• Enrolling in sequences that continue in Spring 2026\n\nImportant Dates:\n• Fall Welcome Week: August 18-22, 2025\n• First Day of Classes: August 25, 2025\n• Labor Day (no classes): September 1, 2025\n• Add/Drop Deadline: September 12, 2025\n• Thanksgiving Break: November 24-28, 2025\n• Last Day of Instruction: December 12, 2025\n• Final Exams: December 15-19, 2025\n\nNew for Fall 2025:\n• Expanded online course offerings\n• New hybrid learning options\n• Additional evening sections for working students\n• New courses in emerging technologies\n\nStay Updated:\nCheck your SFSU email and student portal regularly for:\n• Registration appointment time\n• Course schedule release\n• Important deadlines and updates\n• New course offerings\n\nQuestions?\nContact the Office of the Registrar\nEmail: registrar@sfsu.edu\nPhone: (415) 338-2181",
  },
];

interface WeeklyScheduleDashboardProps {
  userData?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  onNavigateToDegree?: () => void;
  onNavigateToPayment?: () => void;
  onNavigateToFinancialAid?: () => void;
  onNavigateToClassPlanner?: () => void;
}

export function WeeklyScheduleDashboard({
  userData,
  onNavigateToDegree,
  onNavigateToPayment,
  onNavigateToFinancialAid,
  onNavigateToClassPlanner,
}: WeeklyScheduleDashboardProps) {
  const [selectedHold, setSelectedHold] = useState<typeof holdsData[0] | null>(null);
  const [selectedEnrollment, setSelectedEnrollment] = useState<typeof enrollmentsData[0] | null>(null);
  const [showAccountSummary, setShowAccountSummary] = useState(false);

  const fullName = userData?.firstName && userData?.lastName
    ? `${userData.firstName} ${userData.lastName}`
    : "Student";
  const initials = userData?.firstName && userData?.lastName
    ? `${userData.firstName[0]}${userData.lastName[0]}`
    : "SN";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-purple-200">
          <div>
            <h1 className="text-purple-700">Welcome back, {fullName}</h1>
            <p className="text-blue-600 flex items-center gap-2 mt-1">
              <GraduationCap className="h-5 w-5" />
              Academic Dashboard
            </p>
          </div>
          <Avatar className="h-14 w-14 border-4 border-purple-300 shadow-lg">
            <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Quick Actions */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="border-2 border-purple-300 rounded-2xl shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-t-2xl">
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <BookOpen className="h-5 w-5" />
                  Academics
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-purple-50 transition-all"
                  onClick={onNavigateToClassPlanner}
                >
                  <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                  Class Planner
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-purple-50 transition-all"
                  onClick={onNavigateToDegree}
                >
                  <GraduationCap className="h-4 w-4 mr-2 text-purple-600" />
                  Degree Progress
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-300 rounded-2xl shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-t-2xl">
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <DollarSign className="h-5 w-5" />
                  Financial
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-green-50 transition-all"
                  onClick={() => setShowAccountSummary(true)}
                >
                  <FileText className="h-4 w-4 mr-2 text-green-600" />
                  Account Summary
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-green-50 transition-all"
                  onClick={onNavigateToFinancialAid}
                >
                  <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                  Financial Aid
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-green-50 transition-all"
                  onClick={onNavigateToPayment}
                >
                  <CreditCard className="h-4 w-4 mr-2 text-green-600" />
                  Make Payment
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Center - Weekly Schedule */}
          <div className="lg:col-span-6">
            <Card className="border-2 border-blue-400 rounded-2xl shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-t-2xl">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Calendar className="h-6 w-6" />
                  This Week's Schedule
                </CardTitle>
                <p className="text-gray-600">Fall 2024 • Week of December 9-15</p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {scheduleData.map((item, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-blue-400 transition-all hover:shadow-lg bg-white"
                    >
                      {/* Color accent bar */}
                      <div className={`absolute left-0 top-0 bottom-0 w-2 ${item.color}`} />
                      
                      <div className="p-4 pl-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-gray-800">{item.course}</h4>
                            <p className="text-gray-600">{item.title}</p>
                            <p className="text-gray-500">{item.instructor}</p>
                          </div>
                          <Badge
                            className={`${
                              item.mode === "Online"
                                ? "bg-orange-100 text-orange-700 hover:bg-orange-100"
                                : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                            }`}
                          >
                            {item.mode === "Online" ? (
                              <Monitor className="h-3 w-3 mr-1" />
                            ) : (
                              <MapPin className="h-3 w-3 mr-1" />
                            )}
                            {item.mode}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 mt-3 text-sm">
                          {item.time !== "TBA" && (
                            <div className="flex items-center gap-2 text-blue-600">
                              <Clock className="h-4 w-4" />
                              <span>
                                {item.day}: {item.time} - {item.endTime}
                              </span>
                            </div>
                          )}
                          {item.time === "TBA" && (
                            <div className="flex items-center gap-2 text-orange-600">
                              <Clock className="h-4 w-4" />
                              <span>Time: TBA</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-gray-600">
                            {item.location === "Online" ? (
                              <Monitor className="h-4 w-4" />
                            ) : (
                              <MapPin className="h-4 w-4" />
                            )}
                            <span>{item.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Alerts & Enrollments */}
          <div className="lg:col-span-3 space-y-4">
            {/* Holds and Alerts */}
            <Card className="border-2 border-red-300 rounded-2xl shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-red-100 to-orange-100 rounded-t-2xl">
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <AlertTriangle className="h-5 w-5" />
                  Holds & Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {holdsData.map((hold) => (
                  <div
                    key={hold.id}
                    className="p-3 bg-red-50 rounded-lg border border-red-200 cursor-pointer hover:bg-red-100 transition-all"
                    onClick={() => setSelectedHold(hold)}
                  >
                    <div className="flex items-start gap-2">
                      <hold.icon className={`h-5 w-5 ${hold.color} flex-shrink-0 mt-0.5`} />
                      <div className="flex-1">
                        <h4 className="text-gray-800">{hold.title}</h4>
                        <p className="text-gray-600">{hold.description}</p>
                        <p className="text-blue-600 mt-1">Click for details →</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Enrollments */}
            <Card className="border-2 border-blue-300 rounded-2xl shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-t-2xl">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Calendar className="h-5 w-5" />
                  Upcoming Enrollments
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {enrollmentsData.map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      enrollment.status === "upcoming"
                        ? "bg-blue-50 border-blue-300 hover:bg-blue-100"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedEnrollment(enrollment)}
                  >
                    <div className="flex items-start gap-2">
                      <enrollment.icon className={`h-5 w-5 ${enrollment.color} flex-shrink-0 mt-0.5`} />
                      <div className="flex-1">
                        <h4 className="text-gray-800">{enrollment.term}</h4>
                        <p className="text-gray-600">{enrollment.registrationDate}</p>
                        <p className="text-gray-500">{enrollment.details}</p>
                        <p className="text-blue-600 mt-1">Click for details →</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Hold Details Dialog */}
      <Dialog open={!!selectedHold} onOpenChange={() => setSelectedHold(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              {selectedHold && (
                <selectedHold.icon className={`h-6 w-6 ${selectedHold.color}`} />
              )}
              <div>
                <DialogTitle>{selectedHold?.title}</DialogTitle>
                <DialogDescription>
                  Action required to resolve this hold
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <div className="whitespace-pre-line text-gray-700">
              {selectedHold?.fullDescription}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Enrollment Details Dialog */}
      <Dialog open={!!selectedEnrollment} onOpenChange={() => setSelectedEnrollment(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              {selectedEnrollment && (
                <selectedEnrollment.icon className={`h-6 w-6 ${selectedEnrollment.color}`} />
              )}
              <div>
                <DialogTitle>{selectedEnrollment?.term} Registration</DialogTitle>
                <DialogDescription>
                  Opens {selectedEnrollment?.registrationDate}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <div className="whitespace-pre-line text-gray-700">
              {selectedEnrollment?.fullDescription}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Account Summary Dialog */}
      <Dialog open={showAccountSummary} onOpenChange={setShowAccountSummary}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              Account Summary
            </DialogTitle>
            <DialogDescription>
              Fall 2024 - Spring 2025 Academic Year
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Balance Overview */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl border-2 border-red-200">
              <h3 className="text-red-700 mb-3">Current Balance</h3>
              <p className="text-red-700">-$2,450.00</p>
              <p className="text-gray-600 mt-2">Due by: January 5, 2025</p>
            </div>

            {/* Charges */}
            <div>
              <h3 className="text-gray-700 mb-3">Charges</h3>
              <div className="space-y-2">
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Fall 2024 Tuition</span>
                  <span className="text-gray-800">$3,732.00</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Campus Fees</span>
                  <span className="text-gray-800">$568.00</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Health Services Fee</span>
                  <span className="text-gray-800">$200.00</span>
                </div>
                <div className="flex justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-blue-700">Total Charges</span>
                  <span className="text-blue-800">$4,500.00</span>
                </div>
              </div>
            </div>

            {/* Payments & Financial Aid */}
            <div>
              <h3 className="text-gray-700 mb-3">Payments & Financial Aid</h3>
              <div className="space-y-2">
                <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Payment Received - 10/15/24</span>
                  <span className="text-green-600">-$1,050.00</span>
                </div>
                <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Financial Aid Applied</span>
                  <span className="text-green-600">-$1,000.00</span>
                </div>
                <div className="flex justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-blue-700">Total Payments</span>
                  <span className="text-blue-800">-$2,050.00</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={onNavigateToPayment}>
                <CreditCard className="h-4 w-4 mr-2" />
                Make Payment
              </Button>
              <Button variant="outline" className="flex-1">
                <FileText className="h-4 w-4 mr-2" />
                View Full Statement
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}