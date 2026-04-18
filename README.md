# InvestorsKitty

A production-ready web application connecting entrepreneurs and investors with smart matchmaking, real-time messaging, and deal tracking.

## 🚀 Features

- **Multi-role platform**: Seeker (founders), Investor (VCs/angels), Admin (moderation)
- **Smart matchmaking**: Mutual interest system with Kitty Score algorithm
- **Real-time messaging**: Socket.io-powered chat with file attachments
- **Investor CRM**: Tag startups as reviewing, due diligence, committed, or passed
- **Analytics dashboards**: Views, matches, success metrics for all roles
- **Admin panel**: User verification, content moderation, platform stats
- **Resource library**: Curated templates and guides
- **Syndicate deals**: Multi-investor co-investment tracking
- **CSV export**: Investor-matched startup lists
- **Email notifications**: In-app and email alerts
- **Dark mode**: Full theme support
- **OAuth integration**: Google, GitHub, and Microsoft sign-in

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Backend**: Node.js + Express, Socket.io for real-time
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js v4 with Google/Microsoft OAuth
- **Styling**: Tailwind CSS + shadcn/ui components
- **Deployment**: Hostinger Node.js plan with PM2

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL 13+
- npm or yarn
- Hostinger account (for deployment)

## 🚀 Local Development Setup

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd investorkitty
   npm install --legacy-peer-deps
   ```

2. **Set up PostgreSQL database**:
   ```bash
   # Create database
   createdb investorkitty

   # Or use Docker
   docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Run Prisma migrations**:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Start development server**:
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

## 🔧 Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/investorkitty
NEXTAUTH_SECRET=your-long-secret-here
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-smtp-user
EMAIL_SERVER_PASSWORD=your-smtp-password
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
```

## 🏗️ Project Structure

```
investorkitty/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Login/register pages
│   ├── (dashboard)/              # Role-based dashboards
│   │   ├── seeker/               # Founder dashboard + analytics
│   │   ├── investor/             # Investor discovery + CRM
│   │   └── admin/                # Admin panel + moderation
│   ├── api/                      # REST API routes
│   │   ├── auth/                 # NextAuth handlers
│   │   ├── profiles/             # User profile CRUD
│   │   ├── startups/             # Listing search/filter
│   │   ├── matches/              # Interest/matching logic
│   │   ├── messages/             # Chat CRUD
│   │   ├── notifications/        # In-app notifications
│   │   ├── export/               # CSV export
│   │   └── upload/               # File upload handler
│   └── layout.tsx                # Root layout with theme
├── components/                   # UI components
│   ├── ui/                       # shadcn base components
│   ├── shared/                   # Navbar, Footer, Logo
│   ├── seeker/                   # PitchCard, TractionForm
│   ├── investor/                 # StartupCard, FilterPanel
│   ├── messaging/                # ChatWindow, MessageBubble
│   └── admin/                    # UserTable, StatsChart
├── lib/                          # Utilities
│   ├── prisma.ts                 # Database singleton
│   ├── auth.ts                   # NextAuth config
│   ├── kitty-score.ts            # Scoring algorithm
│   └── utils.ts                  # Helpers
├── prisma/                       # Database
│   ├── schema.prisma             # Full schema with all models
│   ├── seed.ts                   # Realistic sample data
│   └── migrations/               # Auto-generated
├── public/                       # Static assets
├── server.js                     # Express + Socket.io wrapper
├── .env.example                  # Environment template
└── README.md
```

## 🚀 Hostinger Deployment

### 1. Prepare for Production

```bash
# Build the application
npm run build

# Generate Prisma client
npx prisma generate
```

### 2. Hostinger Setup

1. **Create Node.js application** in Hostinger control panel
2. **Upload files** via FTP or Git integration
3. **Set environment variables** in Hostinger dashboard
4. **Install PM2** globally:
   ```bash
   npm install -g pm2
   ```

### 3. Configure PM2

Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'investorkitty',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: process.env.PORT || 3000
    }
  }]
};
```

### 4. Start Application

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 5. Database Setup

- Use Hostinger's PostgreSQL database
- Update `DATABASE_URL` in environment variables
- Run migrations: `npx prisma migrate deploy`

### 6. Domain Configuration

- Point `investorkitty.com` to Hostinger nameservers
- Configure SSL certificate in Hostinger dashboard
- Set up subdomain routing if needed

## 📊 API Endpoints

### Authentication
- `POST /api/auth/[...nextauth]` - NextAuth handlers

### Profiles
- `GET /api/profiles?email=user@example.com` - Get user profile
- `POST /api/profiles` - Create/update profile

### Startups
- `GET /api/startups?q=search&stage=MVP&industry=tech` - Search listings
- `POST /api/startups` - Create startup listing

### Matches
- `GET /api/matches?userId=123` - Get user matches
- `POST /api/matches` - Create or update match

### Messages
- `GET /api/messages?userId=123&peerId=456` - Get conversation
- `POST /api/messages` - Send message

### Notifications
- `GET /api/notifications?userId=123` - Get notifications
- `POST /api/notifications` - Create notification

### Export
- `GET /api/export?userId=123` - Export matched startups to CSV

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Build test
npm run build
```

## 📈 Monitoring

- **PM2**: `pm2 monit` for process monitoring
- **Database**: Monitor PostgreSQL connections and queries
- **Logs**: Check PM2 logs with `pm2 logs investorkitty`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@investorkitty.com or create an issue in this repository.

---

**Built with ❤️ for founders, investors, and the startup ecosystem.**