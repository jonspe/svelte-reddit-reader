export const getDurationString = function (from, to) {
  const diff = to - from
  if (diff < 60000) {
    return 'just now'
  } else if (diff >= 60000 && diff < 3600000) {
    return `${~~(diff / 60000)} minutes ago`
  } else if (diff >= 3600000 && diff < 216000000) {
    return `${~~(diff / 3600000)} hours ago`
  } else if (diff >= 216000000) {
    return `${~~(diff / 216000000)} days ago`
  }
  return 'long ago'
}

export const getUtcDate = function (utcSeconds) {
  const date = new Date(0)
  date.setUTCSeconds(utcSeconds)
  return date
}
