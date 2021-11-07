import React, { Dispatch, SetStateAction } from 'react';

import { IconContext } from 'react-icons';
import { ToastContainer } from 'react-toastify';
import { Route } from 'react-router-dom';
import { makeStyles, createStyles } from '@mui/styles';
import { Box, Theme } from '@mui/material';
import { Footer } from './Footer';
import NavBar from './Navbar';
import ErrorSnack from '../LayoutComponents/ErrorSnack';
import Loading from '../LayoutComponents/Loading';
import { useAppSelector } from '../../Store';
import { commonState } from '../../Store/selectors';

interface IDefaultProps {
  component: any;
  path: string;
  exact: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      overflow: 'auto',
      alignContent: 'center',
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
      padding: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }),
);

export default function Layout(props: IDefaultProps) {
  const classes = useStyles();
  const state = useAppSelector(commonState);

  const { component: Component, ...rest } = props;

  return (
    <Route
      /* eslint-disable react/jsx-props-no-spreading */
      {...rest}
      render={(matchProps) => (
        <>
          <NavBar />
          <IconContext.Provider
            value={{ color: '#707070', size: '1.4em' }}
          >
            <ToastContainer />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <div className={classes.container}>
                <Component {...matchProps} />
                <Box pt={4}>
                  <Footer />
                </Box>
              </div>
            </main>
            <ErrorSnack />
            <Loading open={state.loading || state.saving} />
          </IconContext.Provider>
        </>
      )}
    />
  );
}
