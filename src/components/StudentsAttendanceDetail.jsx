import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { X, Search, Clock, Users, UserCheck } from "lucide-react";
import adminApi from "@/utils/api";

export default function AttendanceHistory({
  isOpen,
  onClose,
  sessionId,
  sessionInfo,
}) {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && sessionId) {
      setLoading(true);
      const fetchAttendanceData = async () => {
        try {
          const response = await adminApi.get(
            `/attendance_by_class_session/${sessionId}/`
          );
          setStudents(response.data.students);
          setFilteredStudents(response.data.students);
        } catch (error) {
          console.error("Error fetching attendance data:", error);
          console.log("Fetching attendance for session:", sessionId);
        } finally {
          setLoading(false);
        }
      };

      fetchAttendanceData();
    }
  }, [isOpen, sessionId]);

  useEffect(() => {
    let filtered = students;

    if (statusFilter !== "all") {
      filtered = filtered.filter((student) => student.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  }, [students, statusFilter, searchTerm]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "present":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Present
          </Badge>
        );
      case "absent":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            Absent
          </Badge>
        );
      case "late":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Late
          </Badge>
        );
      default:
        return null;
    }
  };

  const presentCount = students.filter((s) => s.status === "present").length;
  const absentCount = students.filter((s) => s.status === "absent").length;
  const lateCount = students.filter((s) => s.status === "late").length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <DialogTitle className="text-xl font-semibold">
              Student Attendance Details
            </DialogTitle>
            {sessionInfo && (
              <p className="text-sm text-muted-foreground mt-1">
                {sessionInfo.subject} • {sessionInfo.teacher} •{" "}
                {sessionInfo.time}
              </p>
            )}
          </div>
          <Button variant="ghost" onClick={onClose}></Button>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-lg font-semibold">{students.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-xs text-muted-foreground">Present</p>
                <p className="text-lg font-semibold text-green-600">
                  {presentCount}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <X className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-xs text-muted-foreground">Absent</p>
                <p className="text-lg font-semibold text-red-600">
                  {absentCount}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-xs text-muted-foreground">Late</p>
                <p className="text-lg font-semibold text-yellow-600">
                  {lateCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or student ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Students</SelectItem>
              <SelectItem value="present">Present</SelectItem>
              <SelectItem value="absent">Absent</SelectItem>
              <SelectItem value="late">Late</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="text-muted-foreground">
                Loading student data...
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Check-in Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {student.studentId}
                    </TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {student.checkinTime || "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {filteredStudents.length === 0 && !loading && (
          <div className="text-center py-8 text-muted-foreground">
            No students found matching your criteria.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
