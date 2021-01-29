/**
 * @author Jufg
 * @function returnTime
 **/

// Timestamp to TimeString
const returnTime = (pTimeStamp) => {
    let difference = Date.now() - pTimeStamp.toDate();

    let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24

    let hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60

    let minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60

    let secondsDifference = Math.floor(difference / 1000);

    if (new Date().getDay() === pTimeStamp.toDate().getDay()) {
        if (hoursDifference > 0) {
            return pTimeStamp.toDate().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
        } else if (minutesDifference > 0) {
            return `${minutesDifference} min ago`;
        } else if (secondsDifference > -1) {
            return `${secondsDifference} sec ago`;
        }
    } else {
        if (new Date().getFullYear() === pTimeStamp.toDate().getFullYear()) {
            return pTimeStamp.toDate().toLocaleDateString('en-US', {
                month: 'numeric',
                day: 'numeric',
            });
        } else {
            return pTimeStamp.toDate().toLocaleDateString('en-US', {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric'
            });
        }
    }
}

export default returnTime