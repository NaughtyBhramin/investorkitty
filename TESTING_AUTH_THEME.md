# Testing Guide: Authentication & Dark Mode

## ✅ Features Implemented & Tested

### 1. Sign-In/Sign-Out Button Toggle

**What happens:**
- **Logged Out**: Navbar shows "Sign in" and "Sign up" buttons
- **Logged In**: Navbar shows "Logout" and "My Profile" buttons
- **After Logout**: Automatically redirected to `/sign-in`

**How to test:**

1. **Test without login:**
   - Go to http://localhost:3001
   - Check navbar - should see "Sign in" and "Sign up" buttons
   - Check mobile menu (hamburger icon on mobile)

2. **Test after login:**
   - Click "Sign in" 
   - Use demo credentials:
     - Email: `demo-founder@investorkitty.com`
     - Password: `DemoPassword123!`
   - Check navbar - "Sign in" and "Sign up" buttons should disappear
   - "Logout" and "My Profile" buttons should appear
   - Works on both desktop and mobile

3. **Test logout:**
   - Click "Logout" button
   - Should redirect to `/sign-in`
   - Navbar should show "Sign in" and "Sign up" buttons again

---

### 2. Dark Mode Persistence

**What happens:**
- When you toggle dark/light mode, preference is saved to browser localStorage
- On page refresh: theme is preserved
- Across sessions: theme persists
- Works on all pages

**How to test:**

1. **Set dark mode:**
   - Click moon icon 🌙 in navbar (top right)
   - Page should go dark
   - Refresh page (Ctrl+R) - should stay dark

2. **Set light mode:**
   - Click sun icon ☀️ in navbar  
   - Page should go light
   - Refresh page - should stay light

3. **Close and reopen browser:**
   - Set dark mode
   - Close browser completely
   - Reopen and go to http://localhost:3001
   - Should still be in dark mode

4. **Mobile view:**
   - Use browser dev tools (F12) to toggle mobile view
   - Click mobile menu hamburger
   - Theme toggle should work the same way

---

## 🧪 Complete Testing Workflow

### Step 1: Start Fresh
```bash
# Clear browser data (optional)
# DevTools → Application → Clear Site Data

# Refresh page
http://localhost:3001
```

### Step 2: Test Dark Mode Persistence
- [ ] Click moon icon - page goes dark
- [ ] Refresh page - stays dark
- [ ] Click sun icon - page goes light
- [ ] Refresh page - stays light
- [ ] Close browser
- [ ] Reopen - theme persists

### Step 3: Test Login/Logout Toggle
- [ ] Verify "Sign in" and "Sign up" buttons visible
- [ ] Click "Sign in"
- [ ] Use demo credentials
- [ ] Verify buttons changed to "Logout" and "My Profile"
- [ ] Click "Logout"
- [ ] Verify redirected to `/sign-in`
- [ ] Verify buttons back to "Sign in" and "Sign up"

### Step 4: Test Mobile Responsiveness
- [ ] Open DevTools (F12)
- [ ] Toggle device toolbar (mobile view)
- [ ] Click hamburger menu ☰
- [ ] Verify buttons appear in mobile menu
- [ ] Test login/logout on mobile
- [ ] Test dark mode toggle on mobile

### Step 5: Test Session Persistence
- [ ] Login with demo account
- [ ] Check "Logout" button visible
- [ ] Refresh page (Ctrl+R)
- [ ] Should stay logged in
- [ ] "Logout" button should still visible
- [ ] Close tab and reopen browser
- [ ] Go to http://localhost:3001
- [ ] Should be logged in (session persists)

---

## 📝 What's Working

✅ **Authentication State Toggle**
- Buttons change based on `useSession()` hook
- Works across all pages
- Mobile and desktop responsive

✅ **Dark Mode Persistence**
- Saved to `localStorage` as `theme` key
- Loaded on component mount
- Falls back to system preference if not set
- Applied to document root element

✅ **Session Management**
- NextAuth handles sessions
- Logout clears session cookie
- Redirects to sign-in after logout

---

## 🔍 Technical Implementation

### Authentication Toggle (Navbar)
```javascript
const { data: session, status } = useSession();
const isAuthenticated = status === 'authenticated' && !!session?.user?.id;

// Renders conditionally based on isAuthenticated
{isAuthenticated ? (
  <>Logout & Profile buttons</>
) : (
  <>Sign in & Sign up buttons</>
)}
```

### Dark Mode Persistence (Theme Provider)
```javascript
// Load on mount
useEffect(() => {
  const storedTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? 'dark' : 'light';
  const initialTheme = storedTheme ?? systemTheme;
  setTheme(initialTheme);
}, []);

// Save on change
useEffect(() => {
  localStorage.setItem('theme', theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
}, [theme]);
```

### Sign-Out with Redirect
```javascript
onClick={() => signOut({ callbackUrl: '/sign-in' })}
```

---

## 🐛 Troubleshooting

### "Buttons don't change after login"
- Clear browser cache (DevTools → Application → Cache Storage)
- Check if session was created successfully
- Look at browser console for errors (F12)
- Try incognito/private window to test

### "Dark mode doesn't persist"
- Check DevTools → Application → LocalStorage
- Should see `theme: "dark"` or `theme: "light"`
- Clear localStorage and try again
- Check if JavaScript is enabled

### "Still logged in after logout"
- Wait a moment for session cookie to clear
- Check DevTools → Application → Cookies
- Look for `next-auth.session-token` cookie
- Refresh after logout to confirm

### "Mobile menu not working"
- DevTools → Toggle device toolbar
- Check if hamburger icon appears
- Click to open/close
- Test buttons in menu

---

## 💡 Tips

1. **Test in Incognito Mode**
   - Isolates data from normal browsing
   - Good for testing fresh sessions

2. **Use Browser DevTools**
   - F12 to open DevTools
   - Application tab to check localStorage/cookies
   - Console tab for errors

3. **Test Both Roles**
   - Demo Founder: more creator options
   - Demo Investor: more discovery options

4. **Mobile Testing**
   - DevTools → Toggle device toolbar (Ctrl+Shift+M)
   - Test responsiveness at different breakpoints
   - 🌙 moon icon should be available in mobile menu

---

## ✨ Expected Results

After these tests pass, you should have:
- ✅ Buttons update when logging in/out
- ✅ Dark mode preference saved and restored
- ✅ Session persists across page refreshes
- ✅ Logout works properly
- ✅ All features work on mobile and desktop

**Server Running:** http://localhost:3001
