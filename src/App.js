import React, { Fragment, useState } from 'react';
import './App.css';
import { Accordion, AccordionDetails, AccordionSummary, TextField, Typography, Button, Paper, AccordionActions, Container, ListItemText } from '@material-ui/core';
import useStyles from './styles';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import AppBar from "@material-ui/core/AppBar";
import { List, ListItem } from '@material-ui/core/';


const App = () => {
    const [isConfirm, setIsConfirm] = useState(false);
    const [state, setState] = useState({
        userName:'',
        phoneNumber: '',
        email: ''
    });
    const [stepNo, setStepNo] = useState(1);
    const [errorMessage,  setErrorMessage] = useState('');
    const [selectedDate, handleDateChange] = useState(new Date());
    const classes = useStyles();
    

    const onStep = (stepNo) => {
        setStepNo(stepNo);
    };

    const next = () => {
        setErrorMessage('');
        if(stepNo===1){
            if(!state.userName) {
                setErrorMessage('Please enter a name');
            }
            else if(state.userName){
                onStep(stepNo+1);
            }
        } else if(stepNo===2){
            if (new Intl.DateTimeFormat('en-US', {year: 'numeric'}).format(selectedDate) > 2003) {
                setErrorMessage('You must be over 18 years old!')
            }
            else {
                onStep(stepNo+1);
            }  
        }
    }

    const handleInputs = (e) => {
        setErrorMessage('');
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const handleConfirm = (e) => {
        e.preventDefault();
        if(!state.userName || !selectedDate){
            setErrorMessage("Please fill in the required fields");  
        } 
        else{
            setIsConfirm(true);
        }   
    };

    return (
        <Fragment>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h3" align="center">
                    Sign up form 
                </Typography>
            </AppBar>
            { !isConfirm && <Container maxWidth="xs">
                <Paper className={classes.paper}>
                    <form onConfirm={handleConfirm}>
                        <Accordion expanded={stepNo === 1} onChange={() => onStep(1)}>
                            <AccordionSummary className={classes.accordionSummary}>
                            <Typography className={classes.heading}>Sign up step-1</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}>
                                    <TextField 
                                        variant="outlined" 
                                        label="User name"
                                        name='userName'
                                        onChange={(e) => handleInputs(e)}
                                        data-testid="userName"
                                        error={errorMessage}
                                        helperText={errorMessage}
                                    />
                                    <TextField 
                                        variant="outlined" 
                                        label="Phone number"  
                                        name='phoneNumber'
                                        onChange={(e) => handleInputs(e)}
                                        data-testid="PhoneNumber"
                                    />
                                </form>
                            </AccordionDetails>
                            <AccordionActions>
                                <Button variant="contained" color="primary" size="small" onClick={() => next()}>Next</Button>
                            </AccordionActions>
                        </Accordion>
                        <Accordion expanded={stepNo === 2} onChange={() => onStep(2)}>
                            <AccordionSummary className={classes.accordionSummary}>
                                <Typography className={classes.heading}>Sign up step-2</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <form  className={classes.form}>
                                    <TextField 
                                        variant="outlined" 
                                        label="Email Address"
                                        name='email'
                                        onChange={(e) => handleInputs(e)}
                                        data-testid="email"
                                    />
                                    <div className={classes.dateOfBirth}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker   disableFuture
                                                openTo="year"
                                                format="dd/MM/yyyy"
                                                label="Date of birth"
                                                views={["year", "month", "date"]}
                                                value={selectedDate}
                                                onChange={(date) => handleDateChange(date)}
                                                error={errorMessage}
                                                helperText={errorMessage}
                                                data-testid="dateOfBirth"
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </form>
                            </AccordionDetails>
                            <AccordionActions>
                                <Button variant="contained" color="primary" size="small" onClick={() => next()}>Next</Button>
                            </AccordionActions>
                        </Accordion>
                        <Accordion expanded={stepNo === 3} onChange={() => onStep(3)}>
                            <AccordionSummary className={classes.accordionSummary}>
                                <Typography className={classes.heading}>Sign up step-3</Typography>
                            </AccordionSummary>
                                <AccordionDetails>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary="User name:" secondary={state.userName} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Phone number:" secondary={state.phoneNumber} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Email:" secondary={state.email} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Birth date:" secondary={new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(selectedDate)} />
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                                <ListItem>   
                                    <ListItemText primary= {errorMessage} style={{ color: "red", margin:"0 0 0 0"  }} />
                                </ListItem>
                                <AccordionActions>
                                    <Button onClick={handleConfirm} className={classes.buttonConfirm} variant="contained" color="primary" size="large" type="confirm" fullWidth>Confirm</Button>
                                </AccordionActions>
                        </Accordion>
                    </form>
                </Paper>
            </Container>}
            {isConfirm && 
                <Typography className={classes.heading} variant="h4" align="center">
                    Congratulations, you have successfully signed up.
                </Typography>
            }
        </Fragment>
    );
}

export default App;



































// import { Fragment, useState } from 'react'
// import Form from './Form'
// import './App.css'
// import Typography from 'material-ui/styles/typography'
// import useStyles from './styles';

// function App() {
//   const [user, setUser] = useState(null);
//   const classes = useStyles();

//   return (
//     <Fragment>
//         {user ?   <Typography className={classes.heading} variant="h4" align="center">
//                     Congratulations, you have successfully signed up.
//                 </Typography>: <Form setUser={setUser} />}
//     </Fragment>
//   )
// }

// export default App;

















// import React, { Fragment, useState } from 'react';
// import './App.css';
// import { Accordion, AccordionDetails, AccordionSummary, TextField, Typography, Button, Paper, AccordionActions, Container, ListItemText } from '@material-ui/core';
// import useStyles from './styles';
// import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
// import DateFnsUtils from '@date-io/date-fns';
// import AppBar from "@material-ui/core/AppBar";
// import { List, ListItem } from '@material-ui/core/';
// import { formValidation } from './formValidation'


// function App() {
//     const [userName, setUserName] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [email, setEmail] = useState("");
//     const [isConfirm, setIsConfirm] = useState(false);
    
//     const [state, setState] = useState({
//         userName:'',
//         phoneNumber: '',
//         email: '',
//         dateOfBirth: null
//     });

//     const [stepNo, setStepNo] = useState(1);

//     const [errorValidation, setErrorValidation] = useState(false);
//     const [errorMessage,  setErrorMessage] = useState('');
    
//     // const [selectedDate, handleDateChange] = useState(new Date());
//     const [selectedDate, handleDateChange] = useState(null);
    
//     const classes = useStyles();
    
//     const onStep = (stepNo) => {
//         // alert('Alert ' + stepNo);
//         setStepNo(stepNo);
//         // setExpanded(true);
//     };

//     const next = () => {

//         // const error = formValidation(state)
//         //     if (error) { 
//         //     setErrorMessage(error);
//         //     return
//         //     } 
//    onStep(stepNo+1);

// // console.log("state.userName:", state.userName);            

// // if(!state.userName){
// //     setErrorMessage('Please enter a user name');
// // }else if(state.userName) {
// //     onStep(stepNo+1);
// //     setErrorMessage('');
// // }

//     // else if(!state.email) {
// //     setErrorMessage('Please enter a user name');
// // }else if(!state.email.includes('@')) {
// //     setErrorMessage( 'Please enter a valid e-mail');
// // }

    

//         // if(stepNo === 1){
//             // if(!state.userName){ 
//             //     setErrorMessage('Please enter a user name');
//             // } else if(state.userName) {
//             //     onStep(stepNo+1);
//             //     setErrorMessage('');
//             // }              
//         // } 
        
        
//         // if(stepNo === 2) {
//         //         if(!email.includes('@')) {
//         //     setErrorValidation(true); 
//         //     }else if(new Intl.DateTimeFormat('en-US', {year: 'numeric'}).format(selectedDate) > 2003){
//         //         onStep(stepNo+1);
//         //     }
//         // }
//  //else 
// //             if(!email.includes('@')){
// //                 // alert("email not valid");
// //                 setErrorValidation(true);
// //             } else if(email.includes('@')) {
// //                 setErrorValidation(false);
// //             } else if( new Intl.DateTimeFormat('en-US', {year: 'numeric'}).format(selectedDate) > 2003 ) {
// //                 setErrorValidation(true);
// //             } 
            
            
// //             //new Intl.DateTimeFormat('en-US', {year: 'numeric'}).format(selectedDate) > 2003  
// //             else {
// //                     onStep(stepNo+1);
// //                     setErrorValidation(false);
// //                 } 
// //         }
        
// // //         else if(!email.includes('@')){
// // // alert("email not valid");
// // //         } 
       
//     }

//     // const formValidation = ({ userName, phoneNumber, email, dateOfBirth }) => {
//     //     if (!userName) {
//     //         return 'Please enter a name'
//     //     } 
// //   if (date.length < 4) {
// //     return 'Your password  is weak'
// //   }

// //   if (!email) {
// //     return 'Please enter an E-mail'
// //   }

// //   if (!email.includes('@')) {
// //     return 'Please enter a valid e-mail'
// //   }
//   //return false
// }
        

//     //    if(step==="1"){ setExpanded(true);
//     //     if(userName.trim() === "" || phoneNumber.trim() === "" ){
//     //         alert("Please fill in the required fields");
//     //     }else{ 
//     //         setExpanded(true);
//     //     }} else if(step==="2"){
//     //         setExpanded(true);
//     //                 if(email.trim() === "" || new Intl.DateTimeFormat('en-US', {year: 'numeric'}).format(selectedDate).trim() === "" ){
//     //                     alert("Please fill in the required fields");
//     //                 }else if(new Intl.DateTimeFormat('en-US', {year: 'numeric'}).format(selectedDate) < 2003){
//     //                     setExpanded(true);
//     //         }
//     //     }
    

//     // const next = () => {
       
//     // }

// //     const handleConfirm = (e) => {
// //         e.preventDefault();
// //         setIsConfirm(true);
// //         if(userName.trim() === "" || phoneNumber.trim() === "" || email.trim() === "" || new Intl.DateTimeFormat('en-US', {year: 'numeric'}).format(selectedDate).trim() === ""){
// //             alert("Please fill in the required fields");
// //         }else{
// //             setIsConfirm(true);
// //         }        
// //     };

// //   const handleInputs = (e) => {
// //     setErrorMessage('');
// //     setState({ ...state, [e.target.name]: e.target.value });
// //     //setErrorMessage('');
// //   }



//   return (Fragment>
    
    
//     </Fragment>)

// //   return (
// //     <Fragment>
// //         <AppBar className={classes.appBar} position="static" color="inherit">
// //             <Typography className={classes.heading} variant="h3" align="center">
// //                 Sign up form 
// //             </Typography>
// //         </AppBar>
// //         { !isConfirm && <Container maxWidth="xs">
// //             <Paper className={classes.paper}>
// //                 <form onConfirm={handleConfirm}>
// //                     <Accordion expanded={stepNo === 1} onChange={() => onStep(1)}>
// //                         <AccordionSummary className={classes.accordionSummary}>
// //                             <Typography className={classes.heading}>Sign up step-1</Typography>
// //                         </AccordionSummary>
// //                         <AccordionDetails>
// //                             <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}>
// //                                 <TextField 
// //                                     variant="outlined" 
// //                                     label="User name"
// //                                     name='userName'
// //                                     onChange={(e) => handleInputs(e)}
// //                                     data-testid="userName"
// //                                     error={errorMessage}
// //                                     helperText={errorMessage}
// //                                     // error={userName === ""}
// //                                     // helperText={userName === "" ? "please enter name" : ''}

// //                                 />
// // {/* <ListItem>   
// //     <ListItemText primary= {errorMessage} style={{ color: "red", margin:"0 0 0 0"  }} />
// // </ListItem> */}

// //                                 <TextField 
// //                                     variant="outlined" 
// //                                     label="Phone number"  
// //                                     name='phoneNumber'
// //                                     onChange={(e) => handleInputs(e)}
// //                                     data-testid="PhoneNumber"
// //                                 />
// //                             </form>
// //                         </AccordionDetails>
// //                         <AccordionActions>
// //                             <Button variant="contained" color="primary" size="small" onClick={() => next()}>Next</Button>
// //                         </AccordionActions>
// //                     </Accordion>
// //                     <Accordion expanded={stepNo === 2} onChange={() => onStep(2)}>
// //                         <AccordionSummary className={classes.accordionSummary}>
// //                             <Typography className={classes.heading}>Sign up step-2</Typography>
// //                         </AccordionSummary>
// //                         <AccordionDetails>
// //                             <form  className={classes.form}>
// //                                 <TextField 
// //                                     variant="outlined" 
// //                                     label="Email Address"
// //                                     name='email'
// //                                     onChange={(e) => handleInputs(e)}
// //                                     data-testid="email"
// //                                     error={errorMessage}
// //                                     helperText={errorMessage}
// //                                     // error = {!email.includes('@') ? "Please enter a valid email!" : ""}
// //                                     // helperText={ !email.includes('@') ? "Please enter a valid email!" : ""}
// //                                 />
// // {/* <ListItem>   
// //     <ListItemText primary= {errorMessage} style={{ color: "red", margin:"0 0 0 0"  }} />
// // </ListItem> */}

// //                                 <div className={classes.dateOfBirth}>
// //                                     <MuiPickersUtilsProvider utils={DateFnsUtils}>
// //                                         <DatePicker   disableFuture
// //                                             openTo="year"
// //                                             format="dd/MM/yyyy"
// //                                             label="Date of birth"
// //                                             name='dateOfBirth'
// //                                             views={["year", "month", "date"]}
// //                                             value={state.dateOfBirth}
// //                                             onChange={(e) => handleInputs(e)}
// //                                             error={errorMessage}
// //                                             helperText={errorMessage}
// //                                             //error={new Intl.DateTimeFormat('en-US', {year: 'numeric'}).format(selectedDate)}
// //                                             // helperText={new Intl.DateTimeFormat('en-US', {year: 'numeric'}).format(selectedDate) > 2003 ? 'You must be over 18 years old!' : " "}
// //                                             // data-testid="dateOfBirth"
// //                                         />

                                     
// // {/* <ListItem>   
// //     <ListItemText primary= {errorMessage} style={{ color: "red" }} />
// // </ListItem> */}
// //                                     </MuiPickersUtilsProvider>
// //                                 </div>
// //                         </form>
// //                         </AccordionDetails>
// //                         <AccordionActions>
// //                             <Button variant="contained" color="primary" size="small" onClick={() => next()}>Next</Button>
// //                         </AccordionActions>
// //                     </Accordion>
// //                     <Accordion expanded={stepNo === 3} onChange={() => onStep(3)}>
// //                         <AccordionSummary className={classes.accordionSummary}>
// //                             <Typography className={classes.heading}>Sign up step-3</Typography>
// //                         </AccordionSummary>
// //                             <AccordionDetails>
// //                                 <List>
// //                                     <ListItem>
// //                                         <ListItemText primary="User name:" secondary={state.userName} />
// //                                     </ListItem>
// //                                     <ListItem>
// //                                         <ListItemText primary="Phone number:" secondary={state.phoneNumber} />
// //                                     </ListItem>
// //                                     <ListItem>
// //                                         <ListItemText primary="Email:" secondary={state.email} />
// //                                     </ListItem>
// //                                     <ListItem>
// //                                         <ListItemText primary="Birth date:" 
// //         secondary={new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(state.dateOfBirth)} />
// //                                     </ListItem>
// //                                 </List>
// //                             </AccordionDetails>
// //                             <AccordionActions>
// //                                 <Button onClick={handleConfirm} className={classes.buttonConfirm} variant="contained" color="primary" size="large" type="confirm" fullWidth>Confirm</Button>
// //                             </AccordionActions>
// //                     </Accordion>
// //                     </form>
// //                 </Paper>
// //             </Container>}
// //             {isConfirm && 
// //                 <Typography className={classes.heading} variant="h4" align="center">
// //                     Congratulations, you have successfully signed up.
// //                 </Typography>
// //             }
// //         </Fragment>
// //     );
// }

// export default App;