# QR-Based Attendance System – Admin Dashboard

This is the **Admin Panel** frontend for the QR-Based Attendance System. It allows administrators to manage students, teachers, and attendance records via an intuitive dashboard interface.


## 🌐 Live Deployment

The backend is successfully deployed on an **Azure Virtual Machine** using:
- **Nginx** as the reverse proxy
- **SQLite**

## 🚀 Features

- 🔐 **Secure Login** 
– Admin authentication with role-based access.
- 📊 **Dashboard Overview** 
– Visual analytics of attendance data.
- 👥 **Student & Teacher Management** 
– CRUD operations on users.
- 📝 **Attendance Records** 
– View and export attendance.
- ⚙️ **API Integration**
– Connects seamlessly to the Django REST API.

## 🛠️ Tech Stack

- **React** (Vite)
- **Tailwind CSS**
- **Axios** – For API calls
- **Recharts** – For data visualization


## ⚙️ Setup Instructions (Local)

### Prerequisites

- Node.js >= 16.x
- npm or yarn


### 1. Clone the Repository

```bash
git clone https://github.com/Ranjesh2002/AttenQR_Admin.git
cd Admin
```
### 2.  Install Dependencies

```bash
npm install
```
### 3. Configure Environment Variables

```bash
VITE_API_BASE_URL=https://<your-backend-domain>/api
```
### 4. Start Development Server

```bash
npm run dev
```

## Deployment Notes (Azure VM)

### 1. SSH into your Azure VM:

```bash
ssh <your-vm-username>@<your-vm-ip>
```
### 2. Install Node.js and npm (if not installed):

```bash
sudo apt update
sudo apt install nodejs npm
```
### 3. Clone the Admin Panel Repository:

```bash
git clone https://github.com/Ranjesh2002/AttenQR_Admin.git
cd AttenQR_Admin
```
### 4. Install Dependencies & Build the App:

```bash
npm install
npm run build
```
### 5. Configure Nginx:

```bash
server {
    listen 80;
    server_name <your-vm-ip or domain>;

    root /var/www/attendance-admin;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```
### 6. Apply Nginx Configuration:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Security Notes

- Always configure CORS properly on the Django backend to allow requests from your frontend domain.
- Store sensitive keys securely (do not commit .env).
- Use HTTPS in production.

## Future Improvements

-JWT authentication
-Dark mode
-Role-based access for more granular permissions
-Attendance data export to CSV/PDF

## Contributions

Feel free to fork the repo and submit pull requests to contribute.

## License

This project is licensed under the **MIT License**.

## Author

**Ranjesh Thakur**
3rd-year BSc. Computing student | Passionate about full-stack & mobile development