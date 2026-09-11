# Quick Reference Card

## ⚡ Super Fast Setup

### 1. Supabase Setup (2 min)
```
1. supabase.com → New Project → "medicare-plus"
2. SQL Editor → Run schema.sql
3. SQL Editor → Run seed.sql
4. Settings → API → Copy URL + anon key
```

### 2. Environment (.env)
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### 3. Run
```bash
npm run dev
```

### 4. Open
```
http://localhost:5175
```

---

## 🎯 Demo Script (2 min)

1. **Sign Up** (20s) - test@example.com / test123
2. **Search** (15s) - Type "pain"
3. **Filter** (15s) - Select "Vitamins"
4. **Add Cart** (20s) - Add 3 items
5. **Checkout** (30s) - Fill form, place order
6. **Orders** (20s) - View history, expand items
7. **Mobile** (20s) - Resize browser window

---

## 📁 Key Files

```
database/
├── schema.sql      ← Run first in Supabase
└── seed.sql        ← Run second in Supabase

src/
├── pages/
│   ├── Home.jsx        ← Landing page
│   ├── Signup.jsx      ← Registration
│   ├── Login.jsx       ← Authentication
│   ├── Medicines.jsx   ← Browse + Search
│   ├── Cart.jsx        ← Shopping cart
│   ├── Checkout.jsx    ← Place order
│   └── Orders.jsx      ← Order history
└── contexts/
    ├── AuthContext.jsx ← User auth state
    └── CartContext.jsx ← Cart state

.env                ← YOUR SUPABASE CREDENTIALS
```

---

## ✅ Quick Test

### Test 1: Styling Works
Open app → See dark theme with teal accents
✅ If styled = Working

### Test 2: Auth Works
Sign up → Redirects to medicines page
✅ If redirect = Working

### Test 3: Cart Works
Add item → Cart badge shows "1"
✅ If badge updates = Working

### Test 4: Database Works
Place order → Refresh → Order still there
✅ If persists = Working

---

## 🐛 Quick Fixes

### Issue: White screen
**Fix**: Check .env file exists

### Issue: No medicines
**Fix**: Run seed.sql in Supabase

### Issue: Can't login
**Fix**: Supabase → Auth → Disable email confirmation

### Issue: Port in use
**Fix**: Use the port shown in terminal (5175, 5176, etc.)

---

## 📊 Features Checklist

**MUST-HAVE (5/5)**
- ✅ Auth (signup, login, logout, session)
- ✅ Browse (home, list, detail pages)
- ✅ Cart (add, view, update, remove)
- ✅ Checkout (form, delivery, order)
- ✅ Database (PostgreSQL, persists)

**BONUS (4/4)**
- ✅ Search & Filter
- ✅ Order History
- ✅ Input Validation
- ✅ Responsive Design

---

## 🎨 Design Highlights

- Dark theme (gray-950/900)
- Teal/cyan accents (#06b6d4)
- Glassmorphism navbar
- Gradient buttons
- Card-based layout
- Hover animations
- Mobile-first responsive

---

## 🔗 Important URLs

**Local App**: http://localhost:5175  
**Supabase**: https://supabase.com/dashboard  
**Docs**: See README.md, GETTING_STARTED.md

---

## 📞 Emergency

### Browser Console (F12)
Check for errors here first

### Dev Server Terminal
Check for build errors here

### Supabase Dashboard
- Table Editor → Verify data
- Authentication → Check users
- SQL Editor → Re-run scripts

---

## 💡 Pro Tips

1. Test 30 min before judging
2. Have screenshots ready
3. Know your demo flow
4. Close unnecessary apps
5. Charge laptop fully
6. Have backup internet (hotspot)
7. Practice demo 2-3 times
8. Know your features list
9. Be ready to show code
10. Stay calm, you've got this!

---

## 📈 Scoring (100 points)

- Core features: 40 pts ✅
- Data persistence: 15 pts ✅
- Code quality: 10 pts ✅
- Bonus features: 25 pts ✅ (4/4)
- UI/UX: 10 pts ✅

**Expected Score: 95-100%**

---

## ⏱️ Time Breakdown

- Setup Supabase: 2 min
- Create .env: 30 sec
- Start server: 10 sec
- Test flow: 2 min
- Practice demo: 5 min

**Total: ~10 minutes to be competition-ready**

---

## 🎯 Success Criteria

✅ App runs without errors  
✅ Dark theme visible  
✅ Can sign up  
✅ Can browse medicines  
✅ Can add to cart  
✅ Can checkout  
✅ Order saves to DB  
✅ Can view orders  
✅ Data persists  
✅ Mobile responsive  

**ALL CRITERIA MET → YOU WIN! 🏆**

---

Print this page and keep it handy during the competition!
