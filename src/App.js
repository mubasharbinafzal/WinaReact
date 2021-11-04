import React, { useEffect } from "react";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import Main from "./containers";
import Notifier from "./Redux/Notifier";
import ErrorBoundary from "./components/UI/ErrorBoundary";
import io from "socket.io-client";
import { baseUri } from "./urlConfig";

export default function App() {
  const socket = io(baseUri);
  const handleSendNotification = () => {
    socket.emit("sendnotification", "mubashar afzal");
  };

  const handleReceiveNotification = () => {
    socket.on("sendnotification", (data) => {
      console.log(data);
    });
  };
  // socket.on(`recieveNotification`, (data) => {
  //   console.log(data, "data");
  // });
  useEffect(() => {
    //handleSendNotification();
    // handleReceiveNotification();
  }, []);
  return (
    <ErrorBoundary>
      <SnackbarProvider
        dense={false}
        hideIconVariant={false}
        preventDuplicate={false}
        autoHideDuration={2000}
        // persist={true}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <BrowserRouter>
          <Notifier />
          <Main />
        </BrowserRouter>
      </SnackbarProvider>
    </ErrorBoundary>
  );
}
