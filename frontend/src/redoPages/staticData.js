const UserDetails = {
    firstName: "John",
    lastName: "Doe",
}

const UnassignedUsers = [
    {
        firstName: "Joe",
        startedToday: true,
        contact: "947598529",
        disease: "Blood pressure",
        allergy: "Daily products"
    },
    {
        firstName: "Nick",
        disease: "Blood pressure",
    },
    {
        firstName: "monica",
        allergy: "Pineapple",
    }, {
        firstName: "Head",
    }, {
        firstName: "Julie",
        contact: "947598529",
    },
    {
        firstName: "sam",
        contact: "947598529",
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
            contact: "947598529",
            disease: "Blood pressure",
        },
        {
            firstName: "Devin",
            disease: "Blood pressure",
            startedToday: true,
        }, {
            firstName: "Ava",
            startedToday: false,
        }, {
            firstName: "Josh",
            contact: "947598529",
            startedToday: false,
        },
    ]
}
export default { UserDetails, CaretakerDetails, UnassignedUsers }