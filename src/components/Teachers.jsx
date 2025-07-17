
import { useState } from "react";
import { Search, Plus, Edit, Trash2, Mail, Phone, BookOpen, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


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
    totalStudents: 150
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
    totalStudents: 120
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
    totalStudents: 180
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
    totalStudents: 0
  }
];


export default function Teachers() {
  return <h1>this is teacher</h1>;
}
