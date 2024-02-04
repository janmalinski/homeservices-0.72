export const convertDate = (item: string) => {
  const dateString = item?.substring(0, 10);
  let reversedDate = dateString?.split('-').reverse().join('.');
  return reversedDate;
};
