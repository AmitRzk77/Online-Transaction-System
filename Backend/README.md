# Online-Transaction-System


A full-stack Transaction Management System built with **Django REST Framework (DRF)** and **React**.  
This application allows users to submit transactions, stores them in a database, and provides functionality to generate PDF reports of transaction details (only for approved transactions).

---

##  Features

- 🔹 Submit new transactions
- 🔄 Store and manage transactions in a PostgreSQL database
- 📄 Generate PDF of individual **approved** transaction details
- 📋 View a list of all transactions
- ✅ Transaction status management: `Approved`, `Pending`, `Rejected`
- 🖥️ Frontend built using **React**
- 🔗 Backend API powered by **Django REST Framework**

---

##  Tech Stack

**Backend:**
- Django
- Django REST Framework
- ReportLab / xhtml2pdf / WeasyPrint (used for PDF generation)
-  SQLite 

**Frontend:**
- React
- Axios (for API calls)
- TailwindCSS 

---

## 📄 PDF Generation

PDFs are generated **only** for transactions with the `Approved` status.  
Each PDF includes:
- Transaction ID
- User Information
- Date and Time
- Amount
- Status
- Any additional remarks or details

---

## ⚙️ API Endpoints (Sample)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/transactions/` | Create new transaction |
| `GET` | `/api/v1/transactions/` | List all transactions |
| `GET` | `/api/v1/transactions/<id>/` | Retrieve transaction details |
| `GET` | `/api/v1/pdf/transactions/<id>/` | Generate PDF (approved only) |
| `PUT` | `/api/transactions/<id>/` | Update transaction |
| `DELETE` | `/api/transactions/<id>/` | Delete transaction |

---

## 🧪 Setup Instructions

### Backend (Django)

```bash
# Clone the repository
git clone git@github.com:AmitRzk77/Online-Transaction-System.git
cd transaction-system/backend

# Create virtual environment and activate
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Run development server
python manage.py runserver
```

### Frontend (React)

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📁 Folder Structure

```
transaction-system/
├── backend/
│   ├── transactions/
│   ├── users/
│   ├── manage.py
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
├── README.md
```

---

## 📌 Future Enhancements

- Authentication & Role-based Access
- Email transaction PDFs
- Export full transaction list as Excel/CSV
- Dashboard for analytics

---

## 🧑‍💻 Author

Created by Amit Kumar Rajak  
Feel free to contribute, suggest changes, or raise issues.

---

