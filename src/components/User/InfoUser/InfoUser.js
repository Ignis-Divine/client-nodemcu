import React from "react";
import moment from "moment";
import localization from "moment/locale/es";
//import { Location, Link, DateBirth } from "../../../utils/Icons";

import "./InfoUser.scss";

export default function InfoUser(props) {
  const { user } = props;

  return (
    <div className="info-user">
      <h2 className="name">
        {user?.nombre} {user?.apellidos}
      </h2>
      <p className="email">{user?.email}</p>
      {user?.biografia && <div className="description">{user.biografia}</div>}

    </div>
  );
}
