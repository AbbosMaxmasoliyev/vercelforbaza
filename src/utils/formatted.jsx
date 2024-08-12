export const formattedPhoneNumber = (phoneNumber) => {
    const regex = /^\d{12}$/;

    if (regex.test(phoneNumber)) {
        const formattedNumber = phoneNumber.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');

        return formattedNumber;
    } else {
        return phoneNumber
    }
}