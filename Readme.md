# RentEase — Rental Listings & Move-in Platform

> A full-stack rental housing platform managing property discovery, visit scheduling, and move-in workflows — built in 6 days for a hackathon.

---

## Problem Statement

Build a rental housing platform that manages:
- Property discovery with filters
- Visit scheduling and tracking
- Move-in workflows with document management
- Support ticket system
- Role-based dashboards (Tenant / Ops / Admin)

---

## Features

### Tenant
- Browse listings with filters (location, budget, move-in date)
- View detailed property page (gallery, amenities, rules, availability)
- Request property visits + track status (Requested → Scheduled → Visited → Decision)
- Shortlist properties
- Compare 2–3 properties side-by-side
- Move-in checklist (document uploads, agreement confirmation, inventory list)
- Support tickets with threaded messages
- Request stay extension

###  Operations
- Manage visit scheduling and status updates
- Oversee active move-ins and extension requests
- Respond to support tickets

###  Admin
- Review and publish listings (Draft → Review → Published)
- Manage all support tickets
- Dashboard with platform-wide stats

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), TailwindCSS, React Router, Zustand |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT + bcrypt |
| File Storage | Multer + Cloudinary (or AWS S3) |
| Frontend Hosting | Vercel |
| Backend Hosting | AWS EC2 + Nginx + PM2 |

---

##  Folder Structure

```
rentease/
├── client/                   # React frontend
│   ├── src/
│   │   ├── pages/            # Route-level page components
│   │   │   ├── tenant/       # Tenant-facing pages
│   │   │   ├── admin/        # Admin dashboard pages
│   │   │   └── ops/          # Operations pages
│   │   ├── components/       # Reusable UI components
│   │   ├── store/            # Zustand global state
│   │   ├── api/              # Axios API call functions
│   │   └── utils/            # Helpers and constants
│   ├── .env
│   └── package.json
│
├── server/                   # Express backend
│   ├── models/               # Mongoose schemas
│   ├── routes/               # Express route definitions
│   ├── controllers/          # Route handler logic
│   ├── middleware/           # Auth, role-check middleware
│   ├── utils/                # Helper functions
│   ├── seed.js               # Database seed script
│   ├── .env
│   └── package.json
│
└── README.md
```

---

##  Database Schema

### User
```js
{
  name: String,
  email: String,
  password: String (hashed),
  role: ['tenant', 'admin', 'ops'],
  createdAt: Date
}
```

### Listing
```js
{
  title: String,
  description: String,
  location: String,
  price: Number,
  images: [String],         
  amenities: [String],
  rules: String,
  availableFrom: Date,
  status: ['draft', 'review', 'published'],
  createdBy: ObjectId (User),
  createdAt: Date
}
```

### VisitRequest
```js
{
  listingId: ObjectId,
  tenantId: ObjectId,
  requestedDate: Date,
  scheduledDate: Date,
  status: ['requested', 'scheduled', 'visited', 'decision'],
  notes: String,
  createdAt: Date
}
```

### Shortlist
```js
{
  tenantId: ObjectId,
  listingIds: [ObjectId]
}
```

### MoveIn
```js
{
  listingId: ObjectId,
  tenantId: ObjectId,
  documents: [String],       
  agreementConfirmed: Boolean,
  inventoryList: [String],
  moveInDate: Date,
  extensionRequested: Boolean,
  status: String
}
```

### SupportTicket
```js
{
  title: String,
  raisedBy: ObjectId (User),
  listingId: ObjectId,
  status: ['open', 'in-progress', 'closed'],
  messages: [{ sender: ObjectId, text: String, createdAt: Date }],
  createdAt: Date
}
```

---

##  API Reference

### Auth
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login and receive JWT |

### Listings
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/api/listings` | Public | Browse listings with filters |
| GET | `/api/listings/:id` | Public | Get listing detail |
| POST | `/api/listings` | Admin | Create new listing |
| PATCH | `/api/listings/:id` | Admin | Edit listing |
| PATCH | `/api/listings/:id/status` | Admin | Change listing status |

### Visits
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/api/visits` | Tenant | Request a visit |
| GET | `/api/visits/my` | Tenant | Get my visit requests |
| GET | `/api/visits` | Ops/Admin | Get all visits |
| PATCH | `/api/visits/:id/status` | Ops/Admin | Update visit status |

### Shortlist
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/api/shortlist` | Tenant | Get shortlisted properties |
| POST | `/api/shortlist/add` | Tenant | Add to shortlist |
| DELETE | `/api/shortlist/remove` | Tenant | Remove from shortlist |

### Move-In
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/api/movein` | Tenant | Initiate move-in |
| PATCH | `/api/movein/:id` | Tenant | Update checklist/documents |
| POST | `/api/movein/:id/extension` | Tenant | Request stay extension |
| GET | `/api/movein` | Ops/Admin | View all move-ins |

### Support Tickets
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/api/tickets` | Tenant | Create a ticket |
| GET | `/api/tickets/my` | Tenant | Get my tickets |
| GET | `/api/tickets` | Ops/Admin | Get all tickets |
| POST | `/api/tickets/:id/message` | Any | Reply to ticket thread |
| PATCH | `/api/tickets/:id/status` | Ops/Admin | Update ticket status |

---

##  Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier works)
- Cloudinary account (for image uploads)

### 1. Clone the repo
```bash
git clone https://github.com/your-username/rentease.git
cd rentease
```

### 2. Setup Backend
```bash
cd server
npm install
cp .env.example .env  
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
cp .env.example .env   
npm run dev
```

---

##  Environment Variables

### Server (`index/.env`)
```env
PORT=8000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Client (`client/.env`)
```env
VITE_API_URL=http://localhost:5000
```

---

##  Seed Database

Run this to populate with sample admin, listings, and tenant data:
```bash
cd server
node seed.js
```

**Sample credentials after seeding:**
| Role | Email | Password |
|---|---|---|
| Admin | admin@rentease.com | admin123 |
| Tenant | tenant@rentease.com | tenant123 |
| Ops | ops@rentease.com | ops123 |

---

##  Deployment Guide

### Frontend → Vercel
1. Push `client/` folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → Import project
3. Set build command: `npm run build`, output dir: `dist`
4. Add environment variable: `VITE_API_URL=https://your-ec2-ip-or-domain`
5. Deploy 

### Backend → AWS EC2
```bash
# 1. Launch EC2 t2.micro (Ubuntu 22.04)
# 2. SSH into instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# 3. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. Install PM2 and Nginx
sudo npm install -g pm2
sudo apt install nginx -y

# 5. Clone and setup project
git clone https://github.com/your-username/rentease.git
cd rentease/server
npm install
nano .env   # paste your env variables

# 6. Start server with PM2
pm2 start server.js --name rentease-api
pm2 startup
pm2 save

# 7. Configure Nginx reverse proxy
sudo nano /etc/nginx/sites-available/rentease
```

**Nginx config:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
```bash
sudo ln -s /etc/nginx/sites-available/rentease /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

##  6-Day Development Timeline

| Day | Focus | Deliverable |
|---|---|---|
| Day 1 | Project setup + Auth + DB | JWT auth working, role-based redirects |
| Day 2 | Listings CRUD + Admin + Tenant Browse | Listing lifecycle + browse with filters |
| Day 3 | Visit Scheduling + Shortlist + Compare | Full tenant discovery workflow |
| Day 4 | Move-in Workflow + Support Tickets | Ops features complete |
| Day 5 | All Dashboards + Polish | 3 role dashboards complete |
| Day 6 | Testing + Deployment + README | 🚀 Live on Vercel + AWS |

---

##  Contributors

| Name | Role |
|---|---|
| Koushik | Full Stack Developer |

---

##  License

MIT License — feel free to fork and build on this!