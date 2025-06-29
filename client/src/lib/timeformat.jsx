

const timeFormat = (minutes) => {

    const hours=Math.floor(minutes/60);
    const reminderminutes = minutes % 60;
  return `${hours}h ${minutes}m`
}

export default timeFormat