import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarDays, Clock, Users, BookOpen, Heading1 } from "lucide-react";
import { toast } from "sonner";

const mockSessions = [
  {
    id: "1",
    teacher: "Ranjesh",
    subject: "IT",
    date: "2024-01-15",
    startTime: "09:00",
    endTime: "10:30",
    totalStudents: 25,
    status: "Upcoming",
  },
  {
    id: "2",
    teacher: "Ranjesh",
    subject: "IT",
    date: "2024-01-15",
    startTime: "11:00",
    endTime: "12:30",
    totalStudents: 22,
    status: "Upcoming",
  },
  {
    id: "3",
    teacher: "Ranjesh",
    subject: "IT",
    date: "2024-01-16",
    startTime: "14:00",
    endTime: "15:30",
    totalStudents: 28,
    status: "Upcoming",
  },
];

export default function ClassSession() {
  const [session, setSession] = useState(mockSessions);
  const [formData, setFormData] = useState({
    teacher: "",
    subject: "",
    date: "",
    startTime: "",
    endTime: "",
    totalStudents: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const createSession = () => {
    if (
      !formData.teacher ||
      !formData.subject ||
      !formData.date ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.totalStudents
    ) {
      toast("Error: Please fill in all fields");

      return;
    }
    const newSession = {
      id: (session.length + 1).toString(),
      teacher: formData.teacher,
      subject: formData.subject,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      totalStudents: parseInt(formData.totalStudents),
      status: "Upcoming",
    };

    setSession((prev) => [...prev, newSession]);
    setFormData({
      teacher: "",
      subject: "",
      date: "",
      startTime: "",
      endTime: "",
      totalStudents: "",
    });

    toast(`${formData.subject} session has been scheduled successfully`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Upcoming":
        return "text-blue-600 bg-blue-50";
      case "Ongoing":
        return "text-green-600 bg-green-50";
      case "Completed":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <CalendarDays className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Class Sessions</h1>
          <p className="text-gray-600">Create and Manage class sessions</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Create New Session
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="teacher">Teacher</Label>
              <Input
                id="teacher"
                placeholder="Enter teacher name"
                value={formData.teacher}
                onChange={(e) => handleChange("teacher", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Enter subject name"
                value={formData.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => handleChange("startTime", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleChange("endTime", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalStudents">Total Students</Label>
              <Input
                id="totalStudents"
                type="number"
                placeholder="Enter number of students"
                value={formData.totalStudents}
                onChange={(e) => handleChange("totalStudents", e.target.value)}
              />
            </div>
          </div>
          <div className="mt-6">
            <Button onClick={createSession} className="w-full md:w-auto">
              <CalendarDays className="h-4 w-4 mr-2" />
              Create Session
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Upcoming classes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {session.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">
                    {session.teacher}
                  </TableCell>
                  <TableCell>{session.subject}</TableCell>
                  <TableCell>
                    {new Date(session.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {session.startTime} - {session.endTime}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      {session.totalStudents}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        session.status
                      )}`}
                    >
                      {session.status}
                    </span>
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
