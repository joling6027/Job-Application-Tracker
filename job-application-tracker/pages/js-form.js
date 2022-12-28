import React from "react";
import moment from "moment/moment";
import { Button, TextField, Stack, Box, Paper } from "@mui/material";

import SendIcon from '@mui/icons-material/Send';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, StaticDatePicker, DatePicker, MobileDatePicker, DesktopDatePicker } from '@mui/x-date-pickers';

export default function PageWithJSbasedForm() {

  const [value, setValue] = React.useState(moment());

  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    console.log(event.target.companyName.value)

    // Get data from the form.
    const data = {
      appliedDate: value,
      companyName: event.target.companyName.value,
      location: event.target.location.value,
      title: event.target.title.value,
      skills: event.target.skills.value,

    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)

    // API endpoint where we send form data.
    const endpoint = '/api/test/add'

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
      <Paper elevation={3}>
      <Box
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
            name="appliedDate"
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        
        <TextField
          required
          id="companyName"
          name="companyName"
          label="Company Name"
        />
        <TextField
          required
          id="location"
          name="location"
          label="Location"
        />
        <TextField
          required
          id="title"
          name="title"
          label="Job Title"
        />
        <TextField
          required
          id="skills"
          name="skills"
          label="Skills Required"
        />
      </Box>
      </Paper>
      <Box sx={{ mt: 5 }}>
        <Button  className="submit-btn" variant="contained" type="submit" size="large" endIcon={<SendIcon />} >Submit</Button>
      </Box>

    </form>
  )
}