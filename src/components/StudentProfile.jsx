import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

import adminApi from "@/utils/api";
import { useParams } from "react-router-dom";

export default function StudentProfile() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      setIsLoading(true);
      try {
        const res = await adminApi.get(`/student_detail/${studentId}/`);
        setStudent(res.data);
        const attendanceRes = await adminApi.get(
          `/student_atten_admin/${studentId}/`
        );
        setAttendanceHistory(attendanceRes.data.attendance_history || []);
      } catch (err) {
        console.error("Error fetching student:", err);
        setAttendanceHistory([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (studentId) {
      fetchStudentData();
    }
  }, [studentId]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "absent":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "late":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "present":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Present
          </Badge>
        );
      case "absent":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Absent
          </Badge>
        );
      case "late":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Late
          </Badge>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">
            Loading student details...
          </p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Student not found</p>
        <Button className="mt-4">Back to Students</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/students")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Students
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Student Profile</h1>
            <p className="text-muted-foreground">
              View and manage student information
            </p>
          </div>
        </div>
        <Button>Edit Profile</Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-muted-foreground mb-4">
                Student ID: {student.id}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{student.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{student.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{student.department}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{student.semester}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600 bg-blue-50 p-2 rounded-lg" />
              <div className="ml-3">
                <p className="text-sm font-medium text-muted-foreground">
                  Attendance Rate
                </p>
                <p className="text-2xl font-bold">{student.attendanceRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600 bg-green-50 p-2 rounded-lg" />
              <div className="ml-3">
                <p className="text-sm font-medium text-muted-foreground">
                  Present
                </p>
                <p className="text-2xl font-bold">{student.presentClasses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-600 bg-red-50 p-2 rounded-lg" />
              <div className="ml-3">
                <p className="text-sm font-medium text-muted-foreground">
                  Absent
                </p>
                <p className="text-2xl font-bold">{student.absent}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600 bg-yellow-50 p-2 rounded-lg" />
              <div className="ml-3">
                <p className="text-sm font-medium text-muted-foreground">
                  Late
                </p>
                <p className="text-2xl font-bold">{student.lateAttendances}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="attendance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="attendance">Attendance History</TabsTrigger>
          <TabsTrigger value="details">Student Details</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
              <CardDescription>
                View detailed attendance history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Check-in Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.isArray(attendanceHistory) &&
                  attendanceHistory.length > 0 ? (
                    attendanceHistory.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">
                          {new Date(record.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{record.subject}</TableCell>
                        <TableCell>{record.teacher}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(record.status)}
                            {getStatusBadge(record.status)}
                          </div>
                        </TableCell>
                        <TableCell>{record.time || "-"}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No attendance records found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
              <CardDescription>
                Complete student profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Personal Information</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Full Name:
                      </span>
                      <p className="font-medium">{student.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Email:
                      </span>
                      <p className="font-medium">{student.email}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Phone:
                      </span>
                      <p className="font-medium">{student.phone}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Academic Information</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Student ID:
                      </span>
                      <p className="font-medium">{student.id}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Department:
                      </span>
                      <p className="font-medium">{student.department}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Year:
                      </span>
                      <p className="font-medium">{student.year}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Semester:
                      </span>
                      <p className="font-medium">{student.semester}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Enrollment Date:
                      </span>
                      <p className="font-medium">
                        {new Date(student.enrollmentDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
