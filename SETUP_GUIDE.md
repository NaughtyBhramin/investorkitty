# InvestorKitty - Setup & Demo Account Guide

## Quick Start

### 1. Initialize Demo Accounts

The app comes with pre-configured demo accounts for testing purposes. To initialize them:

#### Option A: Automatic (Recommended)
When you first run the app, visit: `http://localhost:3000/admin/setup`

This will automatically:
- Create demo founder account
- Create demo investor account
- Set up their passwords

#### Option B: Manual API Call
```bash
# With SETUP_TOKEN from .env
curl -X POST http://localhost:3000/api/setup-demo \
  -H "Content-Type: application/json" \
  -H "x-setup-token: your-setup-token"
```

---

## Demo Accounts

### Demo Founder Account
- **Email**: `demo-founder@investorkitty.com`
- **Password**: `DemoPassword123!`
- **Role**: Founder/Seeker
- **Access**: Can submit projects, view investor interest, manage profile

### Demo Investor Account
- **Email**: `demo-investor@investorkitty.com`
- **Password**: `DemoPassword123!`
- **Role**: Investor
- **Access**: Can browse projects, bookmark, save projects, view portfolio

---

## How to Use Demo Accounts

### Method 1: Direct Login
1. Go to [Sign In Page](/sign-in)
2. Click "Demo: Founder" or "Demo: Investor" button
3. Automatically logged in and redirected to dashboard

### Method 2: Manual Email/Password
1. Go to [Sign In Page](/sign-in)
2. Enter demo account email and password
3. Click "Sign in with email"

### Method 3: Credentials
Use the credentials table above to sign in on [Sign In](/sign-in) or [Register](/register) pages

---

## Critical Issues Fixed

### ✅ Authentication System
- **Sign In/Sign Up**: Now works properly with error handling
- **Error Messages**: Clear feedback for invalid credentials
- **Loading States**: User feedback during authentication
- **Redirect Logic**: Properly routes to role-specific dashboards

### ✅ OAuth Authentication
- **Google Login**: Now displays official Google logo
- **GitHub Login**: Now displays official GitHub logo  
- **Microsoft Login**: Now displays official Microsoft logo
- **Error Handling**: Proper error messages if OAuth fails

### ✅ Demo Accounts
- **Quick Demo Access**: One-click demo login buttons
- **Pre-configured Accounts**: Ready to use immediately
- **Test All Features**: Full access to both founder and investor features

---

## Environment Variables

Required environment variables in `.env`:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/investorkitty

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers (Optional for demo)
GOOGLE_CLIENT_ID=your-id
GOOGLE_CLIENT_SECRET=your-secret
GITHUB_CLIENT_ID=your-id
GITHUB_CLIENT_SECRET=your-secret
MICROSOFT_CLIENT_ID=your-id
MICROSOFT_CLIENT_SECRET=your-secret

# Setup Token (for demo account initialization)
SETUP_TOKEN=your-setup-token-here
```

---

## Testing Workflow

### As a Founder
1. Login with demo founder account
2. Go to Dashboard
3. Complete profile
4. Submit a project
5. View investor interest

### As an Investor
1. Login with demo investor account
2. Go to Dashboard
3. Browse projects
4. Bookmark projects
5. View saved projects

---

## Troubleshooting

### Sign In Not Working
- Check console for error messages (F12)
- Verify database is running: `pg_isready -h localhost -p 5432`
- Clear browser cookies and try again
- Check `.env` file has correct `NEXTAUTH_SECRET`

### Demo Accounts Not Found
- Run setup endpoint: `POST /api/setup-demo`
- Check database connection
- Verify Prisma migrations ran: `npx prisma migrate deploy`

### OAuth Not Working
- Verify OAuth credentials in `.env`
- Check OAuth provider configuration
- Ensure callback URL matches OAuth provider settings
- Look for errors in browser console

---

## Next Steps

After testing with demo accounts:

1. Create your own test account via [Register](/register)
2. Complete your profile
3. Test full workflow
4. Proceed with development

---

For more details, see the main README.md
