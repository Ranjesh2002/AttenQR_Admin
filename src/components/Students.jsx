import { useEffect, useState } from "react";
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
import adminApi from "@/utils/api";
import StudentData from "./StudentData";

export default function Students() {
  const [selectedSession, setSelectedSession] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState("3rd");
  const [searchTerm, setSearchTerm] = useState("");
  const [stu, setStu] = useState([]);
  const [low, setLow] = useState([]);
  const [atten, setAtten] = useState([]);
  const [stulist, setStulist] = useState([]);

  useEffect(() => {
    const fetchstu = async () => {
      try {
        const res = await adminApi.get("/total_stu/");
        setStu(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchlow = async () => {
      try {
        const res = await adminApi.get("/alerts/low-attendance/");
        setLow(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchatten = async () => {
      try {
        const res = await adminApi.get("/average_percentage/");
        setAtten(res.data.average_attendance_percentage);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchattenlist = async () => {
      try {
        const res = await adminApi.get("/attendance_list/");
        setStulist(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchstu();
    fetchlow();
    fetchatten();
    fetchattenlist();
  }, []);

  const filteredStudents = stulist.filter(
    (student) =>
      selectedSemester === "all" ||
      (student.semester === selectedSemester &&
        (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase())))
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
                <p className="text-2xl font-bold text-gray-900">{stu.length}</p>
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
                <p className="text-2xl font-bold text-gray-900">{atten}%</p>
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
                <p className="text-2xl font-bold text-gray-900">{low.length}</p>
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
                <SelectItem value="all">Semester</SelectItem>
                <SelectItem value="1st">1st</SelectItem>
                <SelectItem value="2nd">2nd</SelectItem>
                <SelectItem value="3rd">3rd</SelectItem>
                <SelectItem value="4th">4th</SelectItem>
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
                    {student.attendance}%
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
                      onClick={() => {
                        setSelectedSession(student.id);
                        setShowDetails(true);
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
      {selectedSession && (
        <StudentData
          isOpen={showDetails}
          onClose={() => {
            setShowDetails(false);
            setSelectedSession(null);
          }}
          sessionId={selectedSession}
          sessionInfo={stulist.find((s) => s.id === selectedSession)}
        />
      )}
    </div>
  );
}
