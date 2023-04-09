// Your code here
function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employeesData) {
    return employeesData.map(employeeData => createEmployeeRecord(employeeData));
  }
  
  function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour, 10),
      date: date
    });
    return employee;
  }
  
  function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt(hour, 10),
      date: date
    });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const wages = datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employee, date), 0);
    return wages;
  }
  
  function calculatePayroll(employees) {
    const totalWages = employees.reduce((total, employee) => total + allWagesFor(employee), 0);
    return totalWages;
  }
  