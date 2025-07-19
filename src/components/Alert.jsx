import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Mail, Users } from "lucide-react";
import { toast } from "sonner";

const lowAttendanceStudents = [
  {
    id: "23186536",
    name: "Anjal Ghalan",
    email: "anjal@mail.com ",
    attendance: 58,
    semester: "5",
  },
  {
    id: "23186537",
    name: "Samundra Acharya",
    email: "samundra@mail.com",
    attendance: 72,
    semester: "6",
  },
  {
    id: "23186538",
    name: "Niraj Chaudhary",
    email: "niraj@mail.com",
    attendance: 56,
    semester: "5",
  },
];

export default function Alerts() {
  const [sendingWarning, setSendingWarning] = useState(null);

  const handleSendWarning = async (studentId, studentName) => {
    setSendingWarning(studentId);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast("Warning Sent", {
      description: `Low attendance warning sent to ${studentName}`,
    });
    setSendingWarning(null);
  };

  const handleSendAllWarnings = async () => {
    setSendingWarning("all");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast("Warnings Sent", {
      description: `Low attendance warnings sent to ${lowAttendanceStudents.length} students`,
    });
    setSendingWarning(null);
  };

  const getAttendanceColor = (percentage) => {
    if (percentage < 60) return "text-red-600";
    if (percentage < 70) return "text-orange-600";
    return "text-yellow-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alerts</h1>
          <p className="text-gray-600 mt-1">
            Students with low attendance requiring attention
          </p>
        </div>
        <Button
          onClick={handleSendAllWarnings}
          disabled={sendingWarning === "all"}
          className="bg-orange-600 hover:bg-orange-700"
        >
          <Mail className="h-4 w-4 mr-2" />
          {sendingWarning === "all" ? "Sending..." : "Send All Warnings"}
        </Button>
      </div>

      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <strong>{lowAttendanceStudents.length} students</strong> have
          attendance below 75% and require immediate attention.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Critical (&lt;60%)
            </CardTitle>
            <Users className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {lowAttendanceStudents.filter((s) => s.attendance < 60).length}
            </div>
            <p className="text-xs text-gray-600">
              Immediate intervention needed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Warning (60-70%)
            </CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {
                lowAttendanceStudents.filter(
                  (s) => s.attendance >= 60 && s.attendance < 70
                ).length
              }
            </div>
            <p className="text-xs text-gray-600">Close monitoring required</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              At Risk (70-75%)
            </CardTitle>
            <Users className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {
                lowAttendanceStudents.filter(
                  (s) => s.attendance >= 70 && s.attendance < 75
                ).length
              }
            </div>
            <p className="text-xs text-gray-600">Early warning stage</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Students Requiring Attention</CardTitle>
          <CardDescription>
            Students with attendance below 75% threshold
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Attendance %</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lowAttendanceStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell className="text-gray-600">
                    {student.email}
                  </TableCell>
                  <TableCell>{student.semester}</TableCell>
                  <TableCell>
                    <span
                      className={`font-semibold ${getAttendanceColor(
                        student.attendance
                      )}`}
                    >
                      {student.attendance}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleSendWarning(student.id, student.name)
                      }
                      disabled={sendingWarning === student.id}
                      className="border-orange-200 text-orange-700 hover:bg-orange-50"
                    >
                      <Mail className="h-3 w-3 mr-1" />
                      {sendingWarning === student.id
                        ? "Sending..."
                        : "Send Warning"}
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
