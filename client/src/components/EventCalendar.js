import { useState } from 'react';
import "./CSS/Calendar.css";

const EventCalendar = () => {
    // Get the current date
    const currentDate = new Date();
    //const testdate = new Date(2023,10,1);
    const thisDay = currentDate.getDate();
    // Get the current month and year
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Initialize state for the selected date
    const [selectedDate, setSelectedDate] = useState(null);
    
    // Function to get the days in a month
    const getDaysInMonth = (year, month) => {
        let days = new Date(year, month + 1, 0).getDate();
        return days;
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

    const firstDayOfWeek = getFirstDayOfMonth(currentYear, currentMonth);

    // Add placeholders for the days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
        currentWeek.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        currentWeek.push(i);
        if (currentWeek.length === 7) {
            weeksInMonth.push(currentWeek);
            currentWeek = [];
        }
    }

    // Add placeholders for the days after the last day of the month
    while (currentWeek.length < 7) {
        currentWeek.push(null);
    }

    weeksInMonth.push(currentWeek);

    const today =(d)=>{
        if(d === thisDay){
            return('today');
        }else{
            return('');
        }
    }

    // Function to handle date selection
    const handleDateClick = (day) => {
        setSelectedDate(new Date(currentYear, currentMonth, day));
    };

    return (
        <>
          <table className='calendar-table'>
            <thead className='calendar-table-head'>
              <tr>
                {daysOfWeek.map(day => (<th className='calendar-th' key={day}>{day}</th>))}
              </tr>
            </thead>
            <tbody>
                {weeksInMonth.map((week, index) => (
                    <tr key={index}>
                    {week.map((day, dayIndex) => (
                        <td key={dayIndex} onClick={() => handleDateClick(day)} className={(day === selectedDate?.getDate() ? 'selected' : '')+' '+(today(day))}>
                            <p>{day}</p>{}
                        </td>
                    ))}
                    </tr>
                ))}
            </tbody>
          </table>
        </>
    )
};
    
export default EventCalendar;