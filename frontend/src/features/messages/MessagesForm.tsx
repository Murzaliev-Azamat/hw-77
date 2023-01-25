import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { decodeMessage, encodeMessage } from './messagesThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDecodedMessage, selectEncodedMessage } from './messagesSlice';

const MessagesForm = () => {
  const dispatch = useAppDispatch();
  const decodedMessage = useAppSelector(selectDecodedMessage);
  const encodedMessage = useAppSelector(selectEncodedMessage);

  const [state, setState] = useState({
    decodedMessage: '',
    password: '',
    encodedMessage: ''
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  useEffect(() => {
    setState(prevState => {
      return {...prevState, encodedMessage: encodedMessage, decodedMessage: decodedMessage};
    });
  }, [encodedMessage, decodedMessage]);

  const encodeMessageHandler = async () => {
    await dispatch(encodeMessage({decodedMessage: state.decodedMessage, password: state.password}));
  };

  const decodeMessageHandler = async () => {
    await dispatch(decodeMessage({encodedMessage: state.encodedMessage, password: state.password}));
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            sx={{width: 1}}
            multiline rows={3}
            id="decodedMessage" label="Decoded message"
            value={state.decodedMessage}
            onChange={inputChangeHandler}
            name="decodedMessage"
          />
        </Grid>

        <Grid item container justifyContent="space-between" alignItems="center" xs>
          <TextField
            sx={{width: '72%'}}
            id="password" label="Password"
            value={state.password}
            onChange={inputChangeHandler}
            name="password"
          />
          <Button type="submit" onClick={encodeMessageHandler} color="primary" variant="contained">
            <ArrowDownwardIcon/>
          </Button>
          <Button type="submit" onClick={decodeMessageHandler} color="primary" variant="contained">
            <ArrowUpwardIcon/>
          </Button>
        </Grid>

        <Grid item xs>
          <TextField
            sx={{width: 1}}
            multiline rows={3}
            id="encodedMessage" label="Encoded message"
            value={state.encodedMessage}
            onChange={inputChangeHandler}
            name="encodedMessage"
          />
        </Grid>
      </Grid>
    </form>
  );

};

export default MessagesForm;