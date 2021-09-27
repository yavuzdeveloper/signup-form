
import React, { Fragment, useState } from 'react';
import './App.css';
import { Accordion, AccordionDetails, AccordionSummary, TextField, Typography, Button, Paper, AccordionActions, Container, ListItemText } from '@material-ui/core';
import useStyles from './styles';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import AppBar from "@material-ui/core/AppBar";
import { List, ListItem } from '@material-ui/core/';


function App() {
    const [userName, setUserName] = useState(" ");
    const [phoneNumber, setPhoneNumber] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [isNextOne, setIsNextOne] = useState(false);
    const [isNextTwo, setIsNextTwo] = useState(false);
    const [isSubmit, setIsSubumit] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [selectedDate, handleDateChange] = useState(new Date());
    const classes = useStyles();
    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const nextOne = () => {
        if(userName.trim() === "" || phoneNumber.trim() === "" ){
            alert("Please fill in the required fields");
        }else{ 
            setExpanded(false);
            setIsNextOne(true);
        }
    }

    const nextTwo = () => {
        if(email.trim() === "" || new Intl.DateTimeFormat('en-US', {year: 'numeric'}).format(selectedDate).trim() === "" ){
            alert("Please fill in the required fields");
        }else if(new Intl.DateTimeFormat('en-US', {year: 'numeric'}).format(selectedDate) < 2003){
            setExpanded(false);
            setIsNextTwo(true);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isNextOne && isNextTwo){
            setIsSubumit(true);
        }else{
            alert("Please fill in the required fields");
        }        
    };

  return (
    <Fragment>
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Typography className={classes.heading} variant="h3" align="center">
                Sign up form 
            </Typography>
        </AppBar>
        { !isSubmit && <Container maxWidth="lg">
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit}>
                    <Accordion data-testid='panel1' expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary className={classes.accordionSummary}>
                            <Typography className={classes.heading}>User detail-1</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}>
                                <TextField 
                                    name="User name"  
                                    variant="outlined" 
                                    label="User name"
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                                <TextField 
                                    name="Phone number"  
                                    variant="outlined" 
                                    label="Phone number"  
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </form>
                        </AccordionDetails>
                        <AccordionActions>
                            <Button variant="contained" color="primary" size="small" onClick={() => nextOne('panel1')}>Next</Button>
                        </AccordionActions>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary className={classes.accordionSummary}>
                            <Typography className={classes.heading}>User detail-2</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <form  className={classes.form}>
                                <TextField 
                                    name="Email Address"  
                                    variant="outlined" 
                                    label="Email Address"
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                                <div className={classes.dateOfBirth}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker   disableFuture
                                            openTo="year"
                                            format="dd/MM/yyyy"
                                            label="Date of birth"
                                            views={["year", "month", "date"]}
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            error={new Intl.DateTimeFormat('en-US', {year: 'numeric'}).format(selectedDate)}
                                            helperText={new Intl.DateTimeFormat('en-US', {year: 'numeric'}).format(selectedDate) > 2003 ? 'You must be over 18 years old!' : " "}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                        </form>
                        </AccordionDetails>
                        <AccordionActions>
                            <Button variant="contained" color="primary" size="small" onClick={() => nextTwo('panel2')}>Next</Button>
                        </AccordionActions>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary className={classes.accordionSummary}>
                            <Typography className={classes.heading}>User informations</Typography>
                        </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="User name:" secondary={userName} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Phone number:" secondary={phoneNumber} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Email:" secondary={email} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Birth date:" secondary={new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(selectedDate)} />
                                    </ListItem>
                                </List>
                            </AccordionDetails>
                    </Accordion>
                        <Button onClick={handleSubmit} className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    </form>
                </Paper>
            </Container>}
            {isSubmit && 
                <Typography className={classes.heading} variant="h4" align="center">
                    Congratulations, you have successfully signed up.
                </Typography>
            }
        </Fragment>
    );
}

export default App;