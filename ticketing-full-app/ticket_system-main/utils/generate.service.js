export function generateAuthCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}


export function generateRefNo() {
    // the ref should be unique and start with a RF and end with 6 random numbers
    let ref = "RF";
    for (let i = 0; i < 6; i++) {
        ref += Math.floor(Math.random() * 10);
    }

    return ref;
}