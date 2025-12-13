import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calculator, Plus, Trash2, RotateCcw } from "lucide-react";

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

const gradePoints: { [key: string]: number } = {
  "A+": 4.0,
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D+": 1.3,
  "D": 1.0,
  "D-": 0.7,
  "F": 0.0,
};

const grades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];

export function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseName, setCourseName] = useState("");
  const [courseCredits, setCourseCredits] = useState("");
  const [courseGrade, setCourseGrade] = useState("");
  
  // For cumulative GPA calculation
  const [previousCredits, setPreviousCredits] = useState("");
  const [previousGPA, setPreviousGPA] = useState("");

  const addCourse = () => {
    if (!courseName || !courseCredits || !courseGrade) {
      return;
    }

    const newCourse: Course = {
      id: Date.now().toString(),
      name: courseName,
      credits: parseFloat(courseCredits),
      grade: courseGrade,
    };

    setCourses([...courses, newCourse]);
    setCourseName("");
    setCourseCredits("");
    setCourseGrade("");
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const clearAll = () => {
    setCourses([]);
    setCourseName("");
    setCourseCredits("");
    setCourseGrade("");
  };

  const calculateSemesterGPA = () => {
    if (courses.length === 0) return 0;

    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      const points = gradePoints[course.grade] || 0;
      totalPoints += points * course.credits;
      totalCredits += course.credits;
    });

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  };

  const calculateCumulativeGPA = () => {
    const semesterGPA = calculateSemesterGPA();
    const semesterCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    
    const prevCredits = parseFloat(previousCredits) || 0;
    const prevGPA = parseFloat(previousGPA) || 0;

    if (prevCredits === 0) return semesterGPA;

    const prevPoints = prevGPA * prevCredits;
    const currentPoints = semesterGPA * semesterCredits;
    const totalCredits = prevCredits + semesterCredits;

    return totalCredits > 0 ? (prevPoints + currentPoints) / totalCredits : 0;
  };

  const semesterGPA = calculateSemesterGPA();
  const cumulativeGPA = calculateCumulativeGPA();
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            GPA Calculator
          </CardTitle>
          <CardDescription>
            Calculate your semester or cumulative GPA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cumulative" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cumulative">Project New GPA</TabsTrigger>
              <TabsTrigger value="semester">Semester GPA Only</TabsTrigger>
            </TabsList>

            <TabsContent value="semester" className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-900">
                  Calculate GPA for current semester courses only. Use <strong>"Project New GPA"</strong> tab if you want to see how new courses will affect your cumulative GPA.
                </p>
              </div>
              
              {/* Add Course Form */}
              <Card className="bg-slate-50">
                <CardHeader>
                  <CardTitle>Add Course</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="course-name">Course Name</Label>
                      <Input
                        id="course-name"
                        placeholder="e.g., CS 101"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            addCourse();
                          }
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course-credits">Credit Hours</Label>
                      <Input
                        id="course-credits"
                        type="number"
                        min="0"
                        step="0.5"
                        placeholder="e.g., 3"
                        value={courseCredits}
                        onChange={(e) => setCourseCredits(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            addCourse();
                          }
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course-grade">Grade</Label>
                      <Select value={courseGrade} onValueChange={setCourseGrade}>
                        <SelectTrigger id="course-grade">
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {grades.map((grade) => (
                            <SelectItem key={grade} value={grade}>
                              {grade} ({gradePoints[grade].toFixed(1)})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={addCourse} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Course
                    </Button>
                    {courses.length > 0 && (
                      <Button onClick={clearAll} variant="outline" className="flex items-center gap-2">
                        <RotateCcw className="h-4 w-4" />
                        Clear All
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Courses Table */}
              {courses.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Courses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course</TableHead>
                          <TableHead>Credits</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead>Grade Points</TableHead>
                          <TableHead>Quality Points</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {courses.map((course) => (
                          <TableRow key={course.id}>
                            <TableCell>{course.name}</TableCell>
                            <TableCell>{course.credits}</TableCell>
                            <TableCell>{course.grade}</TableCell>
                            <TableCell>{gradePoints[course.grade].toFixed(2)}</TableCell>
                            <TableCell>
                              {(gradePoints[course.grade] * course.credits).toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCourse(course.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-slate-50">
                          <TableCell>Total</TableCell>
                          <TableCell>{totalCredits}</TableCell>
                          <TableCell colSpan={2}></TableCell>
                          <TableCell>
                            {courses.reduce(
                              (sum, course) => sum + gradePoints[course.grade] * course.credits,
                              0
                            ).toFixed(2)}
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}

              {/* Semester GPA Result */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <p className="text-gray-600">Semester GPA</p>
                    <p className="text-blue-700">{semesterGPA.toFixed(2)}</p>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div>
                        <p className="text-gray-600">Total Credits</p>
                        <p className="text-gray-900">{totalCredits.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total Quality Points</p>
                        <p className="text-gray-900">
                          {courses.reduce(
                            (sum, course) => sum + gradePoints[course.grade] * course.credits,
                            0
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cumulative" className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-900">
                  <strong>How to use:</strong> Enter your current GPA and credits below, then add the new courses you're taking to see your projected cumulative GPA.
                </p>
              </div>

              {/* Previous GPA Information - Moved to top */}
              <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300">
                <CardHeader>
                  <CardTitle>Your Current Academic Record</CardTitle>
                  <CardDescription>
                    Enter your current cumulative GPA and total credits earned
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="previous-credits">Current Total Credits Earned</Label>
                      <Input
                        id="previous-credits"
                        type="number"
                        min="0"
                        step="0.5"
                        placeholder="e.g., 60"
                        value={previousCredits}
                        onChange={(e) => setPreviousCredits(e.target.value)}
                      />
                      <p className="text-gray-600">All credits you've completed so far</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="previous-gpa">Current Cumulative GPA</Label>
                      <Input
                        id="previous-gpa"
                        type="number"
                        min="0"
                        max="4"
                        step="0.01"
                        placeholder="e.g., 3.5"
                        value={previousGPA}
                        onChange={(e) => setPreviousGPA(e.target.value)}
                      />
                      <p className="text-gray-600">Your current overall GPA</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Add Course Form (same as semester) */}
              <Card className="bg-slate-50">
                <CardHeader>
                  <CardTitle>Add New Courses</CardTitle>
                  <CardDescription>
                    Add the courses you're currently taking or planning to take
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="course-name-cum">Course Name</Label>
                      <Input
                        id="course-name-cum"
                        placeholder="e.g., CS 101"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            addCourse();
                          }
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course-credits-cum">Credit Hours</Label>
                      <Input
                        id="course-credits-cum"
                        type="number"
                        min="0"
                        step="0.5"
                        placeholder="e.g., 3"
                        value={courseCredits}
                        onChange={(e) => setCourseCredits(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            addCourse();
                          }
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course-grade-cum">Grade</Label>
                      <Select value={courseGrade} onValueChange={setCourseGrade}>
                        <SelectTrigger id="course-grade-cum">
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {grades.map((grade) => (
                            <SelectItem key={grade} value={grade}>
                              {grade} ({gradePoints[grade].toFixed(1)})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={addCourse} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Course
                    </Button>
                    {courses.length > 0 && (
                      <Button onClick={clearAll} variant="outline" className="flex items-center gap-2">
                        <RotateCcw className="h-4 w-4" />
                        Clear All
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Courses Table */}
              {courses.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Current Semester Courses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course</TableHead>
                          <TableHead>Credits</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead>Grade Points</TableHead>
                          <TableHead>Quality Points</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {courses.map((course) => (
                          <TableRow key={course.id}>
                            <TableCell>{course.name}</TableCell>
                            <TableCell>{course.credits}</TableCell>
                            <TableCell>{course.grade}</TableCell>
                            <TableCell>{gradePoints[course.grade].toFixed(2)}</TableCell>
                            <TableCell>
                              {(gradePoints[course.grade] * course.credits).toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCourse(course.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}

              {/* Cumulative GPA Result */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-300">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="text-center space-y-2 pb-4">
                      <p className="text-gray-600">Your New Cumulative GPA Will Be</p>
                      <p className="text-green-700">{cumulativeGPA.toFixed(3)}</p>
                      {parseFloat(previousGPA || "0") > 0 && (
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-gray-600">
                            {cumulativeGPA > parseFloat(previousGPA) ? "↑" : cumulativeGPA < parseFloat(previousGPA) ? "↓" : "→"}
                          </span>
                          <span className={cumulativeGPA > parseFloat(previousGPA) ? "text-green-600" : cumulativeGPA < parseFloat(previousGPA) ? "text-red-600" : "text-gray-600"}>
                            {cumulativeGPA > parseFloat(previousGPA) ? "+" : ""}{(cumulativeGPA - parseFloat(previousGPA)).toFixed(3)} from current GPA
                          </span>
                        </div>
                      )}
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        <p className="text-gray-600">Current Credits</p>
                        <p className="text-gray-900">{parseFloat(previousCredits || "0").toFixed(1)}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        <p className="text-gray-600">Current GPA</p>
                        <p className="text-gray-900">{parseFloat(previousGPA || "0").toFixed(2)}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        <p className="text-gray-600">New Credits</p>
                        <p className="text-gray-900">{totalCredits.toFixed(1)}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        <p className="text-gray-600">New Semester GPA</p>
                        <p className="text-gray-900">{totalCredits > 0 ? semesterGPA.toFixed(2) : "0.00"}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="text-center bg-white rounded-lg p-4 border-2 border-green-300">
                      <p className="text-gray-600">Total Credits After This Semester</p>
                      <p className="text-gray-900">
                        {(parseFloat(previousCredits || "0") + totalCredits).toFixed(1)} credits
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* GPA Scale Reference */}
      <Card>
        <CardHeader>
          <CardTitle>GPA Scale Reference</CardTitle>
          <CardDescription>Standard 4.0 grade point scale</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {grades.map((grade) => (
              <div key={grade} className="text-center p-3 bg-slate-50 rounded-lg">
                <p>{grade}</p>
                <p className="text-gray-600">{gradePoints[grade].toFixed(1)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
