const UserDetails = {
    firstName: "John",
    lastName: "Doe",
}

const UnassignedUsers = [
    {
        firstName: "Joe",
        startedToday: true,
        Contact: "947598529",
        Disease: "Blood pressure",
    },
    {
        firstName: "Nick",
        Disease: "Blood pressure",
        startedToday: true,
    },
    {
        firstName: "monica",
        startedToday: false,
    }, {
        firstName: "Head",
        startedToday: false,
    }, {
        firstName: "Julie",
        Contact: "947598529",
        startedToday: false,
    },
    {
        firstName: "sam",
        Contact: "947598529",
        startedToday: false,
    },
]

const CaretakerDetails = {
    firstName: "Kevin",
    lastName: "Doe",
    occupation: "BSN",
    age: 51,
    users: [
        {
            firstName: "John",
            startedToday: true,
            Contact: "947598529",
            Disease: "Blood pressure",
        },
        {
            firstName: "Devin",
            Disease: "Blood pressure",
            startedToday: true,
        }, {
            firstName: "Ava",
            startedToday: false,
        }, {
            firstName: "Josh",
            Contact: "947598529",
            startedToday: false,
        },
    ]
}
export default { UserDetails, CaretakerDetails, UnassignedUsers }