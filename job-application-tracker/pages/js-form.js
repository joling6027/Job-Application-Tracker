import React from "react";
import moment from "moment-timezone";
import { Button, TextField, Stack, Box, Paper, Grid, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

import SendIcon from '@mui/icons-material/Send';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'



export default function EnterJobApplicationForm() {
  moment.tz.setDefault('America/Los_Angeles')

  const [value, setValue] = React.useState(moment().tz("America/Los_Angeles").format());
  const [companyName, setCompanyName] = React.useState();
  const [title, setTitle] = React.useState();
  const [location, setLocation] = React.useState();
  const [skills, setSkills] = React.useState();
  const [status, setStatus] = React.useState("Pending");

  const resetForm = () => {
    setLocation("");
    setCompanyName("");
    setValue(moment().tz("America/Los_Angeles").format());
    setTitle("");
    setSkills("");
    setStatus("Pending")
  }

  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // const newValue = moment(value).tz("America/Los_Angeles").format()
    const newValue = moment(value).toISOString()

    // Get data from the form.
    const data = {
      appliedDate: newValue,
      companyName: event.target.companyName.value,
      location: event.target.location.value,
      title: event.target.title.value,
      skills: event.target.skills.value,
      status: event.target.status.value
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

    console.log(response)
    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    console.log(result)
    alert(`Your data sending status: ${result.success}`)
    // event.target.reset();
    resetForm();
  }
  return (
    // We pass the event to the handleSubmit() function on submit.
    <form id="submitForm" onSubmit={handleSubmit}>

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
          <Grid container spacing={2} justifyContent="center">
            <LocalizationProvider dateAdapter={MomentUtils}>
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
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              label="Company Name"
            />
            <TextField
              required
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              label="Location"
            />
          </Grid>
          <Grid container spacing={2} justifyContent="center">
            <TextField
              required
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Job Title"
            />
            <TextField
              required
              id="skills"
              name="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              label="Skills Required"
            />
            <FormControl sx={{justifyContent:"center", width: 240, mx:3}}>
              {/* <InputLabel id="select-status">Status</InputLabel> */}
              <Select
                required
                id="select-status"
                name="status"
                defaultValue={status}
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <MenuItem disabled value="">
                  <em>Status</em>
                </MenuItem>
                <MenuItem value={"Pending"}>Pending</MenuItem>
                <MenuItem value={"Rejected"}>Rejected</MenuItem>
                <MenuItem value={"Interview Scheduled"}>Interview Scheduled</MenuItem>
                <MenuItem value={"Offer received"}>Offer received</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Box>
      </Paper>
      <Box sx={{ mt: 5 }}>
        <Button className="submit-btn" variant="contained" type="submit" size="large" endIcon={<SendIcon />} >Submit</Button>
      </Box>

    </form>
  )
}