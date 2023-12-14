export const banglaDateFormat = (dateString: string) => {
  if (!dateString) return;

  dateString = dateString.replace(".000+00:00", "");

  const date = new Date(dateString);

  const options: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };

  return date?.toLocaleString("bn-BD", options);
};
