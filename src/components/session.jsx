import { useState, useEffect } from "react";
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
import { CalendarDays, Clock, Users, BookOpen, Trash2 } from "lucide-react";
import { toast } from "sonner";
import adminApi from "@/utils/api";

export default function ClassSession() {
  const [teachers, setTeachers] = useState([]);
  const [session, setSession] = useState([]);
  const [formData, setFormData] = useState({
    teacher: "",
    subject: "",
    date: "",
    startTime: "",
    endTime: "",
    totalStudents: "",
  });

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await adminApi.get("/teachers/");
        setTeachers(res.data);
      } catch (error) {
        toast("Failed to fetch class sessions");
        console.error(error);
      }
    };

    fetchSessions();
    fetchTeacher();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await adminApi.get("/class-sessions/");
      setSession(res.data);
    } catch (error) {
      toast("Failed to fetch class sessions");
      console.error(error);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const createSession = async () => {
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

    try {
      await adminApi.post("/create-class-session/", {
        teacher_id: formData.teacher,
        subject: formData.subject,
        date: formData.date,
        start_time: formData.startTime,
        end_time: formData.endTime,
        total_students: formData.totalStudents,
      });

      toast(`${formData.subject} session has been scheduled successfully`);
      setFormData({
        teacher: "",
        subject: "",
        date: "",
        startTime: "",
        endTime: "",
        totalStudents: "",
      });

      fetchSessionsForTeacher(formData.teacher);
      fetchSessions();
    } catch (error) {
      toast("Failed to create class session");
      console.error(error);
    }
  };

  const fetchSessionsForTeacher = async (teacherId) => {
    if (!teacherId) return;
    try {
      const res = await adminApi.get(
        `/class-sessions/?teacher_id=${teacherId}`
      );
      setSession(res.data);
    } catch (error) {
      toast("Failed to fetch class sessions");
      console.error(error);
    }
  };

  const getStatusColor = (status) => {
    if (status === "Upcoming") {
      return "text-blue-600 bg-blue-50";
    } else if (status === "Ongoing") {
      return "text-green-600 bg-green-50";
    } else if (status === "Completed") {
      return "text-gray-600 bg-gray-50";
    } else {
      return "text-gray-600 bg-gray-50";
    }
  };

  function getSessionStatus(date, startTime, endTime) {
    const now = new Date();
    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);

    if (now < start) return "Upcoming";
    if (now >= start && now <= end) return "Ongoing";
    return "Completed";
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this session?"))
      return;
    try {
      await adminApi.delete(`/delete-class-session/${id}/`);
      fetchSessions();
    } catch (err) {
      console.error("Failed to delete session", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <CalendarDays className="w-12 h-12  text-blue-600" />
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
              <select
                id="teacher"
                className="w-full border rounded px-3 py-2"
                value={formData.teacher}
                onChange={(e) => {
                  handleChange("teacher", e.target.value);
                  fetchSessionsForTeacher(e.target.value);
                }}
              >
                <option value="">Select a teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
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
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {session.map((sessionItem) => {
                const sessionStatus = getSessionStatus(
                  sessionItem.date,
                  sessionItem.start_time,
                  sessionItem.end_time
                );
                return (
                  <TableRow key={sessionItem.id}>
                    <TableCell className="font-medium">
                      {sessionItem.teacher}
                    </TableCell>
                    <TableCell>{sessionItem.subject}</TableCell>
                    <TableCell>
                      {new Date(sessionItem.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {sessionItem.start_time} - {sessionItem.end_time}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        {sessionItem.total_students}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          sessionStatus
                        )}`}
                      >
                        {sessionStatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Trash2
                        onClick={() => handleDelete(sessionItem.id)}
                        className="text-red-500 hover:underline w-7"
                      ></Trash2>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
