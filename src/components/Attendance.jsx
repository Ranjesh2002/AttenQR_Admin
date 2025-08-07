import { useState, useEffect } from "react";
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
import { Eye, Users, Clock } from "lucide-react";
import AttendanceHistory from "./StudentsAttendanceDetail";
import adminApi from "@/utils/api";

const todaysAttendance = [
  {
    id: 1,
    subject: "Mathematics",
    teacher: "Dr. Smith",
    date: "2024-01-15",
    time: "09:00 AM",
    presentCount: 28,
    absentCount: 5,
    totalStudents: 33,
  },
  {
    id: 2,
    subject: "Physics",
    teacher: "Prof. Johnson",
    date: "2024-01-15",
    time: "10:30 AM",
    presentCount: 31,
    absentCount: 2,
    totalStudents: 33,
  },
  {
    id: 3,
    subject: "Chemistry",
    teacher: "Dr. Williams",
    date: "2024-01-15",
    time: "02:00 PM",
    presentCount: 24,
    absentCount: 9,
    totalStudents: 33,
  },
  {
    id: 4,
    subject: "Biology",
    teacher: "Prof. Davis",
    date: "2024-01-15",
    time: "03:30 PM",
    presentCount: 30,
    absentCount: 3,
    totalStudents: 33,
  },
];

export default function Attendance() {
  const [selectedSession, setSelectedSession] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [atten, setAtten] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await adminApi.get("/today_attendance_history");
        setAtten(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  });

  const getAttendanceRate = (present, total) => {
    return Math.round((present / total) * 100);
  };

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Today's Class Sessions
          </h1>
          <p className="text-muted-foreground">
            View and filter todays class session
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 bg-blue-50 p-2 rounded-lg" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">
                  Total Sessions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {atten.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-600 bg-green-50 p-2 rounded-lg" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">
                  Avg Attendance
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(
                    todaysAttendance.reduce(
                      (acc, curr) =>
                        acc + (curr.presentCount / curr.totalStudents) * 100,
                      0
                    ) / todaysAttendance.length
                  )}
                  %
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-orange-600 bg-orange-50 p-2 rounded-lg" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">
                  Low Attendance
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    todaysAttendance.filter(
                      (session) =>
                        (session.presentCount / session.totalStudents) * 100 <
                        75
                    ).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Today's Attendance
          </CardTitle>
          <CardDescription className="text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="font-semibold text-gray-700">
                  Subject
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Teacher
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Time
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Rate
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
              {atten && atten.length > 0 ? (
                atten.map((session) => {
                  const rate = getAttendanceRate(
                    session.presentCount,
                    session.totalStudents
                  );
                  return (
                    <TableRow
                      key={session.id}
                      className="border-gray-100 hover:bg-gray-50"
                    >
                      <TableCell className="font-medium text-gray-900">
                        {session.subject}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {session.teacher}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {session.time}
                      </TableCell>
                      <TableCell className="font-medium">
                        {session.percentage}%
                      </TableCell>
                      <TableCell>{getAttendanceBadge(rate)}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg"
                          onClick={() => {
                            setSelectedSession(session.id);
                            setShowDetails(true);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No class session found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {selectedSession && (
        <AttendanceHistory
          isOpen={showDetails}
          onClose={() => {
            setShowDetails(false);
            setSelectedSession(null);
          }}
          sessionId={selectedSession}
          sessionInfo={todaysAttendance.find((s) => s.id === selectedSession)}
        />
      )}
    </div>
  );
}
