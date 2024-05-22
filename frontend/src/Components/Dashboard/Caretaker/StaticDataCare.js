const profileinfo=[
    {name:"Chris Evan" , email:"chris@gmail.com", age:30,blood:"O+"},
    {name:"John sinna" , email:"john@gmail.com", age:30,blood:"A+"},
    {name:"harry potter" , email:"harry@gmail.com", age:30,blood:"B+"},
    {name:"Ryan smith" , email:"ryan@gmail.com", age:30,blood:"AB+"},
    {name:"Monlo Carlo" , email:"monlo@gmail.com", age:30,blood:"B+"},
    {name:"Joe Biden" , email:"joe@gmail.com", age:30,blood:"AB+"},    

  ]

const data=[
  {
    email:"chris@gmail.com",
    month:[
      {name:'Jan', performance:20},{name:'Feb', performance:50},{name:'Mar', performance:80},{name:'Apr', performance:60},
      {name:'May', performance:30},{name:'Jun', performance:20},{name:'Jul', performance:40},{name:'Aug', performance:90},
      {name:'Sep', performance:70},{name:'Oct', performance:60},{name:'Nov', performance:50},{name:'Dec', performance:20}
    ]
  },
  {
    email:"john@gmail.com",
    month:[
      {name:'Jan', performance:10},{name:'Feb', performance:50},{name:'Mar', performance:40},{name:'Apr', performance:60},
      {name:'May', performance:50},{name:'Jun', performance:20},{name:'Jul', performance:60},{name:'Aug', performance:90},
      {name:'Sep', performance:70},{name:'Oct', performance:60},{name:'Nov', performance:55},{name:'Dec', performance:20}
    ]
  },
  {email:"harry@gmail.com",
    month:[
      {name:'Jan', performance:20},{name:'Feb', performance:70},{name:'Mar', performance:80},{name:'Apr', performance:78},
      {name:'May', performance:30},{name:'Jun', performance:56},{name:'Jul', performance:40},{name:'Aug', performance:56},
      {name:'Sep', performance:70},{name:'Oct', performance:89},{name:'Nov', performance:50},{name:'Dec', performance:45}
      ]},
  {
    email:"ryan@gmail.com",
    month:[
      {name:'Jan', performance:28},{name:'Feb', performance:50},{name:'Mar', performance:15},{name:'Apr', performance:60},
      {name:'May', performance:35},{name:'Jun', performance:20},{name:'Jul', performance:75},{name:'Aug', performance:90},
      {name:'Sep', performance:73},{name:'Oct', performance:60},{name:'Nov', performance:13},{name:'Dec', performance:20}
    ]
  },
  {
    email:"monlo@gmail.com",
    month:[
      {name:'Jan', performance:20},{name:'Feb', performance:50},{name:'Mar', performance:80},{name:'Apr', performance:60},
      {name:'May', performance:30},{name:'Jun', performance:20},{name:'Jul', performance:40},{name:'Aug', performance:90},
      {name:'Sep', performance:70},{name:'Oct', performance:60},{name:'Nov', performance:50},{name:'Dec', performance:20}
    ]
  },
  {
    email:"joe@gmail.com",
    month:[
      {name:'Jan', performance:20},{name:'Feb', performance:50},{name:'Mar', performance:52},{name:'Apr', performance:60},
      {name:'May', performance:30},{name:'Jun', performance:20},{name:'Jul', performance:63},{name:'Aug', performance:90},
      {name:'Sep', performance:70},{name:'Oct', performance:60},{name:'Nov', performance:3},{name:'Dec', performance:20}
    ]
  }
]

const reminders = [
  { time: '10:05 PM', activity: 'Sleeping' },
  { time: '10:05 PM', activity: 'walking' },
  { time: '10:05 PM', activity: 'eating' },
]
    const remindersAddData = [
        { time: '10:05 PM', activity: 'Gardening' },
        { time: '10:10 PM', activity: 'Cooking' },
        { time: '10:15 PM', activity: 'Reading' },
        { time: '10:20 PM', activity: 'Exercise' },
        { time: '10:25 PM', activity: 'Relaxing' },
        { time: '10:30 PM', activity: 'Watching a movie' },
        { time: '10:35 PM', activity: 'Preparing for bed' }
      ];

  const AssignedUser=[
    {
      name:"Chris evan",
      phno:789546321,
      disease:"Cancer",
      allergy:"Dairy",
      walk:75,
      exercise:55,
      meditation:80,
      sleep:60,
      reminds:44,
      goal:64,
      habit:89,
      reminders : [
        { time: '10:05 PM', activity: 'Gardening' },
        { time: '10:05 PM', activity: 'Gardening' },
        { time: '10:05 PM', activity: 'Gardening' },
      ]
    },
    {
      name:"John sinna",
      phno:789546321,
      disease:"____",
      allergy:"Dairy",
      walk:75,
      exercise:55,
      meditation:80,
      sleep:60,
      reminds:44,
      goal:64,
      habit:89,
      reminders : [
        { time: '10:05 PM', activity: 'Sleeping' },
        { time: '10:05 PM', activity: 'walking' },
        { time: '10:05 PM', activity: 'eating' },
      ]
    },
    {
      name:"Harry Potter",
      phno:789546321,
      disease:"BP",
      allergy:"_____",
      walk:75,
      exercise:55,
      meditation:80,
      sleep:60,
      reminds:44,
      goal:64,
      habit:89,
      reminders : [
        { time: '10:05 PM', activity: 'Sleeping' },
        { time: '10:05 PM', activity: 'walking' },
        { time: '10:05 PM', activity: 'eating' },
      ]
    }
  ]

  const UnAssignedUser=[
    {
      name:"Sonu",
      phno:789546321,
      disease:"Cancer",
      allergy:"Dairy",
      walk:75,
      exercise:55,
      meditation:80,
      sleep:60,
      reminds:44,
      goal:64,
      habit:89,
      reminders : [
        { time: '10:05 PM', activity: 'Gardening' },
        { time: '10:05 PM', activity: 'Gardening' },
        { time: '10:05 PM', activity: 'Gardening' },
      ]
    },
    {
      name:"Monu",
      phno:789546321,
      disease:"____",
      allergy:"Dairy",
      walk:75,
      exercise:55,
      meditation:80,
      sleep:60,
      reminds:44,
      goal:64,
      habit:89,
      reminders : [
        { time: '10:05 PM', activity: 'Sleeping' },
        { time: '10:05 PM', activity: 'walking' },
        { time: '10:05 PM', activity: 'eating' },
      ]
    },
    {
      name:"Golu",
      phno:789546321,
      disease:"Sugar",
      allergy:"_____",
      walk:75,
      exercise:55,
      meditation:80,
      sleep:60,
      reminds:44,
      goal:64,
      habit:89,
      reminders : [
        { time: '10:05 PM', activity: 'Sleeping' },
        { time: '10:05 PM', activity: 'walking' },
        { time: '10:05 PM', activity: 'eating' },
      ]
    }
  ]
export { profileinfo, reminders , remindersAddData,AssignedUser, UnAssignedUser , data}