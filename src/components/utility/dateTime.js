// date time iso format 2020-03-20T16:00:00Z

export const formatDateTime = (dateTime) => {
    const isoDate = dateTime.split('T')[0]
    const date = isoDate.split('-')[1] + '-' + isoDate.split('-')[2] + '-' + isoDate.split('-')[0]
    const timeWithZ = dateTime.split('T')[1]
    const timeWithMiliseconds = timeWithZ.split('Z')[0]
    const utcTime = timeWithMiliseconds.split(':')[0] + ':' + timeWithMiliseconds.split(':')[1]
    const timeInteger = utcTime.split(':')[0] - 5
    const time = timeInteger.toString() + ':' + utcTime.split(':')[1]
    const newDateTime = `${date} @ ${time} CST`
    return newDateTime
}