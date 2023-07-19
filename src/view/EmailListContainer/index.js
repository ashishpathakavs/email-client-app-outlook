import React, { useEffect, useState } from "react";
import EmailList from "../../components/EmailList";
import { getEmailBody } from "../../services/api";
import {
  initFavoriteInLocalStorage,
  initReadInLocalStorage,
  isObjectAndHasData,
} from "../../utils";
import EmailBody from "../EmailBody";

import "./emailListContainer.scss";

const EmailListContainer = () => {
  const [emailBody, setEmailBody] = useState("");
  const [selectedEmailData, setSelectedEmailData] = useState({});
  const [favoriteEmailIds, setFavoriteEmailIds] = useState([]);
  const [readEmails, setReadEmails] = useState([]);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    initFavoriteInLocalStorage();
    initReadInLocalStorage();
    setFavoriteEmailIds(JSON.parse(localStorage.getItem("favoriteEmails")));
    setReadEmails(JSON.parse(localStorage.getItem("readEmails")));
  }, []);

  useEffect(() => {
    const { id } = selectedEmailData;

    const fetchEmailBody = async (id) => {
      const data = await getEmailBody(id);
      setEmailBody(data.body);
    };
    if (id) {
      fetchEmailBody(id);
    }
  }, [selectedEmailData]);

  const handleEmailSelection = (emailSelected) => {
    setSelectedEmailData(emailSelected);
  };

  const handleFilter = (e) => {
    const value = e.target.textContent;
    setFilter(value);
  };

  return (
    <div className="email-list-container">
      <div onClick={handleFilter} className="email-list-container__filter bold">
        <div>Filter By:</div>
        <button
          className={`filter-btn ${filter === "Unread" ? "selected" : ""}`}
        >
          Unread
        </button>
        <button className={`filter-btn ${filter === "Read" ? "selected" : ""}`}>
          Read
        </button>
        <button
          className={`filter-btn ${filter === "Favorites" ? "selected" : ""}`}
        >
          Favorites
        </button>
      </div>
      <div
        className={`email-list-container__details${
          isObjectAndHasData(selectedEmailData) ? " active" : ""
        }`}
      >
        <EmailList
          handleEmailSelection={handleEmailSelection}
          selectedId={selectedEmailData?.id}
          favoriteEmailIds={favoriteEmailIds}
          readEmails={readEmails}
          filter={filter}
        />
        {isObjectAndHasData(selectedEmailData) && (
          <EmailBody
            emailBody={emailBody}
            emailData={selectedEmailData}
            setFavoriteEmailIds={setFavoriteEmailIds}
            favoriteEmailIds={favoriteEmailIds}
            setReadEmails={setReadEmails}
          />
        )}
      </div>
    </div>
  );
};

export default EmailListContainer;
