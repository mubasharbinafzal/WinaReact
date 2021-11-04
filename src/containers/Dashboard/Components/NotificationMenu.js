import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import Grow from "@material-ui/core/Grow"
import Paper from "@material-ui/core/Paper"
import Popper from "@material-ui/core/Popper"
import MenuItem from "@material-ui/core/MenuItem"
import MenuList from "@material-ui/core/MenuList"
import { makeStyles } from "@material-ui/core/styles"
import NotificationList from "./NotificationList"
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive"
import Badge from "@material-ui/core/Badge"
import { Image } from "react-bootstrap"
import {
  GetAllNotifications,
  UpdateNotifications,
} from "../../../Redux/actions"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../../components/UI/Loader"

const useStyles = makeStyles((theme) => ({
  stepDiv2: { overFlowY: "auto", height: "100px" },
}))

export default function MenuListComposition() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const store = useSelector((state) => state.globals)
  const NOTIFICATIONS = store.notifications
  const [open, setOpen] = React.useState(false)
  const [count, setCount] = useState(0)
  const anchorRef = React.useRef(null)

  const handleToggle = () => {
    if (open == false) {
      setOpen((prevOpen) => !prevOpen)
    }
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault()
      setOpen(false)
    }
  }
  React.useEffect(() => {
    dispatch(GetAllNotifications())
  }, [setOpen, open])
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    // if (isAuthenticated()) {
    //   setCount(data.length);
    // }
    prevOpen.current = open
  }, [open])
  const onChangeStatus = (notify) => {
    dispatch(UpdateNotifications(notify._id))
    setOpen(false)
  }
  return (
    <div>
      <Badge
        badgeContent={NOTIFICATIONS ? NOTIFICATIONS.length : ""}
        color="secondary"
      >
        <Image
          className="notification"
          src="../images/bell_icon.png"
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        />
      </Badge>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "right" ? "right top" : "right bottom",
              // zIndex: 0,
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  style={{
                    
                    // zIndex: 1,
                    height: "50vh",
                    // width: "100px",
                    overflow: "auto",
                    overflowY: "scroll",
                  }}
                  onKeyDown={handleListKeyDown}
                >
                  {NOTIFICATIONS ? (
                    NOTIFICATIONS && NOTIFICATIONS.length > 0 ? (
                      <div>
                        {NOTIFICATIONS.map((not) => (
                          <NotificationList
                            not={not}
                            onChangeStatus={onChangeStatus}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="stepDiv2">
                        <MenuItem>No notifications Found</MenuItem>
                      </div>
                    )
                  ) : (
                    <div>Loading...</div>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}
