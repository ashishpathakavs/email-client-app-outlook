import { emailApis } from "../constants/appConstant";

export const getEmailList = async () => {
  const res = await fetch(emailApis.emailList);
  const data = await res.json();
  return data;
};

export const getEmailBody = async (id) => {
  let url = emailApis.emailBody + id;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
