export default function transformDate(date) {
    const newDate = new Date(date * 1000);
    return `${newDate.getDate()} ${newDate.toLocaleString('default', { month: 'short' })} ${newDate.getFullYear()}`;
}