const sendNotification = async (body) => {
    try {
        const { title, description, userId } = body
        console.log(body)
        const url = "http://localhost:5000/api/notifications"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ title, description, userId })
        })

        const data = await response.json()
        return { data, status: "success", }
    } catch (err) {
        return { status: "failed", message: err }
    }
}

export default sendNotification