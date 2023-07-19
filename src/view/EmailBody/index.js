import React, { useEffect } from "react";
import { getDateAndTime } from "../../utils";

import "./emailBody.scss";

const EmailBody = ({
  emailBody = "",
  emailData = {},
  setFavoriteEmailIds,
  favoriteEmailIds,
  setReadEmails,
}) => {
  const { id, from, date, subject } = emailData;

  useEffect(() => {
    let readIds = JSON.parse(localStorage.getItem("readEmails"));
    if (!readIds.includes(id)) {
      readIds.push(id);
      localStorage.setItem("readEmails", JSON.stringify(readIds));
      setReadEmails(readIds);
    }
  }, [id]);

  const handleFavorite = () => {
    let favoriteIds = JSON.parse(localStorage.getItem("favoriteEmails"));
    if (favoriteIds.includes(id)) {
      favoriteIds = favoriteIds.filter((item) => {
        return item !== id;
      });
    } else {
      favoriteIds.push(id);
    }
    localStorage.setItem("favoriteEmails", JSON.stringify(favoriteIds));
    setFavoriteEmailIds(favoriteIds);
  };

  return (
    <div className="email-body">
      <div className="email-body__avatar">
        {from?.name?.charAt(0).toUpperCase()}
      </div>
      <div className="email-body__desc">
        <div className="email-body__desc__header">
          <div className="email-body__desc__header-left">
            <div className="email-body__desc__header-left__sub">{subject}</div>
            <div className="email-body__desc__header-left__date">
              {getDateAndTime(new Date(date))}
            </div>
          </div>
          <button
            className="email-body__desc__header-right"
            onClick={handleFavorite}
          >
            {favoriteEmailIds.includes(id)
              ? "Unmark as Favorite"
              : "Mark as Favorite"}
          </button>
        </div>
        <div
          className="email-body__desc__content"
          dangerouslySetInnerHTML={{ __html: emailBody }}
        ></div>
      </div>
    </div>
  );
};

export default EmailBody;
