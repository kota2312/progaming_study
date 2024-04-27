export const formatDate = (dataString) => {
    const date = new Date(dataString);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let formattedDate = year + '年' + ++month + '月' + day + '日';
    return formattedDate;
};