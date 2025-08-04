// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { X, Search, Clock, Users, UserCheck } from "lucide-react";

// const generateStudentData = (sessionId) => {
//   const baseStudents = [
//     { id: "1", name: "Alice Johnson", studentId: "STU001" },
//     { id: "2", name: "Bob Smith", studentId: "STU002" },
//     { id: "3", name: "Charlie Brown", studentId: "STU003" },
//     { id: "4", name: "Diana Prince", studentId: "STU004" },
//     { id: "5", name: "Edward Norton", studentId: "STU005" },
//     { id: "6", name: "Fiona Green", studentId: "STU006" },
//     { id: "7", name: "George Lucas", studentId: "STU007" },
//     { id: "8", name: "Hannah Davis", studentId: "STU008" },
//     { id: "9", name: "Ian Malcolm", studentId: "STU009" },
//     { id: "10", name: "Jane Foster", studentId: "STU010" },
//     { id: "11", name: "Kevin Hart", studentId: "STU011" },
//     { id: "12", name: "Lisa Simpson", studentId: "STU012" },
//     { id: "13", name: "Mike Wilson", studentId: "STU013" },
//     { id: "14", name: "Nina Patel", studentId: "STU014" },
//     { id: "15", name: "Oscar Wild", studentId: "STU015" },
//     { id: "16", name: "Paula Abdul", studentId: "STU016" },
//     { id: "17", name: "Quinn Adams", studentId: "STU017" },
//     { id: "18", name: "Rachel Green", studentId: "STU018" },
//     { id: "19", name: "Steve Rogers", studentId: "STU019" },
//     { id: "20", name: "Tina Turner", studentId: "STU020" },
//     { id: "21", name: "Uma Thurman", studentId: "STU021" },
//     { id: "22", name: "Victor Hugo", studentId: "STU022" },
//     { id: "23", name: "Wendy Williams", studentId: "STU023" },
//     { id: "24", name: "Xander Harris", studentId: "STU024" },
//     { id: "25", name: "Yara Shahidi", studentId: "STU025" },
//     { id: "26", name: "Zoe Saldana", studentId: "STU026" },
//     { id: "27", name: "Aaron Paul", studentId: "STU027" },
//     { id: "28", name: "Betty White", studentId: "STU028" },
//     { id: "29", name: "Carl Johnson", studentId: "STU029" },
//     { id: "30", name: "Donna Noble", studentId: "STU030" },
//     { id: "31", name: "Ethan Hunt", studentId: "STU031" },
//     { id: "32", name: "Felicity Jones", studentId: "STU032" },
//     { id: "33", name: "Gary Oldman", studentId: "STU033" },
//   ];

//   const random = new Array(33)
//     .fill(0)
//     .map((_, i) => (sessionId * 17 + i * 13) % 100);

//   return baseStudents.map((student, index) => {
//     const randValue = random[index];
//     let status;
//     let checkinTime;

//     if (randValue < 10) {
//       status = "absent";
//     } else if (randValue < 20) {
//       status = "late";
//       checkinTime = `${9 + Math.floor(randValue / 10)}:${
//         15 + (randValue % 4) * 15
//       } AM`;
//     } else {
//       status = "present";
//       checkinTime = `${8 + Math.floor(randValue / 20)}:${
//         (randValue % 4) * 15 || 45
//       } AM`;
//     }

//     return {
//       ...student,
//       status,
//       checkinTime,
//     };
//   });
// };

// export default function StudentData({
//   isOpen,
//   onClose,
//   sessionId,
//   sessionInfo,
// }) {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (isOpen && sessionId) {
//       setLoading(true);
//       setTimeout(() => {
//         const studentData = generateStudentData(sessionId);
//         setStudents(studentData);
//         setFilteredStudents(studentData);
//         setLoading(false);
//       }, 500);
//     }
//   }, [isOpen, sessionId]);

//   useEffect(() => {
//     let filtered = students;

//     if (statusFilter !== "all") {
//       filtered = filtered.filter((student) => student.status === statusFilter);
//     }

//     if (searchTerm) {
//       filtered = filtered.filter(
//         (student) =>
//           student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     setFilteredStudents(filtered);
//   }, [students, statusFilter, searchTerm]);

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "present":
//         return (
//           <Badge className="bg-green-100 text-green-800 border-green-200">
//             Present
//           </Badge>
//         );
//       case "absent":
//         return (
//           <Badge className="bg-red-100 text-red-800 border-red-200">
//             Absent
//           </Badge>
//         );
//       case "late":
//         return (
//           <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
//             Late
//           </Badge>
//         );
//       default:
//         return null;
//     }
//   };

//   const presentCount = students.filter((s) => s.status === "present").length;
//   const absentCount = students.filter((s) => s.status === "absent").length;
//   const lateCount = students.filter((s) => s.status === "late").length;

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
//         <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
//           <div>
//             <DialogTitle className="text-xl font-semibold">
//               Student Attendance Details
//             </DialogTitle>
//             {sessionInfo && (
//               <p className="text-sm text-muted-foreground mt-1">
//                 {sessionInfo.subject} • {sessionInfo.teacher} •{" "}
//                 {sessionInfo.time}
//               </p>
//             )}
//           </div>
//           <Button variant="ghost" onClick={onClose}></Button>
//         </DialogHeader>

//         <div className="grid grid-cols-4 gap-4 mb-4">
//           <div className="bg-muted/50 rounded-lg p-3">
//             <div className="flex items-center space-x-2">
//               <Users className="h-4 w-4 text-blue-600" />
//               <div>
//                 <p className="text-xs text-muted-foreground">Total</p>
//                 <p className="text-lg font-semibold">{students.length}</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-green-50 rounded-lg p-3">
//             <div className="flex items-center space-x-2">
//               <UserCheck className="h-4 w-4 text-green-600" />
//               <div>
//                 <p className="text-xs text-muted-foreground">Present</p>
//                 <p className="text-lg font-semibold text-green-600">
//                   {presentCount}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-red-50 rounded-lg p-3">
//             <div className="flex items-center space-x-2">
//               <X className="h-4 w-4 text-red-600" />
//               <div>
//                 <p className="text-xs text-muted-foreground">Absent</p>
//                 <p className="text-lg font-semibold text-red-600">
//                   {absentCount}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-yellow-50 rounded-lg p-3">
//             <div className="flex items-center space-x-2">
//               <Clock className="h-4 w-4 text-yellow-600" />
//               <div>
//                 <p className="text-xs text-muted-foreground">Late</p>
//                 <p className="text-lg font-semibold text-yellow-600">
//                   {lateCount}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex space-x-4 mb-4">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search by name or student ID..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="w-40">
//               <SelectValue placeholder="Filter by status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Students</SelectItem>
//               <SelectItem value="present">Present</SelectItem>
//               <SelectItem value="absent">Absent</SelectItem>
//               <SelectItem value="late">Late</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="flex-1 overflow-auto">
//           {loading ? (
//             <div className="flex items-center justify-center h-40">
//               <div className="text-muted-foreground">
//                 Loading student data...
//               </div>
//             </div>
//           ) : (
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Student Name</TableHead>
//                   <TableHead>Student ID</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Check-in Time</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredStudents.map((student) => (
//                   <TableRow key={student.id}>
//                     <TableCell className="font-medium">
//                       {student.name}
//                     </TableCell>
//                     <TableCell className="text-muted-foreground">
//                       {student.studentId}
//                     </TableCell>
//                     <TableCell>{getStatusBadge(student.status)}</TableCell>
//                     <TableCell className="text-muted-foreground">
//                       {student.checkinTime || "—"}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </div>

//         {filteredStudents.length === 0 && !loading && (
//           <div className="text-center py-8 text-muted-foreground">
//             No students found matching your criteria.
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }

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

const mockStudent = {
  id: "STU001",
  name: "John Doe",
  email: "john.doe@university.edu",
  phone: "+1 (555) 123-4567",
  semester: "Fall 2024",
  enrollmentDate: "2023-08-15",
  attendanceRate: 92,
  totalClasses: 48,
  presentClasses: 44,
  absentClasses: 3,
  lateClasses: 1,
  department: "Computer Science",
  year: "2nd Year",
};

const mockAttendanceHistory = [
  {
    id: "1",
    date: "2024-01-15",
    subject: "Data Structures",
    status: "present",
    time: "09:15 AM",
    teacher: "Dr. Smith",
  },
  {
    id: "2",
    date: "2024-01-14",
    subject: "Algorithms",
    status: "late",
    time: "10:25 AM",
    teacher: "Prof. Johnson",
  },
  {
    id: "3",
    date: "2024-01-13",
    subject: "Database Systems",
    status: "absent",
    teacher: "Dr. Wilson",
  },
  {
    id: "4",
    date: "2024-01-12",
    subject: "Web Development",
    status: "present",
    time: "02:10 PM",
    teacher: "Mr. Brown",
  },
  {
    id: "5",
    date: "2024-01-11",
    subject: "Operating Systems",
    status: "present",
    time: "11:05 AM",
    teacher: "Dr. Davis",
  },
];

export default function StudentData() {
  const [student, setStudent] = useState(null);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setStudent(mockStudent);
        setAttendanceHistory(mockAttendanceHistory);
        setIsLoading(false);
      }, 500);
    };

    fetchStudentData();
  }, []);

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/students")}
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

      {/* Student Info Card */}
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
                  <span className="text-sm">{student.year}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
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
                <p className="text-2xl font-bold">{student.absentClasses}</p>
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
                <p className="text-2xl font-bold">{student.lateClasses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information */}
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
                  {attendanceHistory.map((record) => (
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
                  ))}
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
