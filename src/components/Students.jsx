import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Eye, Search, Users, GraduationCap, AlertTriangle } from "lucide-react";

const studentsData = [
  {
    id: "23186532",
    name: "Ranjesh Thakur",
    email: "ranjesh@mail.com",
    semester: "5",
    attendanceRate: 92,
    totalClasses: 48,
    presentClasses: 44,
  },
  {
    id: "23186533",
    name: "Ratik Bajracharya",
    email: "ratik@mail.com",
    semester: "5",
    attendanceRate: 88,
    totalClasses: 48,
    presentClasses: 42,
  },
  {
    id: "23186534",
    name: "Sumit Ray",
    email: "sumit@mail.com",
    semester: "5",
    attendanceRate: 65,
    totalClasses: 48,
    presentClasses: 31,
  },
  {
    id: "23186535",
    name: "Aadarsha Sunam",
    email: "aadarsha@mail.com",
    semester: "5",
    attendanceRate: 94,
    totalClasses: 48,
    presentClasses: 45,
  },
];

export default function Students() {
  const navigate = useNavigate();
  const [selectedSemester, setSelectedSemester] = useState("5");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = studentsData.filter(
    (student) =>
      student.semester === selectedSemester &&
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getAttendanceBadge = (rate) => {
    if (rate >= 90)
      return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    if (rate >= 75)
      return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
    if (rate >= 60)
      return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>;
    return <Badge className="bg-red-100 text-red-800">Poor</Badge>;
  };

  const lowAttendanceCount = filteredStudents.filter(
    (s) => s.attendanceRate < 75
  ).length;
  const avgAttendance = Math.round(
    filteredStudents.reduce((acc, curr) => acc + curr.attendanceRate, 0) /
      filteredStudents.length
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 bg-blue-50 p-2 rounded-lg" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">
                  Total Students
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredStudents.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-green-600 bg-green-50 p-2 rounded-lg" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">
                  Avg Attendance
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {avgAttendance}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-orange-600 bg-orange-50 p-2 rounded-lg" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">
                  Low Attendance
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {lowAttendanceCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Students
          </CardTitle>
          <CardDescription className="text-gray-500">
            Manage student records and attendance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-lg"
                />
              </div>
            </div>
            <Select
              value={selectedSemester}
              onValueChange={setSelectedSemester}
            >
              <SelectTrigger className="w-full md:w-48 rounded-lg">
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="font-semibold text-gray-700">
                  Student ID
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Name
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Attendance
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Classes
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow
                  key={student.id}
                  className="border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/admin/students/${student.id}`)}
                >
                  <TableCell className="font-medium text-blue-600">
                    {student.id}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {student.name}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {student.email}
                  </TableCell>
                  <TableCell className="font-medium">
                    {student.attendanceRate}%
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {student.presentClasses}/{student.totalClasses}
                  </TableCell>
                  <TableCell>
                    {getAttendanceBadge(student.attendanceRate)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/admin/students/${student.id}`);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
