"use client";
import React from "react";

type Props = {
  logout: Function;
};

const Logout = async (props: Props) => {
  return <button onClick={async () => await props.logout()}>Logout</button>;
};

export default Logout;
