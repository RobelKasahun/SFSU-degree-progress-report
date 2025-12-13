import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Separator } from "./ui/separator";
import { GraduationCap, Award, BookOpen, Calendar, CheckCircle2, Circle, Calculator, Sparkles } from "lucide-react";
import { GPACalculator } from "./GPACalculator";
import { DegreeProgressAI } from "./DegreeProgressAI";

interface DegreeProgressReportProps {
  userData?: {
    firstName?: string;
    lastName?: string;
    studentId?: string;
    email?: string;
  };
}

// Mock student data - will be overridden by actual user data
const getMockStudentData = (userData?: DegreeProgressReportProps['userData']) => ({
  name: userData?.firstName && userData?.lastName 
    ? `${userData.firstName} ${userData.lastName}` 
    : "Student Name",
  studentId: userData?.studentId || "A00123456",
  major: "Computer Science",
  minor: "Mathematics",
  expectedGraduation: "May 2026",
  currentYear: "Junior",
  overallGPA: 3.67,
  majorGPA: 3.82,
  totalCreditsRequired: 120,
  creditsCompleted: 84,
  creditsInProgress: 15,
});

// Requirements data
const requirements = [
  {
    category: "General Education",
    required: 45,
    completed: 45,
    inProgress: 0,
    courses: [
      { code: "ENGL 101", name: "Composition I", credits: 3, grade: "A-", semester: "Fall 2022" },
      { code: "ENGL 102", name: "Composition II", credits: 3, grade: "B+", semester: "Spring 2023" },
      { code: "HIST 201", name: "World History", credits: 3, grade: "A", semester: "Fall 2022" },
      { code: "PHIL 150", name: "Critical Thinking", credits: 3, grade: "B+", semester: "Spring 2023" },
      { code: "PSYC 101", name: "Introduction to Psychology", credits: 3, grade: "A", semester: "Fall 2023" },
      { code: "BIOL 120", name: "Biology for Non-Majors", credits: 4, grade: "B", semester: "Fall 2022" },
      { code: "CHEM 110", name: "Chemistry Fundamentals", credits: 4, grade: "B+", semester: "Spring 2023" },
      { code: "ART 100", name: "Art Appreciation", credits: 3, grade: "A", semester: "Fall 2023" },
      { code: "COMM 200", name: "Public Speaking", credits: 3, grade: "A-", semester: "Spring 2024" },
      { code: "ECON 201", name: "Microeconomics", credits: 3, grade: "B+", semester: "Fall 2023" },
      { code: "POLI 101", name: "American Government", credits: 3, grade: "A-", semester: "Spring 2024" },
      { code: "SPAN 101", name: "Spanish I", credits: 3, grade: "A", semester: "Fall 2022" },
      { code: "SPAN 102", name: "Spanish II", credits: 3, grade: "A-", semester: "Spring 2023" },
      { code: "PE 100", name: "Physical Education", credits: 2, grade: "P", semester: "Fall 2022" },
      { code: "UNIV 101", name: "First Year Seminar", credits: 1, grade: "P", semester: "Fall 2022" },
    ]
  },
  {
    category: "Major Requirements",
    required: 51,
    completed: 30,
    inProgress: 12,
    courses: [
      { code: "CS 101", name: "Introduction to Computer Science", credits: 3, grade: "A", semester: "Fall 2022" },
      { code: "CS 102", name: "Data Structures", credits: 4, grade: "A-", semester: "Spring 2023" },
      { code: "CS 201", name: "Algorithms", credits: 4, grade: "B+", semester: "Fall 2023" },
      { code: "CS 220", name: "Computer Architecture", credits: 3, grade: "A-", semester: "Spring 2024" },
      { code: "CS 250", name: "Database Systems", credits: 3, grade: "A", semester: "Fall 2024" },
      { code: "CS 270", name: "Operating Systems", credits: 4, grade: "In Progress", semester: "Spring 2025" },
      { code: "CS 310", name: "Software Engineering", credits: 4, grade: "In Progress", semester: "Spring 2025" },
      { code: "CS 340", name: "Computer Networks", credits: 4, grade: "In Progress", semester: "Spring 2025" },
      { code: "MATH 151", name: "Calculus I", credits: 4, grade: "B+", semester: "Fall 2022" },
      { code: "MATH 152", name: "Calculus II", credits: 4, grade: "B", semester: "Spring 2023" },
      { code: "MATH 251", name: "Discrete Mathematics", credits: 3, grade: "A-", semester: "Fall 2023" },
    ]
  },
  {
    category: "Minor Requirements (Mathematics)",
    required: 18,
    completed: 9,
    inProgress: 3,
    courses: [
      { code: "MATH 253", name: "Linear Algebra", credits: 3, grade: "B+", semester: "Spring 2024" },
      { code: "MATH 301", name: "Differential Equations", credits: 3, grade: "A-", semester: "Fall 2024" },
      { code: "MATH 320", name: "Probability & Statistics", credits: 3, grade: "In Progress", semester: "Spring 2025" },
      { code: "STAT 410", name: "Statistical Methods", credits: 3, grade: "A", semester: "Fall 2024" },
    ]
  },
  {
    category: "Electives",
    required: 6,
    completed: 0,
    inProgress: 0,
    courses: []
  }
];

// Semester by semester breakdown
const semesterHistory = [
  {
    term: "Fall 2022",
    credits: 16,
    gpa: 3.65,
    courses: 7
  },
  {
    term: "Spring 2023",
    credits: 17,
    gpa: 3.52,
    courses: 6
  },
  {
    term: "Fall 2023",
    credits: 16,
    gpa: 3.75,
    courses: 5
  },
  {
    term: "Spring 2024",
    credits: 17,
    gpa: 3.71,
    courses: 5
  },
  {
    term: "Fall 2024",
    credits: 18,
    gpa: 3.89,
    courses: 5
  },
  {
    term: "Spring 2025",
    credits: 15,
    gpa: "In Progress",
    courses: 5
  }
];

export function DegreeProgressReport({ userData }: DegreeProgressReportProps) {
  const studentData = getMockStudentData(userData);
  const progressPercentage = (studentData.creditsCompleted / studentData.totalCreditsRequired) * 100;
  const projectedCredits = studentData.creditsCompleted + studentData.creditsInProgress;
  const projectedPercentage = (projectedCredits / studentData.totalCreditsRequired) * 100;

  return (
    <div className="container mx-auto p-3 sm:p-4 md:p-6 max-w-7xl space-y-4 sm:space-y-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg border border-purple-200">
        <div className="space-y-1 w-full sm:w-auto">
          <h1 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl md:text-3xl">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 sm:p-3 rounded-xl">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Degree Progress
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 ml-0 sm:ml-14">Academic Year 2024-2025</p>
        </div>
        <Badge variant="outline" className="px-3 py-1.5 sm:px-4 sm:py-2 border-purple-300 text-purple-700 text-xs sm:text-sm">
          Generated: Nov 16, 2025
        </Badge>
      </div>

      {/* Student Information */}
      <Card className="shadow-xl border-2 border-blue-200 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100 border-b-2 border-blue-200 p-4 sm:p-6">
          <CardTitle className="text-blue-800 text-base sm:text-lg">Student Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 sm:pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-500">Name</p>
              <p className="text-sm sm:text-base text-gray-800">{studentData.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-500">Student ID</p>
              <p className="text-sm sm:text-base text-gray-800">{studentData.studentId}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-500">Major</p>
              <p className="text-sm sm:text-base text-gray-800">{studentData.major}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-500">Minor</p>
              <p className="text-sm sm:text-base text-gray-800">{studentData.minor}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-500">Current Year</p>
              <p className="text-sm sm:text-base text-gray-800">{studentData.currentYear}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-500">Expected Graduation</p>
              <p className="text-sm sm:text-base text-gray-800">{studentData.expectedGraduation}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-500">Overall GPA</p>
              <p className="text-sm sm:text-base text-blue-700">{studentData.overallGPA}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-500">Major GPA</p>
              <p className="text-sm sm:text-base text-purple-700">{studentData.majorGPA}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Progress */}
      <Card className="shadow-xl border-2 border-purple-200 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 border-b-2 border-purple-200 p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-purple-800 text-base sm:text-lg">
            <Award className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
            Overall Degree Progress
          </CardTitle>
          <CardDescription className="text-purple-700 text-xs sm:text-sm">
            Track your progress toward graduation requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6">
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
              <span className="text-sm sm:text-base text-gray-700">Credits Completed</span>
              <span className="text-sm sm:text-base text-blue-700">
                {studentData.creditsCompleted} / {studentData.totalCreditsRequired} credits
              </span>
            </div>
            <div className="relative">
              <Progress value={progressPercentage} className="h-3 sm:h-4 bg-blue-100" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-white drop-shadow-md">
                  {progressPercentage.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          <Separator className="bg-purple-200" />

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
              <span className="text-sm sm:text-base text-gray-700">Projected Credits (Including Current)</span>
              <span className="text-sm sm:text-base text-purple-700">
                {projectedCredits} / {studentData.totalCreditsRequired} credits
              </span>
            </div>
            <div className="relative">
              <Progress value={projectedPercentage} className="h-3 sm:h-4 bg-purple-100" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-white drop-shadow-md">
                  {projectedPercentage.toFixed(1)}%
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              {studentData.totalCreditsRequired - projectedCredits} credits remaining after this semester
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 shadow-lg">
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-center space-y-1 sm:space-y-2">
                  <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mx-auto" />
                  <p className="text-sm sm:text-base text-green-700">Completed</p>
                  <p className="text-base sm:text-lg text-green-800">{studentData.creditsCompleted} credits</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 shadow-lg">
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-center space-y-1 sm:space-y-2">
                  <Circle className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto" />
                  <p className="text-sm sm:text-base text-blue-700">In Progress</p>
                  <p className="text-base sm:text-lg text-blue-800">{studentData.creditsInProgress} credits</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 shadow-lg">
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-center space-y-1 sm:space-y-2">
                  <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 mx-auto" />
                  <p className="text-sm sm:text-base text-orange-700">Remaining</p>
                  <p className="text-base sm:text-lg text-orange-800">{studentData.totalCreditsRequired - projectedCredits} credits</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Requirements Breakdown */}
      <Card className="shadow-xl border-2 border-blue-200 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 border-b-2 border-blue-200 p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-blue-800 text-base sm:text-lg">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Requirements Breakdown
          </CardTitle>
          <CardDescription className="text-blue-700 text-xs sm:text-sm">
            Progress in each degree requirement category
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {requirements.map((req) => {
            const percentage = (req.completed / req.required) * 100;
            const isComplete = req.completed >= req.required;
            
            return (
              <div key={req.category} className="space-y-3 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isComplete ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-400" />
                    )}
                    <h3 className="text-gray-800">{req.category}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-700">
                      {req.completed} / {req.required} credits
                    </span>
                    {isComplete && (
                      <Badge variant="default" className="bg-green-600">✓ Complete</Badge>
                    )}
                    {req.inProgress > 0 && !isComplete && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">{req.inProgress} in progress</Badge>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <Progress value={percentage} className="h-3 bg-slate-200" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs text-white drop-shadow-md">
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Detailed Course History */}
      <Tabs defaultValue="by-requirement" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-0 h-auto sm:h-10">
          <TabsTrigger value="by-requirement" className="text-xs sm:text-sm py-2 sm:py-0">Requirements</TabsTrigger>
          <TabsTrigger value="by-semester" className="text-xs sm:text-sm py-2 sm:py-0">Semester</TabsTrigger>
          <TabsTrigger value="gpa-calculator" className="text-xs sm:text-sm py-2 sm:py-0 flex items-center justify-center gap-1 sm:gap-2">
            <Calculator className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">GPA Calculator</span>
            <span className="sm:hidden">GPA</span>
          </TabsTrigger>
          <TabsTrigger value="ai-assistant" className="text-xs sm:text-sm py-2 sm:py-0 flex items-center justify-center gap-1 sm:gap-2">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">AI Assistant</span>
            <span className="sm:hidden">AI</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="by-requirement" className="space-y-4 mt-4">
          {requirements.map((req) => (
            <Card key={req.category}>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-sm sm:text-base">{req.category}</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {req.completed} of {req.required} credits completed
                  {req.inProgress > 0 && ` • ${req.inProgress} credits in progress`}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 sm:p-6 sm:pt-0">
                {req.courses.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs sm:text-sm">Code</TableHead>
                          <TableHead className="text-xs sm:text-sm">Course Name</TableHead>
                          <TableHead className="text-xs sm:text-sm">Credits</TableHead>
                          <TableHead className="text-xs sm:text-sm">Grade</TableHead>
                          <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Semester</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {req.courses.map((course, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="text-xs sm:text-sm">{course.code}</TableCell>
                            <TableCell className="text-xs sm:text-sm">{course.name}</TableCell>
                            <TableCell className="text-xs sm:text-sm">{course.credits}</TableCell>
                            <TableCell className="text-xs sm:text-sm">
                              {course.grade === "In Progress" ? (
                                <Badge variant="secondary" className="text-xs">{course.grade}</Badge>
                              ) : course.grade === "P" ? (
                                <Badge variant="outline" className="text-xs">Pass</Badge>
                              ) : (
                                <Badge variant="outline" className="text-xs">{course.grade}</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-xs sm:text-sm hidden sm:table-cell">{course.semester}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8 text-sm">
                    No courses completed in this category yet
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="by-semester">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Semester History
              </CardTitle>
              <CardDescription>
                Your academic progress by semester
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Semester</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Courses</TableHead>
                    <TableHead>Term GPA</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {semesterHistory.map((semester) => (
                    <TableRow key={semester.term}>
                      <TableCell>{semester.term}</TableCell>
                      <TableCell>{semester.credits}</TableCell>
                      <TableCell>{semester.courses}</TableCell>
                      <TableCell>
                        {semester.gpa === "In Progress" ? (
                          <Badge variant="secondary">In Progress</Badge>
                        ) : (
                          semester.gpa
                        )}
                      </TableCell>
                      <TableCell>
                        {semester.gpa === "In Progress" ? (
                          <Badge variant="default" className="bg-blue-600">Current</Badge>
                        ) : (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Complete
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gpa-calculator">
          <GPACalculator />
        </TabsContent>

        <TabsContent value="ai-assistant">
          <DegreeProgressAI
            studentData={studentData}
            requirements={requirements}
          />
        </TabsContent>
      </Tabs>

      {/* Graduation Readiness */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            Graduation Readiness
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-green-700 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Requirements Met
              </h4>
              <ul className="mt-2 space-y-1 ml-6">
                <li className="text-green-700">✓ General Education (45/45 credits)</li>
                <li className="text-green-700">✓ Minimum GPA requirement (2.0)</li>
                <li className="text-green-700">✓ Major GPA requirement (2.5)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-amber-700 flex items-center gap-2">
                <Circle className="h-4 w-4" />
                Requirements In Progress
              </h4>
              <ul className="mt-2 space-y-1 ml-6">
                <li className="text-amber-700">○ Major Requirements (42/51 credits)</li>
                <li className="text-amber-700">○ Minor Requirements (12/18 credits)</li>
                <li className="text-amber-700">○ Electives (0/6 credits)</li>
              </ul>
            </div>
          </div>
          <Separator />
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <p>
              <span>Based on your current progress, you are on track to graduate in <strong>{studentData.expectedGraduation}</strong>. To stay on track, you need to complete <strong>21 more credits</strong> after this semester.</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}