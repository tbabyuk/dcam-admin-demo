# Office Admin App (aka DCAM Admin Demo)

See it live: [Office Admin App](https://admirable-scone-4cd8a6.netlify.app/)

## Description
A web app used by office administration of a music school business with three main features:
1. TODO TASKS MANAGER
2. CALENDAR PLANNER
3. TEACHER HOURS DASHBOARD

### Todo Tasks Manager
Allows office admin to keep track of todo tasks for the business. Includes standard todo app functionality such as adding and deleting tasks, but also allows user to color-code tasks according priority, edit tasks, and move tasks to one of three columns: "to do tasks", "tasks in progress" and "completed tasks", according to their status.

### Calendar Planner
Allows office admin to set long-term goals and important reminders. User can click on any day in the calendar and create a reminder/goal for that day. Calendar days that have content are automatically circled when page is first loaded or when a new reminder/goal is added.

### Teacher Hours Dashboard
Allows admin to see a list of all their active teachers and whether or not the teachers have submitted their hours/attendance for the upcoming payday. If a teacher has submitted their hours, a button will become active to view attendance in a modal. Admin can also view any additional notes a teacher may have left relating to their attendance.

## Background & Motivation
This project along with all its features came together over time, starting initially with just the "Todo Tasks Manager", followed by the "Calendar Planner" and then the "Teacher Hours Dashboard". Each feature has been altered/improved on as per user feedback and this is their current state.

## Technologies
The current version of this project was done with:
* HTML + Tailwind CSS
* React/Next.js
* Firebase Auth
* Firebase Firestore

## State of Completion
Completed and actively being used by office admin. More improvements/features will be added going forward as per user feedback and business requirements.

## Learning Lessons & Challenges
### Working with Firestore data
One of the trickier parts of this app was working with the database (Firestore) data. I first had to figure out how to best organize my raw data in the database itself, and then what data structure to use to store that data in my app once I retrieve it. This took a bit of trial and error but I eventually came up with what seemed to be the optimal solution. I also had to brush up on the methods that Firebase provides for performing CRUD operations with the todo tasks and calendar reminders. Lastly, I decided to set up a live listener to the database, so that any CRUD operations would be reflected in real time, without having to refresh the page. All this was a challenge but it also taught me a lot about working with databases, which I think is a great asset to have for Front End Developers under their belt.

### Working with React Day Picker
For the Calendar feature, I chose react-day-picker as my calendar. This was my very first time working with this component and it was a big learning curve. The trickiest part was figuring out how to limit the calendar to the time range that I wanted and how to highlight/circle the dates with content in them. I did notice that while the dates with content circle properly on most platforms, they do not show up when viewed on the iPhone/safari. Although this is not a big issue for us as the admin mostly works on a desktop or laptop computer, it is something I plan to look into further down the road.

### Authentication
Although I had worked with Firebase Auth briefly before, this project gave me an opportunity to refresh my knowledge on this topic. As mentioned earlier, I removed auth functionality for the demo version, but the commented out code can still be found in FirebaseContext.js file. Because I did not need any advanced auth-based functionality, I only used the Context API for the auth.

## Summary
As mentioned, this app has been a work in progress and what you see now is its current state. I am always working to improve and optimize it even further and will continue to make updates and add more functionality as needed. For now though, it is fully-functional and is being used by the office front desk every day.




