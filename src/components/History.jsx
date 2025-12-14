import { useState, useEffect } from "react";
import { Calendar, Download, Filter, Search, Eye, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import AttendanceHistory from "./StudentsAttendanceDetail";
import adminApi from "@/utils/api";
import DownloadMonthlyAttendanceExcel from "./dailyAttendance";

export default function Attendance_History() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [history, setHistory] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await adminApi.get("/admin_attendance_history/");
        setHistory(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  const filteredHistory = history.filter((record) => {
    const matchesSearch =
      record.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      selectedSubject === "all" || record.subject === selectedSubject;

    let matchesDate = true;
    if (selectedDateRange !== "all" && selectedDateRange !== "") {
      const recordDate = new Date(record.date);
      const today = new Date();

      if (selectedDateRange === "today") {
        matchesDate = recordDate.toDateString() === today.toDateString();
      } else if (selectedDateRange === "week") {
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        matchesDate = recordDate >= startOfWeek && recordDate <= today;
      } else if (selectedDateRange === "month") {
        matchesDate =
          recordDate.getMonth() === today.getMonth() &&
          recordDate.getFullYear() === today.getFullYear();
      }
    }

    return matchesSearch && matchesSubject && matchesDate;
  });

  const getAttendanceBadge = (rate) => {
    if (rate >= 90)
      return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    if (rate >= 75)
      return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
    if (rate >= 60)
      return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>;
    return <Badge className="bg-red-100 text-red-800">Poor</Badge>;
  };

  const getRateBadge = (rate) => {
    let color = "text-blue-800 bg-blue-100";
    if (rate >= 75) color = "text-green-800 bg-green-100";
    else if (rate >= 50) color = "text-yellow-800 bg-yellow-100";
    else color = "text-red-800 bg-red-100";

    return (
      <span className={`text-sm px-2 py-1 rounded-full font-medium ${color}`}>
        {rate}%
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-12 h-12 text-blue-700 shrink-0" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Attendance History
            </h1>
            <p className="text-muted-foreground">
              View and filter historical attendance records
            </p>
          </div>
        </div>
        <DownloadMonthlyAttendanceExcel month={8} year={2025} />
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search subjects or teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {[...new Set(history.map((h) => h.subject))].map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedDateRange}
              onValueChange={setSelectedDateRange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Attendance Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.subject}</TableCell>
                  <TableCell>{record.teacher}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.time}</TableCell>
                  <TableCell>{getRateBadge(record.percentage)}</TableCell>
                  <TableCell>{getAttendanceBadge(record.percentage)}</TableCell>

                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg"
                      onClick={() => {
                        setSelectedSession(record.id);
                        setShowDetails(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredHistory.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No attendance records found matching your filters.
            </div>
          )}
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
          sessionInfo={history.find((s) => s.id === selectedSession)}
        />
      )}
    </div>
  );
}
