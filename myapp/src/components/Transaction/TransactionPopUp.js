import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const TransactionPopUp = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("1");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Transaction
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Transaction</DialogTitle>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="BUY" value="1" />
              <Tab label="SELL" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box component="form" noValidate autoComplete="off">
              <DialogContent>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="price_per_coin"
                  label="Price Per Coin"
                  type="number"
                  fullWidth
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="quantity"
                  label="Quantity"
                  type="number"
                  fullWidth
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="total_spent"
                  label="Total Spent"
                  type="number"
                  fullWidth
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="date"
                  label="Date"
                  type="date"
                  fullWidth
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="fee"
                  label="Fee"
                  type="number"
                  fullWidth
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="note"
                  label="Note"
                  type="text"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Submit</Button>
                <Button onClick={handleClose}>Cancel</Button>
              </DialogActions>
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <DialogContent>
              <TextField
                InputLabelProps={{ shrink: true }}
                autoFocus
                margin="dense"
                id="price_per_coin"
                label="Price Per Coin"
                type="number"
                fullWidth
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                autoFocus
                margin="dense"
                id="quantity"
                label="Quantity"
                type="number"
                fullWidth
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                autoFocus
                margin="dense"
                id="total_spent"
                label="Total received"
                type="number"
                fullWidth
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                autoFocus
                margin="dense"
                id="date"
                label="Date"
                type="date"
                fullWidth
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                autoFocus
                margin="dense"
                id="fee"
                label="Fee"
                type="number"
                fullWidth
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                autoFocus
                margin="dense"
                id="note"
                label="Note"
                type="text"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Submit</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </TabPanel>
        </TabContext>
      </Dialog>
    </div>
  );
};

export default TransactionPopUp;
