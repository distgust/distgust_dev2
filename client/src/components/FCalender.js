import { useState } from "react";

// Get the current date
const currentDate = new Date();
const thisDay = currentDate.getDay();
// Get the current month and year
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

// Initialize state for the selected date
const [selectedDate, setSelectedDate] = useState(null);

// Function to get the days in a month
const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};
// Function to get the first day of the month
const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
};

// Create an array of days in the month
const daysInMonth = getDaysInMonth(currentYear, currentMonth);
// Create an array of days of the week
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Create an array representing the weeks in the month
const weeksInMonth = [];
let currentWeek = [];
let dayCount = 1;
