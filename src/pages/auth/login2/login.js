import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Box, Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions  } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import backgroundImage from '../../../assets/img/bike_hero.jpg';
import logoImage from '../../../assets/img/Login_UM_Logo.jpg';
import { loginEmployee, changePassword } from '../../../store/reducers/authSlice';
import { startLoading, stopLoading } from '../../../store/reducers/loadingSlice';
import { useNavigate  } from 'react-router-dom';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [openForgotPasswordDialog, setOpenForgotPasswordDialog] = useState(false);
    const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [errorChangePassword, setErrorChangePassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoading = useSelector((state) => state.loading.isLoading);

    const handleOpenForgotPasswordDialog = () => setOpenForgotPasswordDialog(true);
    const handleCloseForgotPasswordDialog = () => setOpenForgotPasswordDialog(false);

    const handleOpenChangePasswordDialog = () => setOpenChangePasswordDialog(true);
    const handleCloseChangePasswordDialog = () => setOpenChangePasswordDialog(false);

    const isLoginDisabled = username.trim() === '' || password.trim() === '';
    const isChangePasswordDisabled = oldPassword.trim() === '' || newPassword.trim() === '' || confirmPassword.trim() === '';
    
    useEffect(() => {
        setUsername('');
        setPassword('');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError(null);
        setErrorChangePassword('');
    }, []);

    useEffect(() => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setErrorChangePassword('');
    }, [openChangePasswordDialog]);

    const handleLogin = async () => {
        if (username && password) {
            dispatch(startLoading());
            try{
                const response = await dispatch(loginEmployee({ username, password }));
                const data = response.payload;
                if (data) {
                    if (data.userId && data.isTempPassword) {
                        setOpenChangePasswordDialog(true);
                    } else {
                        props.parentCallback(true);
                        navigate('/home');
                    }
                }
                else {
                    setError('Invalid username or password! Please try again.');
                }
            }
            catch (error) {
                setError('Invalid username or password! Please try again.');
                console.error('Login error:', error);
            }
            finally {
                dispatch(stopLoading());
            }
        }
    };

    const handleChangePassword = () => {
        if(oldPassword && newPassword && confirmPassword) {
            if(newPassword === confirmPassword) {
                dispatch(startLoading());
                try{
                    const response = dispatch(changePassword({ username, oldPassword, newPassword, securityQuestion: "Test" }));
                    const data = response.payload;
                    if (data && data.success) {
                        handleCloseChangePasswordDialog();
                        navigate('/auth/login');
                    } else {
                        setErrorChangePassword('Invalid old password! Please try again.');
                    }
                }
                catch(error) {
                    setErrorChangePassword('Invalid old password! Please try again.');
                    console.error('Change password error:', error);
                }
                finally {
                    dispatch(stopLoading());
                }
            } else {
                setErrorChangePassword('New Password and Confirm Password are not matching!');
            }
        }
    }

    const handleForgotPassword = () => {

    }

    return (
        <>
            {isLoading && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
            <Container maxWidth="auto">
                <Box display="flex" height="90vh" sx={{ mt: 2}}>
                    {/* Left Side */}
                    <Box
                        flex={7} // 60% width
                        sx={{
                            backgroundImage: `url(${backgroundImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            padding: 3, 
                            borderRight: '1px solid #dbdbdb', 
                        }}
                    >
                        <Typography variant="h4" align="left" sx={{mt: 2}}>
                            <p>Sign into</p>
                            <h2>United Moviers</h2>
                            <h5>If you don’t have an account, then please contact your administrator.</h5>
                        </Typography>
                    </Box>
                    <Box
                        flex={3}
                        bgcolor="white" 
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        padding={4}
                        sx={{
                            height: '100%',
                            boxShadow: 3,
                        }}
                    >
                        <Box
                            component="img"
                            src={logoImage}
                            alt="Logo"
                            sx={{
                                width: '300px',
                                height: 'auto',
                                marginBottom: 2,
                            }}
                        />

                        <Box width="100%">
                            <Typography variant="h5" gutterBottom sx={{ textAlign: 'left' }}>
                                Login
                            </Typography>
                            <TextField
                                label="User Name"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error && (
                                <Typography color="error" variant="body2" sx={{ mt: 1, textAlign: 'left' }}>
                                    {error}
                                </Typography>
                            )}
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ mt: 2 }}
                            >
                                <Typography variant="body2" 
                                    sx={{ textAlign: 'left', cursor: 'pointer', color: 'blue' }}
                                    onClick={handleOpenForgotPasswordDialog}
                                >
                                    Forgot password?
                                </Typography>
                                <Button variant="contained" color="primary" onClick={handleLogin} disabled={isLoginDisabled}>
                                    Login
                                </Button>
                            </Box>
                        </Box>
                        
                        <Typography variant="body2" marginTop={2} sx={{textAlign: 'left'}}>
                            Don't have an account? Please Contact your administrator.
                        </Typography>
                        
                    </Box>
                </Box>
                <Box sx={{ textAlign: 'center', padding: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="body2" color="textSecondary">
                        &copy; {new Date().getFullYear()} United Moviers. All rights reserved.
                    </Typography>
                </Box>
                <Dialog
                    open={openForgotPasswordDialog}
                    onClose={handleCloseForgotPasswordDialog}
                    aria-labelledby="forgot-password-dialog-title"
                    slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } } }}
                >
                    <DialogTitle id="forgot-password-dialog-title">Forgot Password</DialogTitle>
                    <DialogContent>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Enter your email address and we'll send you a link to reset your password.
                        </Typography>
                        <TextField
                            label="Email Address"
                            variant="outlined"
                            type="email"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseForgotPasswordDialog} color="secondary">
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openChangePasswordDialog}
                    onClose={handleOpenChangePasswordDialog}
                    aria-labelledby="change-password-dialog-title"
                    slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } } }}
                    
                >
                    <DialogTitle id="change-password-dialog-title">Change Password</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Old Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <TextField
                            label="New Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <TextField
                            label="Confirm New Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errorChangePassword && (
                            <Typography color="error" variant="body2" sx={{ mt: 1, textAlign: 'left' }}>
                                {errorChangePassword}
                            </Typography>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseChangePasswordDialog} color="secondary">
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleChangePassword} disabled={isChangePasswordDisabled}>
                            Change Password
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
        
    )
}

export default Login;