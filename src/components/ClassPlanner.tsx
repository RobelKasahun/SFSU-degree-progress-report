import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  ArrowLeft,
  Plus,
  Search,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  Users,
  BookOpen,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface Course {
  id: string;
  code: string;
  title: string;
  units: number;
  instructor: string;
  days: string[];
  time: string;
  location: string;
  seats: number;
  enrolled: number;
  prerequisites?: string;
  description: string;
}

const availableCourses: Course[] = [
  {
    id: "1",
    code: "CSC 600",
    title: "Advanced Topics in Computer Science",
    units: 3,
    instructor: "Dr. Emily Rodriguez",
    days: ["Mon", "Wed"],
    time: "6:00 PM - 7:15 PM",
    location: "Thornton Hall 301",
    seats: 30,
    enrolled: 18,
    prerequisites: "CSC 413 or equivalent",
    description: "Advanced study of current topics in computer science including distributed systems, cloud computing, and machine learning applications.",
  },
  {
    id: "2",
    code: "CSC 648",
    title: "Software Engineering",
    units: 3,
    instructor: "Prof. Michael Chang",
    days: ["Tue", "Thu"],
    time: "4:00 PM - 5:15 PM",
    location: "Thornton Hall 212",
    seats: 35,
    enrolled: 31,
    prerequisites: "CSC 413",
    description: "Comprehensive coverage of software development lifecycle, agile methodologies, version control, testing, and project management.",
  },
  {
    id: "3",
    code: "CSC 665",
    title: "Artificial Intelligence",
    units: 3,
    instructor: "Dr. Sarah Johnson",
    days: ["Mon", "Wed"],
    time: "7:30 PM - 8:45 PM",
    location: "Thornton Hall 301",
    seats: 25,
    enrolled: 25,
    prerequisites: "CSC 413, MATH 227",
    description: "Introduction to AI concepts including search algorithms, knowledge representation, machine learning, neural networks, and natural language processing.",
  },
  {
    id: "4",
    code: "CSC 675",
    title: "Database Systems",
    units: 3,
    instructor: "Prof. David Kim",
    days: ["Tue", "Thu"],
    time: "6:00 PM - 7:15 PM",
    location: "Thornton Hall 401",
    seats: 30,
    enrolled: 22,
    prerequisites: "CSC 413",
    description: "Design and implementation of database systems, SQL, NoSQL, database normalization, transactions, and distributed databases.",
  },
  {
    id: "5",
    code: "CSC 690",
    title: "Graduate Seminar",
    units: 1,
    instructor: "Various Faculty",
    days: ["Fri"],
    time: "2:00 PM - 3:50 PM",
    location: "Thornton Hall 101",
    seats: 50,
    enrolled: 12,
    description: "Weekly presentations by faculty, students, and industry professionals on current research and trends in computer science.",
  },
  {
    id: "6",
    code: "MATH 301",
    title: "Discrete Mathematics",
    units: 3,
    instructor: "Dr. Patricia Anderson",
    days: ["Mon", "Wed", "Fri"],
    time: "10:00 AM - 10:50 AM",
    location: "Thornton Hall 105",
    seats: 40,
    enrolled: 35,
    prerequisites: "MATH 226",
    description: "Logic, sets, relations, functions, counting techniques, graph theory, and mathematical proof techniques.",
  },
  {
    id: "7",
    code: "ENGR 697",
    title: "Technical Writing",
    units: 3,
    instructor: "Prof. Jennifer Wong",
    days: ["Tue"],
    time: "6:00 PM - 8:45 PM",
    location: "Engineering Building 220",
    seats: 25,
    enrolled: 19,
    description: "Development of technical writing skills including reports, proposals, documentation, and professional communication.",
  },
  {
    id: "8",
    code: "CSC 680",
    title: "Mobile Application Development",
    units: 3,
    instructor: "Dr. Robert Lee",
    days: ["Wed"],
    time: "6:00 PM - 8:45 PM",
    location: "Thornton Hall 212",
    seats: 28,
    enrolled: 24,
    prerequisites: "CSC 413",
    description: "Design and development of mobile applications for iOS and Android platforms, including UI/UX principles and deployment.",
  },
];

interface ClassPlannerProps {
  onBack: () => void;
  backText?: string;
}

export function ClassPlanner({ onBack, backText = "Back" }: ClassPlannerProps) {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseDetails, setShowCourseDetails] = useState(false);

  const filteredCourses = availableCourses.filter(
    (course) =>
      !selectedCourses.find((c) => c.id === course.id) &&
      (course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalUnits = selectedCourses.reduce((sum, course) => sum + course.units, 0);

  const handleAddCourse = (course: Course) => {
    setSelectedCourses([...selectedCourses, course]);
  };

  const handleRemoveCourse = (courseId: string) => {
    setSelectedCourses(selectedCourses.filter((c) => c.id !== courseId));
  };

  const handleViewDetails = (course: Course) => {
    setSelectedCourse(course);
    setShowCourseDetails(true);
  };

  const getSeatsStatus = (course: Course) => {
    const remaining = course.seats - course.enrolled;
    if (remaining === 0) return { text: "Full", color: "bg-red-100 text-red-700" };
    if (remaining <= 5) return { text: `${remaining} left`, color: "bg-orange-100 text-orange-700" };
    return { text: `${remaining} open`, color: "bg-green-100 text-green-700" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {backText}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Available Courses */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-2 border-blue-400 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  Available Courses - Spring 2025
                </CardTitle>
                <div className="mt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search by course code, title, or instructor..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 max-h-[calc(100vh-250px)] overflow-y-auto">
                <div className="space-y-3">
                  {filteredCourses.map((course) => {
                    const seatsStatus = getSeatsStatus(course);
                    return (
                      <Card
                        key={course.id}
                        className="border border-gray-200 hover:border-blue-400 transition-all hover:shadow-lg"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-gray-800">{course.code}</h4>
                                <Badge className={seatsStatus.color}>
                                  {seatsStatus.text}
                                </Badge>
                              </div>
                              <p className="text-gray-700">{course.title}</p>
                              <p className="text-gray-500">{course.instructor}</p>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline" className="mb-2">
                                {course.units} units
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{course.days.join(", ")}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{course.time}</span>
                            </div>
                            <div className="flex items-center gap-1 col-span-2">
                              <MapPin className="h-4 w-4" />
                              <span>{course.location}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewDetails(course)}
                              className="flex-1"
                            >
                              View Details
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleAddCourse(course)}
                              disabled={course.enrolled >= course.seats}
                              className="flex-1 bg-blue-600 hover:bg-blue-700"
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add to Plan
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}

                  {filteredCourses.length === 0 && (
                    <div className="text-center py-12">
                      <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">No courses found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right - My Plan */}
          <div className="space-y-4">
            <Card className="border-2 border-purple-400 shadow-xl sticky top-6">
              <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    My Plan
                  </span>
                  <Badge className="bg-purple-600 text-white">
                    {totalUnits} units
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {/* Unit Status */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-2 border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Total Units:</span>
                    <span className="text-blue-700">{totalUnits}</span>
                  </div>
                  {totalUnits < 12 && (
                    <div className="flex items-start gap-2 mt-2 text-sm text-orange-700">
                      <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>Below full-time status (12 units minimum)</span>
                    </div>
                  )}
                  {totalUnits >= 12 && totalUnits <= 18 && (
                    <div className="flex items-start gap-2 mt-2 text-sm text-green-700">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>Full-time student status</span>
                    </div>
                  )}
                  {totalUnits > 18 && (
                    <div className="flex items-start gap-2 mt-2 text-sm text-red-700">
                      <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>Exceeds 18 units (requires petition)</span>
                    </div>
                  )}
                </div>

                {/* Selected Courses */}
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {selectedCourses.map((course) => (
                    <Card key={course.id} className="border border-purple-200">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="text-gray-800">{course.code}</h4>
                            <p className="text-gray-600">{course.title}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveCourse(course.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">{course.days.join(", ")}</span>
                          <Badge variant="outline">{course.units} units</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {selectedCourses.length === 0 && (
                    <div className="text-center py-12">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">No courses added yet</p>
                      <p className="text-gray-400 text-sm mt-1">
                        Add courses from the list
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {selectedCourses.length > 0 && (
                  <div className="space-y-2 pt-4 border-t">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Save Plan
                    </Button>
                    <Button variant="outline" className="w-full">
                      Export Schedule
                    </Button>
                  </div>
                )}

                {/* Important Notes */}
                <Card className="bg-yellow-50 border border-yellow-300">
                  <CardContent className="p-3 text-sm">
                    <p className="text-yellow-800 mb-2">📌 Important Notes:</p>
                    <ul className="text-yellow-700 space-y-1 text-xs">
                      <li>• Registration opens Dec 15, 2024</li>
                      <li>• Full-time: 12+ units</li>
                      <li>• Max: 18 units without petition</li>
                      <li>• Check prerequisites before enrolling</li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Course Details Dialog */}
      <Dialog open={showCourseDetails} onOpenChange={setShowCourseDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              {selectedCourse?.code} - {selectedCourse?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedCourse?.units} units • {selectedCourse?.instructor}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Course Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-gray-700 mb-2">Schedule</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{selectedCourse?.days.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{selectedCourse?.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{selectedCourse?.location}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-gray-700 mb-2">Enrollment</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Enrolled:</span>
                    <span className="text-gray-800">{selectedCourse?.enrolled}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Seats:</span>
                    <span className="text-gray-800">{selectedCourse?.seats}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available:</span>
                    <span className="text-green-600">
                      {selectedCourse ? selectedCourse.seats - selectedCourse.enrolled : 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prerequisites */}
            {selectedCourse?.prerequisites && (
              <div>
                <h4 className="text-gray-700 mb-2">Prerequisites</h4>
                <p className="text-sm text-gray-600 bg-orange-50 p-3 rounded-lg border border-orange-200">
                  {selectedCourse.prerequisites}
                </p>
              </div>
            )}

            {/* Description */}
            <div>
              <h4 className="text-gray-700 mb-2">Course Description</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {selectedCourse?.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  if (selectedCourse) {
                    handleAddCourse(selectedCourse);
                    setShowCourseDetails(false);
                  }
                }}
                disabled={
                  selectedCourse
                    ? selectedCourse.enrolled >= selectedCourse.seats ||
                      selectedCourses.find((c) => c.id === selectedCourse.id) !== undefined
                    : false
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to My Plan
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowCourseDetails(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
