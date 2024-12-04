
export const formatDate = (date) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return "Invalid Date";
  }

  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};