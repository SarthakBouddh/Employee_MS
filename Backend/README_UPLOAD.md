# Data Upload Script

This script uploads employee and admin data from the frontend localStorage.jsx file to MongoDB.

## Prerequisites

1. Make sure your MongoDB connection is properly configured in your `.env` file:
   ```
   MONGO_URI=your_mongodb_connection_string
   ```

2. Ensure all dependencies are installed:
   ```bash
   npm install
   ```

## How to Run

### Option 1: Using npm script
```bash
npm run upload-data
```

### Option 2: Direct execution
```bash
node uploadData.js
```

## What the Script Does

1. **Connects to MongoDB** using the connection string from your `.env` file
2. **Clears existing data** (optional - you can modify this behavior)
3. **Uploads admin user** with hashed password
4. **Uploads all employees** with hashed passwords
5. **Creates tasks** for each employee and links them properly
6. **Updates employee records** with task references

## Data Structure

### Admin
- Email: `sarthak@gmail.com`
- Password: `1`
- Role: `admin`

### Employees
The script uploads 5 employees with their respective tasks:

1. **Amit** (employee1@example.com) - 3 tasks
2. **Priya** (employee2@example.com) - 4 tasks  
3. **Rahul** (employee3@example.com) - 5 tasks
4. **Sneha** (employee4@example.com) - 4 tasks
5. **Vikram** (employee5@example.com) - 6 tasks

### Task Status Mapping
The script converts the frontend task status format to MongoDB format:
- `newTask: true` → `status: "new"`
- `active: true` → `status: "active"`
- `completed: true` → `status: "completed"`
- `failed: true` → `status: "failed"`

## Output

After running the script, you should see:
```
Connected to MongoDB successfully
Cleared existing data
Uploading admin...
Admin uploaded successfully
Uploading employees and tasks...
Created employee: Amit
Created task: Prepare sales report for Amit
Created task: Client follow-up emails for Amit
Created task: Update internal wiki for Amit
...
Data upload completed successfully!
Uploaded 5 employees and 22 tasks
Admin credentials:
Email: sarthak@gmail.com
Password: 1
Disconnected from MongoDB
```

## Notes

- All passwords are hashed using bcrypt before storing
- Task dates are converted to proper Date objects
- Employee-task relationships are properly established using MongoDB references
- The script can be run multiple times (it clears existing data first)

## Troubleshooting

If you encounter errors:

1. **Connection Error**: Check your `MONGO_URI` in `.env` file
2. **Validation Error**: Ensure all required fields are present in the data
3. **Duplicate Key Error**: The script clears existing data, so this shouldn't occur

## Customization

To modify the data being uploaded, edit the `employees` and `defaultAdmin` arrays in `uploadData.js`. 