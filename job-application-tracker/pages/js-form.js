import React from "react";
import moment from "moment/moment";
import { Button, TextField, Stack, Box } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, StaticDatePicker, DatePicker, MobileDatePicker, DesktopDatePicker } from '@mui/x-date-pickers';

export default function PageWithJSbasedForm() {

  const [value, setValue] = React.useState(moment().format('L'));

  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data = {
      first: event.target.first.value,
      last: event.target.last.value,
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)

    // API endpoint where we send form data.
    const endpoint = '/api/form'

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    alert(`Is this your full name: ${result.data}`)
  }
  return (
    // We pass the event to the handleSubmit() function on submit.
    <form onSubmit={handleSubmit}>

      

      {/* <label htmlFor="appliedDate">Applied Date</label>
      <input type="date" id="appliedDate" name="appliedDate" required /> */}

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 3, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            disableFuture
            label="Applied Date"
            openTo="year"
            views={['year', 'month', 'day']}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        
        <TextField
          required
          id="companyName"
          label="Company Name"
        // defaultValue="Company name"
        />
        <TextField
          required
          id="location"
          label="Location"
        // defaultValue="Company name"
        />
        <TextField
          required
          id="title"
          label="Job Title"
        // defaultValue="Company name"
        />
        <TextField
          required
          id="skills"
          label="Skills Required"
        // defaultValue="Company name"
        />
      </Box>


      {/* <label htmlFor="companyName">Company Name</label>
      <input type="text" id="companyName" name="companyName" required /> */}

      {/* <label htmlFor="location">Location</label>
      <input type="text" id="location" name="location" required /> */}

      {/* <label htmlFor="title">Job Title</label>
      <input type="text" id="title" name="title" required /> */}

      {/* <label htmlFor="title">Skills Required</label>
      <input type="text" id="title" name="title" required /> */}

      <Button className="submit-btn" variant="contained" type="submit" size="large" endIcon={<SendIcon />} >Submit</Button>
    </form>
  )
}