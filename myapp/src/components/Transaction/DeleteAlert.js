import { React, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { makeStyles } from "@mui/styles";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import WarningIcon from '@mui/icons-material/Warning';

// this is a makeStyles hook (Custom css)
const useStyles = makeStyles({
  cell: {
    color: "white",
    fontSize: 15,
    padding: "10px 20px",
  },
  button: {
    padding: "0",
    color: "#b3272e",
  },
  red: {
    color: "#f00606",
  },
  green: {
    color: "#11d811",
  },
});

const DeleteAlert = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { handleDeleteTransaction } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className={classes.button} onClick={handleClickOpen}>
        <DeleteForeverIcon fontSize="medium" />
      </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.95)" } }}
          PaperProps={{
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              boxShadow: "none",
              borderWidth: "1px",
              borderColor: "#c91818",
              borderStyle: "solid"
            },
          }}
        >
          <DialogTitle id="alert-dialog-title" sx={{ color: "#c91818" }}>
            <WarningAmberIcon sx={{ marginRight: "10px" }}/>
            Are you sure you want to delete this transaction?

          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                handleDeleteTransaction(props.transactionId);
              }}
              sx={{ color: "#c91818" }}
            >
              Confirm
            </Button>
            <Button onClick={handleClose} autoFocus sx={{ color: "#c91818" }}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
};

export default DeleteAlert;
