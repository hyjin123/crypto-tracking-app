import { React, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { makeStyles } from "@mui/styles";

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
        <DeleteForeverIcon fontSize="medium"/>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this transaction?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => {
            handleClose();
            handleDeleteTransaction(props.transactionId);
          }}>Confirm</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteAlert;