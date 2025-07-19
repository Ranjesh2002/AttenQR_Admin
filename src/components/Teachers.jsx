import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  BookOpen,
  Calendar,
} from "lucide-react";

const mockTeachers = [
  {
    id: "T001",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@school.edu",
    phone: "+1 (555) 123-4567",
    subjects: ["Mathematics", "Statistics"],
    department: "Mathematics",
    joinDate: "2020-08-15",
    status: "active",
    classesAssigned: 5,
    totalStudents: 150,
  },
  {
    id: "T002",
    name: "Prof. Michael Chen",
    email: "michael.chen@school.edu",
    phone: "+1 (555) 987-6543",
    subjects: ["Physics", "Chemistry"],
    department: "Science",
    joinDate: "2019-09-01",
    status: "active",
    classesAssigned: 4,
    totalStudents: 120,
  },
  {
    id: "T003",
    name: "Ms. Emily Davis",
    email: "emily.davis@school.edu",
    phone: "+1 (555) 456-7890",
    subjects: ["English Literature", "Creative Writing"],
    department: "English",
    joinDate: "2021-01-10",
    status: "active",
    classesAssigned: 6,
    totalStudents: 180,
  },
  {
    id: "T004",
    name: "Mr. Robert Wilson",
    email: "robert.wilson@school.edu",
    phone: "+1 (555) 321-0987",
    subjects: ["History", "Geography"],
    department: "Social Studies",
    joinDate: "2018-07-20",
    status: "inactive",
    classesAssigned: 0,
    totalStudents: 0,
  },
];

export default function Teachers() {
  const [teachers, setTeachers] = useState(mockTeachers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    subjects: "",
  });

  const filteredTeacher = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subjects.some((subject) =>
        subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesDepartment =
      selectedDepartment === "" ||
      selectedDepartment === "all" ||
      teacher.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = Array.from(new Set(teachers.map((t) => t.department)));
  const activeTeachers = teachers.filter((t) => t.status === "active").length;
  const totalClasses = teachers.reduce((sum, t) => sum + t.classesAssigned, 0);
  const totalStudents = teachers.reduce((sum, t) => sum + t.totalStudents, 0);

  const generateTeacherId = () => {
    const existingIds = teachers.map((t) => parseInt(t.id.substring(1)));
    const maxId = Math.max(...existingIds);
    return `T${String(maxId + 1).padStart(3, "0")}`;
  };

  const handleAddTeacher = () => {
    // Validate required fields
    if (!newTeacher.name || !newTeacher.email || !newTeacher.department) {
      alert("Please fill in all required fields");
      return;
    }

    // Create properly structured teacher object
    const teacherToAdd = {
      id: generateTeacherId(),
      name: newTeacher.name,
      email: newTeacher.email,
      phone: newTeacher.phone || "N/A",
      subjects: newTeacher.subjects
        ? newTeacher.subjects.split(",").map((s) => s.trim())
        : [],
      department: newTeacher.department,
      joinDate: new Date().toISOString().split("T")[0],
      status: "active",
      classesAssigned: 0,
      totalStudents: 0,
    };

    console.log("Adding new teacher:", teacherToAdd);
    setTeachers((prev) => [...prev, teacherToAdd]);
    setIsAddDialogOpen(false);
    setNewTeacher({
      name: "",
      email: "",
      phone: "",
      department: "",
      subjects: "",
    });
  };

  const handleEditTeacher = (teacherId) => {
    console.log("Editing teacher:", teacherId);
  };

  const handleDeleteTeacher = (teacherId) => {
    setTeachers((prev) => prev.filter((t) => t.id !== teacherId));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teachers</h1>
          <p className="text-gray-600">
            Manage teacher profiles and assignments
          </p>
        </div>
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Teacher
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Total Teachers
            </h3>
            <BookOpen className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{teachers.length}</div>
          <p className="text-xs text-gray-500">
            {activeTeachers} active teachers
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Classes</h3>
            <Calendar className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{totalClasses}</div>
          <p className="text-xs text-gray-500">Classes assigned</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Total Students
            </h3>
            <BookOpen className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{totalStudents}</div>
          <p className="text-xs text-gray-500">Students enrolled</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Departments</h3>
            <BookOpen className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{departments.length}</div>
          <p className="text-xs text-gray-500">Active departments</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
          >
            <option value="">All departments</option>
            <option value="all">All departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Teachers List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subjects
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Classes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTeacher.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">
                        {teacher.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {teacher.id}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <Mail className="mr-1 h-3 w-3" />
                        {teacher.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-900">
                        <Phone className="mr-1 h-3 w-3" />
                        {teacher.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {teacher.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects.slice(0, 2).map((subject) => (
                        <span
                          key={subject}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {subject}
                        </span>
                      ))}
                      {teacher.subjects.length > 2 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                          +{teacher.subjects.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">
                        {teacher.classesAssigned}
                      </div>
                      <div className="text-sm text-gray-500">
                        {teacher.totalStudents} students
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        teacher.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {teacher.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditTeacher(teacher.id)}
                        className="p-2 text-gray-600 hover:text-blue-600 border rounded-md hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTeacher(teacher.id)}
                        className="p-2 text-gray-600 hover:text-red-600 border rounded-md hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Teacher Dialog */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Add New Teacher</h2>
              <p className="text-gray-600 text-sm">
                Add a new teacher to the system. Fill in all required
                information.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={newTeacher.name}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, name: e.target.value })
                  }
                  placeholder="Enter teacher name"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={newTeacher.email}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, email: e.target.value })
                  }
                  placeholder="teacher@school.edu"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={newTeacher.phone}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, phone: e.target.value })
                  }
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department *
                </label>
                <select
                  value={newTeacher.department}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, department: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                  <option value="Computer Science">Computer Science</option>
                  <option value="Art">Art</option>
                  <option value="Music">Music</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subjects (comma-separated)
                </label>
                <textarea
                  value={newTeacher.subjects}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, subjects: e.target.value })
                  }
                  placeholder="Mathematics, Statistics"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsAddDialogOpen(false)}
                className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTeacher}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Teacher
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
