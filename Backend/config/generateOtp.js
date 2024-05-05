function generateNumberOTP(len) {
    let digits = '0123456789'
    let OTP = ''
    for (let i = 0; i < len; i++) {
        let randomIndex = Math.floor(Math.random() * digits.length)
        OTP += digits[randomIndex]
    }
    return OTP
}

// console.log(generateNumberOTP(8));
export { generateNumberOTP }