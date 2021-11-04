import React from "react";
import { useDispatch } from "react-redux";
import { signout } from "../../../Redux/actions";
import { Image } from "react-bootstrap";
export default function Footer() {
  const dispatch = useDispatch();

  return (
    <div onClick={() => dispatch(signout())} className="signoutLabel">
      <Image src="../images/signout.png" /> Se déconnecter
    </div>
  );
}
