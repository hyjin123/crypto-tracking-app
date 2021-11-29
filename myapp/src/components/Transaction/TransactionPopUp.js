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
import axios from "axios";
import "../Portfolio/portfolio.css";
import { withStyles } from "@mui/styles";

// this code is used to change the textfield styles when static, focused, hover etc.
const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& label": {
      color: "white",
    },
    "& input": {
      color: "white",
    },
    "& .MuiInput": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgba(25, 118, 210, 1)",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(25, 118, 210, 0.5)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(25, 118, 210, 1)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgba(25, 118, 210, 1)",
      },
    },
  },
})(TextField);

const TransactionPopUp = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("1");
  const [buyPrice, setBuyPrice] = useState(0);
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [sellQuantity, setSellQuantity] = useState(0);

  const { transactions } = props;

  // NEED this id in order to insert the transaction into the database
  let portfolio_coins_id = props.portfolioCoinId;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    // close the pop up once cancel button or submit button is is pressed
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleBuyPriceChange = (event) => {
    setBuyPrice(event.target.value);
  };

  const handleBuyQuantityChange = (event) => {
    setBuyQuantity(event.target.value);
  };

  const handleSellPriceChange = (event) => {
    setSellPrice(event.target.value);
  };

  const handleSellQuantityChange = (event) => {
    setSellQuantity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios
      .post("/api/coin/transaction", {
        portfolio_coins_id: portfolio_coins_id,
        type: data.get("type"),
        price_per_coin: data.get("price_per_coin"),
        quantity: data.get("quantity"),
        total_spent: data.get("total_spent"),
        date: data.get("date"),
        fee: data.get("fee"),
        note: data.get("note"),
      })
      .then((res) => {
        console.log(res);
        props.setAddedTransaction(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Transaction
      </Button>
      <Dialog
        open={open}
        onClose={handleCancel}
        BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.8)" } }}
        PaperProps={{
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            boxShadow: "none"
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", color: "white" }}>Add Transaction</DialogTitle>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              centered
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab label="BUY" value="1" sx={{ color: "#a9b2b8" }}/>
              <Tab label="SELL" value="2" sx={{ color: "#a9b2b8" }}/>
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
            >
              <DialogContent>
                <CssTextField
                  required
                  readOnly="readonly"
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="type"
                  name="type"
                  label="Transaction Type"
                  type="text"
                  fullWidth
                  value="Buy"
                />
                <CssTextField
                  required
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="price_per_coin"
                  name="price_per_coin"
                  label="Price Per Coin ($)"
                  type="number"
                  fullWidth
                  onChange={handleBuyPriceChange}
                />
                <CssTextField
                  required
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="quantity"
                  name="quantity"
                  label="Quantity"
                  type="number"
                  fullWidth
                  onChange={handleBuyQuantityChange}
                />
                <CssTextField
                  required
                  InputLabelProps={{ shrink: true }}
                  readOnly="readonly"
                  autoFocus
                  margin="dense"
                  id="total_spent"
                  name="total_spent"
                  label="Total Spent ($)"
                  type="number"
                  fullWidth
                  value={buyPrice * buyQuantity}
                />
                <CssTextField
                  required
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="date"
                  name="date"
                  label="Date"
                  type="datetime-local"
                  fullWidth
                />
                <CssTextField
                  required
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="fee"
                  name="fee"
                  label="Fee"
                  type="number"
                  fullWidth
                />
                <CssTextField
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="note"
                  name="note"
                  label="Note"
                  type="text"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button type="submit" onClick={handleCancel}>
                  Submit
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </DialogActions>
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
            >
              <DialogContent>
                <CssTextField
                  required
                  readOnly="readonly"
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="type"
                  name="type"
                  label="Transaction Type"
                  type="text"
                  fullWidth
                  value="Sell"
                />
                <CssTextField
                  required
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="price_per_coin"
                  name="price_per_coin"
                  label="Price Per Coin ($)"
                  type="number"
                  fullWidth
                  onChange={handleSellPriceChange}
                />
                <CssTextField
                  required
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="quantity"
                  name="quantity"
                  label="Quantity"
                  type="number"
                  fullWidth
                  onChange={handleSellQuantityChange}
                />
                <CssTextField
                  required
                  InputLabelProps={{ shrink: true }}
                  readOnly="readonly"
                  autoFocus
                  margin="dense"
                  id="total_spent"
                  name="total_spent"
                  label="Total Received ($)"
                  type="number"
                  fullWidth
                  value={sellPrice * sellQuantity}
                />
                <CssTextField
                  required
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="date"
                  name="date"
                  label="Date"
                  type="datetime-local"
                  fullWidth
                />
                <CssTextField
                  required
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="fee"
                  name="fee"
                  label="Fee"
                  type="number"
                  fullWidth
                />
                <CssTextField
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="note"
                  name="note"
                  label="Note"
                  type="text"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button type="submit" onClick={handleCancel}>
                  Submit
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </DialogActions>
            </Box>
          </TabPanel>
        </TabContext>
      </Dialog>
    </div>
  );
};

export default TransactionPopUp;
