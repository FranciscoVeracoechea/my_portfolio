// dependencies
import React, { useState } from 'react';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import EyeIcon from '@material-ui/icons/Visibility';
import EyeOffIcon from '@material-ui/icons/VisibilityOff';
import {
  Container, Paper, Typography, Divider, TextField, InputAdornment,
  IconButton, RadioGroup, FormControlLabel, Radio,
} from '@material-ui/core';
// components
import Page from '../../components/Wrappers/Page';
// assets
import useStyles from './useStyles';
import styles from '../../assets/sass/Auth.scss';


const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState('login');
  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <Page title="Authentication">
      <div className={styles.authWrapper}>
        <Container fixed className={classes.container}>
          <Paper>
            <div className={styles.authHeader}>
              <Typography color="primary" variant="h3" component="h1">
                <LockOpenIcon fontSize="large" />
                Authentication
              </Typography>
            </div>
            <Divider />
            <div className={styles.formWrapper}>
              <form>
                <TextField
                  autoFocus
                  margin="dense"
                  name="username"
                  id="username"
                  label="Username"
                  type="text"
                  fullWidth
                  required
                  // {...getError('username')}
                />
                <TextField
                  margin="dense"
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  required
                  // {...getError('email')}
                />
                <TextField
                  label="Password"
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  margin="dense"
                  fullWidth
                  // {...getError('password')}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="Toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
                          {
                          showPassword
                            ? <EyeIcon />
                            : <EyeOffIcon />
                          }
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <RadioGroup
                  aria-label="gender"
                  name="authType"
                  value={value}
                  onChange={handleChange}
                  className={classes.group}
                >
                  <FormControlLabel value="login" control={<Radio />} label="Login" />
                  <FormControlLabel value="register" control={<Radio />} label="Register" />
                </RadioGroup>
                <TextField
                  margin="dense"
                  id="token"
                  name="token"
                  label="Secret Token"
                  type="text"
                  fullWidth
                  required
                  // {...getError('email')}
                />
              </form>
            </div>
          </Paper>
        </Container>
      </div>
    </Page>
  );
};


export default Auth;
