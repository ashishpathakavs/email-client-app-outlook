import React from "react";
import { getDateAndTime } from "../../utils";
import "./emailItem.scss";

const EmailItem = ({
  emailData = {},
  handleEmailSelected,
  selectedId,
  favoriteEmailIds,
  readEmails,
}) => {
  const { id, from, date, subject, short_description } = emailData;

  const handleClick = () => {
    handleEmailSelected(emailData);
  };
  return (
    <div
      className={`email-item ${id === selectedId ? "item-active" : ""} ${
        readEmails.includes(id) ? "read" : ""
      }`}
      onClick={handleClick}
    >
      <div className="email-item__avatar">
        <span>{from?.name?.charAt(0).toUpperCase()}</span>
      </div>
      <div className="email-item__details">
        <div>
          From:{" "}
          <span className="bold">
            {from?.name} &lt;{from?.email} &gt;
          </span>
        </div>
        <div>
          Subject: <span className="bold">{subject}</span>
        </div>
        <div>{short_description}</div>
        <div>
          {getDateAndTime(new Date(date))}{" "}
          <span className="favorite bold accent">
            {favoriteEmailIds.includes(id) ? "Favorite" : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmailItem;
