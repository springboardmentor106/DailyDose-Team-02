/* user profile info */
const profileinfo = [
  {
    name: "Mrs. User XYZ",
    age: 57,
    location: "Delhi, India"
  }
];

const user = {
  firstName: "John",
  lastName: "XYZ",
  age: 57,
  progress: "30",
  completed: "30",
  toStart: "70",
}
/* user - reminder list static data for userdashboard */
const remindersList = [
  { time: '10:05 PM', title: 'Gardening' },
  { time: '10:10 PM', title: 'Cooking' },
  { time: '10:15 PM', title: 'Reading' },
  { time: '10:20 PM', title: 'Exercise' },
  { time: '10:25 PM', title: 'Relaxing' },
  { time: '10:30 PM', title: 'Watching a movie' },
  { time: '10:35 PM', title: 'Preparing for bed' }
];

const goalsList = [
  { time: '10:15 PM', activity: 'Reading' },
  { time: '10:20 PM', activity: 'Exercise' },
  { time: '10:25 PM', activity: 'Relaxing' },
];

const habitsList = [
  { activity: 'Gardening' },
  { activity: 'Watching a movie' },
  { activity: 'Preparing for bed' }
];
/* Remider-list-data for Add */
const remindersAddData = [
  { Food: 'After Breakfast', activity: '1.0' },
  { Food: 'AAfter Lunch', activity: '1.0' },
  { Food: 'After Dinner', activity: '1.0' },
];

/*  User chart data */
const Month = [
  { name: 'Jan', performance: 20 }, { name: 'Feb', performance: 50 }, { name: 'Mar', performance: 80 }, { name: 'Apr', performance: 60 },
  { name: 'May', performance: 30 }, { name: 'Jun', performance: 20 }, { name: 'Jul', performance: 40 }, { name: 'Aug', performance: 90 },
  { name: 'Sep', performance: 70 }, { name: 'Oct', performance: 60 }, { name: 'Nov', performance: 50 }, { name: 'Dec', performance: 20 }
]

const AboutUSer = [
  { nameABout: 'Disease', }, { Details: 'Blood pressure' }
]
export { profileinfo, user, goalsList, habitsList, remindersList, remindersAddData, Month, AboutUSer };
