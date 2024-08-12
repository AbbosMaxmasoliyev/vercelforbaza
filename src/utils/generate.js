export const getStringDate = (date) => {
    console.log(date);
    let innerDate =new Date(date)
    
    return `${innerDate.getFullYear()}-${innerDate.getMonth() < 10 ? "0" + innerDate.getMonth() : innerDate.getMonth()}-${innerDate.getDate() < 10 ? "0" + innerDate.getDate() : innerDate.getDate()}`
}