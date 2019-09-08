// dependencies
import React, { useState, useEffect } from 'react';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import EyeIcon from '@material-ui/icons/Visibility';
import EyeOffIcon from '@material-ui/icons/VisibilityOff';
import {
  Container, Paper, Typography, Divider, TextField, InputAdornment,
  IconButton, RadioGroup, FormControlLabel, Radio, Button,
} from '@material-ui/core';
import {
  tap, exhaustMap, filter, map, scan, takeLast, withLatestFrom,
} from 'rxjs/operators';
import { from } from 'rxjs';
import { useEventCallback } from 'rxjs-hooks';
// components
import Page from '../../components/Wrappers/Page';
import Loader from '../../components/Loader';
// assets
import useStyles from './useStyles';
import styles from '../../assets/sass/Auth.scss';
// utils
import formFields from './formFIelds';
import { arrayToObject, isArray, isString } from '../../../shared/utils/functional';
import { ifElse } from '../../../shared/utils/Either';


const Auth = ({
  auth, clearErrors, fetchRegister, fetchLogin,
}) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [fields, setFields] = useState(formFields(auth.user));
  const [message, setMessage] = useState('');
  const [value, setValue] = useState('login');
  const handleChange = event => setValue(event.target.value);

  const [handleOnSubmit] = useEventCallback((event$, inputs$, _) => event$.pipe(
    tap(e => e.preventDefault()),
    tap(clearErrors),
    withLatestFrom(inputs$),
    exhaustMap(([e, [v]]) => from([...e.target]).pipe(
      filter(element => (element.value && element.name && element.id)),
      map(input => [input.name, input.value]),
      scan(arrayToObject, {}),
      takeLast(1),
      tap(d => (v === 'login' ? fetchLogin(d) : fetchRegister(d))),
    )),
  ), [], [value]);

  useEffect(() => {
    ifElse(auth.errors)(
      (errors => errors && isArray(errors))
    ).fold(
      errors => (isString(errors) ? setMessage(errors) : ''),
      errors => setFields(fields.map(
        field => ({
          ...field,
          helperText: ifElse(errors.find(err => err.param === field.field.toLowerCase()))(
            e => e
          ).fold(() => '', err => err.msg),
        })
      ))
    );
  }, [auth.errors, clearErrors, fields]);

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
              <Typography color="error">
                {message}
              </Typography>
              <form onSubmit={handleOnSubmit}>
                {
                  fields.map(({
                    field, props, helperText, forRegisterOnly,
                  }) => (
                    value === 'login' && forRegisterOnly
                      ? null
                      : (
                        <TextField
                          key={field}
                          margin="dense"
                          name={field.toLocaleLowerCase()}
                          id={field.toLocaleLowerCase()}
                          label={field}
                          fullWidth
                          helperText={helperText}
                          error={Boolean(helperText)}
                          {...props}
                          {
                            ...(field.toLocaleLowerCase() === 'password')
                              ? {
                                InputProps: {
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                      >
                                        {
                                        showPassword
                                          ? <EyeIcon />
                                          : <EyeOffIcon />
                                        }
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                },
                                type: showPassword ? 'text' : 'password',
                              }
                              : {}
                          }
                        />
                      )
                  ))
                }
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
                {
                  (auth.loading)
                    ? <Loader />
                    : (
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '1em',
                        }}
                      >
                        <Button type="submit" color="primary" variant="contained">Submit</Button>
                      </div>
                    )
                }
              </form>
            </div>
          </Paper>
        </Container>
      </div>
    </Page>
  );
};


export default Auth;
