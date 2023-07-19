import React, { useEffect, useState } from "react";
import EmailItem from "../EmailItem";
import { getEmailList } from "../../services/api";

import "./emailList.scss";

const EmailList = ({
  handleEmailSelection,
  selectedId,
  favoriteEmailIds,
  readEmails,
  filter,
}) => {
  const [emailList, setEmailList] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);

  const handleEmailSelected = (emailSelected) => {
    handleEmailSelection(emailSelected);
  };

  useEffect(() => {
    const fetchEmailList = async () => {
      const data = await getEmailList();
      setEmailList(data.list);
      setFilteredEmails(data.list);
    };

    fetchEmailList();
  }, []);

  useEffect(() => {
    if (filter === "Unread") {
      const unreadEmail = emailList.filter((email) => {
        return !readEmails.includes(email?.id);
      });

      setFilteredEmails(unreadEmail);
    } else if (filter === "Read") {
      const readEmail = emailList.filter((email) => {
        return readEmails.includes(email?.id);
      });
      setFilteredEmails(readEmail);
    } else if (filter === "Favorites") {
      const favorites = emailList.filter((email) => {
        return favoriteEmailIds.includes(email?.id);
      });
      setFilteredEmails(favorites);
    } else {
      setFilteredEmails(emailList);
    }
  }, [filter, readEmails, favoriteEmailIds, emailList]);

  return (
    <div className="email-list">
      {filteredEmails?.map((email, idx) => (
        <EmailItem
          key={idx}
          emailData={email}
          handleEmailSelected={handleEmailSelected}
          selectedId={selectedId}
          favoriteEmailIds={favoriteEmailIds}
          readEmails={readEmails}
        />
      ))}
    </div>
  );
};

export default EmailList;
