# CF-Visualiser
# 🚀 CP Profile Analyzer

A React-based web application that analyzes a user's Codeforces profile and displays key performance insights.

---

## 📌 Features

- 🔍 Search any Codeforces handle  
- 📊 View user rating, rank, and max rating  
- ✅ Total problems solved (unique)  
- 📈 Problems solved by rating (difficulty-wise)  

---

## 🛠️ Tech Stack

- React.js  
- JavaScript (ES6+)  
- Codeforces API  
- CSS  

---

## 🔗 API Used

- User Info:  
  https://codeforces.com/api/user.info  

- User Submissions:  
  https://codeforces.com/api/user.status  

---

## 🧠 How It Works

- Fetches user data from Codeforces API  
- Processes submissions to count **unique solved problems**  
- Uses **Set** to avoid duplicates  
- Uses **Object/Map** to group problems by rating  

---
