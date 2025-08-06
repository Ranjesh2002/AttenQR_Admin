# QR-Based Attendance System – Django Backend

This is the official backend for the **QR-Based Attendance System** – a smart solution to replace traditional attendance methods in Nepali colleges. The system uses dynamically generated QR codes scanned by students via a mobile app to record attendance in real time.

## 🌐 Live Deployment

The backend is successfully deployed on an **Azure Virtual Machine** using:
- **Nginx** as the reverse proxy
- **Gunicorn** as the WSGI HTTP server
- **SQLite/PostgreSQL** as the database (based on your setup)

## 🚀 Features

- 🔐 **Authentication System**  
  User roles: Student, Teacher, Admin with role-based access control.

- 📱 **QR Code Attendance**  
  Teachers can generate unique QR codes for classes. Students scan them to mark attendance.

- 📊 **Admin Dashboard API**  
  Provides endpoints to manage students, teachers, and attendance records.

- 🔔 **Low Attendance Alerts**  
  Students receive notifications when their attendance drops below the threshold.

- 📂 **RESTful API Endpoints**  
  Built using Django REST Framework for smooth frontend integration.

## 📁 Project Structure


## ⚙️ Setup Instructions (Local)

### Prerequisites

- Python 3.9+
- pip
- virtualenv
- SQLite or PostgreSQL
- (Optional) Docker

### 1. Clone the Repository

```bash
git clone https://github.com/Ranjesh2002/AttenQR_Admin.git
cd qr-attendance-backend
