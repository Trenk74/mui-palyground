import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import {
	Avatar,
	Button,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	Grid,
	Box,
	Typography,
	Container,
	CircularProgress,
} from '@mui/material';
import { Link as RLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Copyright from '../components/common/Copyright';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, authActions, login } from './../store/authSlice';
import { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

export default function SignIn() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isFetching, isSuccess, isError, errorMessage } =
		useSelector(authSelector);

	const emailRef = useRef();
	const passRef = useRef();

	const handleSubmit = event => {
		event.preventDefault();
		const data = {
			username: emailRef.current.value,
			password: passRef.current.value,
			returnSecureToken: true,
		};
		dispatch(login(data));
	};

	useEffect(() => {
		return () => {
			dispatch(authActions.clearState());
		};
	}, []);

	useEffect(() => {
		if (isError) {
			toast.error(errorMessage);
			dispatch(authActions.clearState());
		}
		if (isSuccess) {
			dispatch(authActions.clearState());
			navigate('/app/garage');
		}
	}, [isError, isSuccess]);

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				{isFetching ? (
					<CircularProgress />
				) : (
					<Avatar
						sx={{
							m: 1,
							bgcolor: 'secondary.main',
						}}>
						<LockOutlinedIcon />
					</Avatar>
				)}
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin='normal'
						fullWidth
						required
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						autoFocus
						inputRef={emailRef}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
						inputRef={passRef}
					/>
					<FormControlLabel
						control={<Checkbox value='remember' color='primary' />}
						label='Remember me'
					/>
					<Button
						type='submit'
						variant='contained'
						fullWidth
						sx={{ mt: 3, mb: 2 }}>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href='#' variant='body2'>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link variant='body2' component={RLink} to='/signup'>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Copyright sx={{ mt: 8, mb: 4 }} />
		</Container>
	);
}
