
import React, { useState } from "react";
import "./../style/App.css";

function App() {
  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [editing, setEditing] = useState(false);
  const [inputYear, setInputYear] = useState(year);

  // Get number of days in selected month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Get starting weekday (0 = Sunday)
  const firstDay = new Date(year, month, 1).getDay();

  // Generate calendar cells
  const calendarDays = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];

  // Navigate months
  const changeMonth = (value) => {
    const date = new Date(year, month + value, 1);
    setMonth(date.getMonth());
    setYear(date.getFullYear());
  };

  // Navigate years
  const changeYear = (value) => {
    setYear(year + value);
  };

  const saveYear = () => {
    const parsedYear = Number(inputYear);

    if (Number.isInteger(parsedYear) && parsedYear >= 1 && parsedYear <= 9999) {
      setYear(parsedYear);
    } else {
      setInputYear(year);
    }

    setEditing(false);
  };

  return (
    <div className="calendar">
      <h1>Calendar</h1>

      <div className="controls">
        <button id="prev-year" onClick={() => changeYear(-1)}>
          &lt;&lt;
        </button>

        <button id="prev-month" onClick={() => changeMonth(-1)}>
          &lt;
        </button>

        <select
          id="month"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {months.map((name, index) => (
            <option key={name} value={index}>
              {name}
            </option>
          ))}
        </select>

        {editing ? (
          <input
            id="year-input"
            type="number"
            value={inputYear}
            autoFocus
            onChange={(e) => setInputYear(e.target.value)}
            onBlur={saveYear}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveYear();
              if (e.key === "Escape") {
                setInputYear(year);
                setEditing(false);
              }
            }}
          />
        ) : (
          <span
            id="year"
            onDoubleClick={() => {
              setInputYear(year);
              setEditing(true);
            }}
          >
            {year}
          </span>
        )}

        <button id="next-month" onClick={() => changeMonth(1)}>
          &gt;
        </button>

        <button id="next-year" onClick={() => changeYear(1)}>
          &gt;&gt;
        </button>
      </div>

      <table id="calendar-table">
        <thead>
          <tr>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from(
            { length: Math.ceil(calendarDays.length / 7) },
            (_, row) => (
              <tr key={row}>
                {Array.from({ length: 7 }, (_, col) => {
                  const day = calendarDays[row * 7 + col];

                  return <td key={col}>{day || ""}</td>;
                })}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
