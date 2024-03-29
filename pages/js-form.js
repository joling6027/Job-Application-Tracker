import React from "react";
import { useEffect } from "react";
import moment from "moment-timezone";
import { Button, TextField, Box, Grid, Select, MenuItem, FormControl, Alert } from "@mui/material";

import SendIcon from '@mui/icons-material/Send';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import MomentUtils from '@date-io/moment'
import styles from './js-form.module.css';

export default function EnterJobApplicationForm() {
  moment.tz.setDefault('America/Los_Angeles')

  const [value, setValue] = React.useState(moment().tz("America/Los_Angeles").format());
  const [companyName, setCompanyName] = React.useState();
  const [title, setTitle] = React.useState();
  const [location, setLocation] = React.useState();
  const [skills, setSkills] = React.useState();
  const [status, setStatus] = React.useState("Pending");

  const [message, setMessage] = React.useState();

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

    //handle skills data, from string to array
    const skillArr = skills.split(', ');

    // Get data from the form.
    const data = {
      appliedDate: newValue,
      companyName: event.target.companyName.value,
      location: event.target.location.value,
      title: event.target.title.value,
      skills: skillArr,
      status: event.target.status.value
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)
    // console.log(data)
    // API endpoint where we send form data.
    const endpoint = '/api/test/add'

    // Form the request for sending data to the server.
    // The method is POST because we are sending data.
    // Tell the server we're sending JSON.
    // Body of the request is the JSON data we created above.
    const options = {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // console.log(response)
    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    // console.log(result)

    setMessage(`Great! You have successfully submitted!`)
    resetForm();
  }

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000)

  }, [message])

  return (
    // We pass the event to the handleSubmit() function on submit.
    <>
    {message && <Alert severity='success' sx={{m: 3}}>{message}</Alert>}
    <form className={styles['submit-application-form']} onSubmit={handleSubmit}>
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
      <Box sx={{ mt: 5 }}>
        <Button className={styles['submit-btn']} variant="contained" type="submit" size="large" endIcon={<SendIcon />} >Submit</Button>
      </Box>
    </form>
    </>
  )
}