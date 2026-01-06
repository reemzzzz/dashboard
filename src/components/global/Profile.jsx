import { alpha, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, IconButton, TextField, Typography, useTheme } from "@mui/material";
import Header from "../Header";
import { tokens } from "../../theme";
import EditIcon from '@mui/icons-material/Edit';
import { useContext, useEffect, useRef, useState } from "react"; // <-- Ensure useRef and useState are imported
import { UserContext } from "../../contexts/UserContext";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import AddIcon from '@mui/icons-material/Add';
import ImageUploader from "../ImageUploader";
import { useSnackbar } from 'notistack';
import VerificationCodeHandler from "../../components/Otp"; 
import { mockUsers } from "../../data/mockData";
import { useAuth } from "../../contexts/authContext";
// mockUsers


// const { login } = useAuth();
// console.log(login())

const users = mockUsers;




const phoneRegExp = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/;

const userSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    role: yup.string().required("Role is required"),
    phone: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Phone number is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    file: yup.array().of(yup.object().shape({
        name: yup.string().required(),
        type: yup.string(),
    })),
    photo: yup.string().nullable(),
});
// ----------------------------


const ViewProfile = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // const { user, setUser } = useContext(UserContext);
    // const [currentUser, setCurrentUser] = useState(null);
    const { user,isAuthenticated,login } = useAuth();
    if(!user || !isAuthenticated) 
        return(
        <Box p={4}>
            <Typography color="error">
            User session not found. Please log in again.
            </Typography>
        </Box>
        )

    console.log("User from profile: ",user)
    const currentUser = user;
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
    if (currentUser) {
        console.log("user from profile:", currentUser);
    }
    }, [currentUser]);

    console.log("user from profile: ",currentUser)
    
    const [editMode, setEditMode] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogStep, setDialogStep] = useState('confirm'); // 'confirm', 'code', 'password'
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // State for confirmation

    const submitBtnRef = useRef(null);
    const fileInputRef = useRef(null); 
    
    // ----------------------------------------------------------------
    // --- DIALOG HANDLERS ---
    // ----------------------------------------------------------------

    const handleChangePasswordClick = () => {
        setDialogStep('confirm');
        setOpenDialog(true);
    }
    
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setDialogStep('confirm');
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
    };
    
    const handleConfirmChange = () => {
        enqueueSnackbar(`Sending verification code to ${currentUser?.email || 'your account'}...`, { variant: 'info' });
        
        // Transition to code step
        setDialogStep('code');
    };
    
    const handleOtpChange = (newValue) => {
        setOtp(newValue);
        // Optional: Auto-verify when 6 digits are entered
        if (newValue.length === 6) {
             handleCodeVerification(newValue);
        }
    };
    
    const handleCodeVerification = (code) => {
        // Mock verification
        const MOCK_CORRECT_CODE = '123456'; 
        
        if (code === MOCK_CORRECT_CODE) {
            enqueueSnackbar("Code verified! Please enter your new password.", { variant: 'success' });
            setDialogStep('password');
        } else {
            enqueueSnackbar("Invalid code. Please try again.", { variant: 'error' });
            setOtp(''); 
        }
    };
    
    const handlePasswordSubmit = () => {
        if (newPassword !== confirmPassword) {
            enqueueSnackbar("Passwords do not match.", { variant: 'error' });
            return;
        }
        if (newPassword.length < 8) {
             enqueueSnackbar("Password must be at least 8 characters.", { variant: 'error' });
            return;
        }
        
        // Replace with your API call to update the password
        console.log("Submitting new password:", newPassword);
        enqueueSnackbar("Password successfully changed!", { variant: 'success' });
        handleCloseDialog();
        // currentUser.password = newPassword;
        const updatedUser = {
            ...currentUser,          // keep id, role, departmentId, etc
            password:newPassword,               // overwrite editable fields
            };
        login(updatedUser);

        
    };
    
    // --- DIALOG RENDERER ---
    const renderDialogContent = () => {
        // Reusable Cancel Button Style (matching your delete dialog)
        const cancelButtonSx = { 
            color: colors.blueAccent[300], 
            '&:hover': { backgroundColor: colors.blueAccent[900] }
        };

        switch (dialogStep) {
            case 'confirm':
                return (
                    <>
                        <DialogTitle id="confirm-dialog-title" sx={{ color: colors.grey[100], fontWeight: 'bold' }}>
                            Confirm Password Change
                        </DialogTitle>
                        <DialogContent>
                            <Typography sx={{ color: colors.grey[300] }}>
                                Are you sure you want to change your password? A verification code will be sent to **{user?.email || 'your email'}**.
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} sx={cancelButtonSx}>
                                Cancel
                            </Button>
                            <Button onClick={handleConfirmChange} variant="contained" sx={{ 
                                backgroundColor: colors.greenAccent[600], // Use a distinctive color for confirmation
                                color: colors.grey[100],
                                '&:hover': { backgroundColor: colors.greenAccent[700] }
                            }} autoFocus>
                                Yes, Send Code
                            </Button>
                        </DialogActions>
                    </>
                );

            case 'code':
                return (
                    <>
                        <DialogTitle id="code-dialog-title" sx={{ color: colors.grey[100], fontWeight: 'bold' }}>
                            Enter Verification Code
                        </DialogTitle>
                        <DialogContent>
                            <Box sx={{ p: 1, textAlign: 'center' }}>
                                <Typography gutterBottom sx={{ color: colors.grey[300] }}>
                                    Please enter the 6-digit code sent to you.
                                </Typography>
                                {/* VerificationCodeHandler component (MuiOtpInput) */}
                                <VerificationCodeHandler 
                                    value={otp} 
                                    onChange={handleOtpChange} 
                                />
                                <Button 
                                    onClick={() => handleCodeVerification(otp)} 
                                    variant="outlined" 
                                    disabled={otp.length !== 6}
                                    sx={{ 
                                        mt: 2,
                                        color: colors.blueAccent[300],
                                        borderColor: colors.blueAccent[300],
                                        textTransform: 'none',
                                        "&:hover": { 
                                            backgroundColor: colors.blueAccent[900], 
                                            borderColor: colors.blueAccent[300] 
                                        } 
                                    }}
                                >
                                    Verify Code
                                </Button>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} sx={cancelButtonSx}>Cancel</Button>
                            
                        </DialogActions>
                    </>
                );

            case 'password':
                return (
                    <>
                        <DialogTitle id="password-dialog-title" sx={{ color: colors.grey[100], fontWeight: 'bold' }}>
                            Set New Password
                        </DialogTitle>
                        <DialogContent>
                            <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField
                                    label="New Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    error={newPassword && newPassword.length < 8}
                                    helperText={newPassword && newPassword.length < 8 ? "Must be at least 8 characters" : ""}
                                    // Apply custom styles for consistency
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { borderColor: colors.grey[400] },
                                            "&.Mui-focused fieldset": { borderColor: colors.blueAccent[500] },
                                        },
                                        "& .MuiInputLabel-root": { color: colors.grey[300] },
                                        "& .MuiInputLabel-root.Mui-focused": { color: colors.blueAccent[400] },
                                        "& input": { color: colors.grey[100] },
                                    }}
                                />
                                <TextField
                                    label="Confirm New Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    error={confirmPassword && newPassword !== confirmPassword}
                                    helperText={confirmPassword && newPassword !== confirmPassword ? "Passwords do not match" : ""}
                                     // Apply custom styles for consistency
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { borderColor: colors.grey[400] },
                                            "&.Mui-focused fieldset": { borderColor: colors.blueAccent[500] },
                                        },
                                        "& .MuiInputLabel-root": { color: colors.grey[300] },
                                        "& .MuiInputLabel-root.Mui-focused": { color: colors.blueAccent[400] },
                                        "& input": { color: colors.grey[100] },
                                    }}
                                />
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} sx={cancelButtonSx}>Cancel</Button>
                            <Button 
                                onClick={handlePasswordSubmit} 
                                variant="contained" 
                                disabled={newPassword.length < 8 || newPassword !== confirmPassword}
                                sx={{ 
                                    // Use the red accent color like your delete dialog
                                    backgroundColor: colors.redAccent[600], 
                                    color: colors.grey[100], 
                                    '&:hover': { backgroundColor: colors.redAccent[700] }
                                }}
                            >
                                Change Password
                            </Button>
                        </DialogActions>
                    </>
                );

            default:
                return null;
        }
    };
    
    // ----------------------------------------------------------------
    // --- EXISTING HANDLERS ---
    // ----------------------------------------------------------------
    const handleEditClick = () => {
        if (editMode && submitBtnRef.current) {
            submitBtnRef.current.click();
            console.log("Submit via Ref click");
        } else {
            setEditMode(prev => !prev);
        }
    };

    const handleFileBtnClick = () => {
        fileInputRef.current?.click();
    }
    
    const handleFormSubmit = async (values, { setSubmitting }) => {
        try {
            if (!currentUser) {
            enqueueSnackbar("No active session found.", {
                variant: "error",
            });
            setSubmitting(false);
            return;
            }

            // Merge updates safely
            const updatedUser = {
            ...currentUser,          // keep id, role, departmentId, etc
            ...values,               // overwrite editable fields
            };

            // Update AuthContext (THIS is the source of truth)
            login(updatedUser);

            enqueueSnackbar("Profile updated successfully!", {
            variant: "success",
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
            style: {
                backgroundColor:
                theme.palette.mode === "dark"
                    ? colors.greenAccent[700]
                    : colors.greenAccent[400],
            },
            });

            setEditMode(false);
        } catch (error) {
            console.error("Profile update failed:", error);
            enqueueSnackbar("Failed to update profile.", {
            variant: "error",
            });
        } finally {
            setSubmitting(false);
        }
    };

    
    const initialValues = {
        name: currentUser?.name || "",
        email: currentUser?.email || "",
        phone: currentUser?.phone || "",
        role: currentUser?.role || "",
        file: currentUser?.file || [], 
        photo: currentUser?.photo || "",
        password: currentUser?.password || "",
    };

    const textFieldStyles = {
        gridColumn: "span 2",
        "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: colors.grey[400] },
            "&.Mui-focused fieldset": {
                borderColor: colors.blueAccent[500],
                boxShadow: `0 0 6px ${colors.blueAccent[500]}80`,
            },
        },
        "& .MuiInputLabel-root": { color: colors.grey[300] },
        "& .MuiInputLabel-root.Mui-focused": { color: colors.blueAccent[400] },
        "& input": { color: colors.grey[100] },
    };
    
    return (
        <Box className="mx-7  max-h-full">
            {/* <Header title={"MY PROFILE"} subtitle={"Update your information upon change"}/> */}
            
            <Formik
                initialValues={initialValues}
                validationSchema={userSchema}
                onSubmit={handleFormSubmit}
                enableReinitialize={true} 
            >
                {({
                    values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, 
                }) => (
                    <form onSubmit={handleSubmit} style={{ height: "100%" }}>
                        
                        <Box className="flex flex-col md:flex-row gap-7 my-5 ">
                            
                            <Box className="flex flex-col gap-7 grow-1">
                                {/* --- top Column: Photo & Edit Button --- */}
                            <Box className="flex flex-col  md:flex-row justify-around">
                                <ImageUploader 
                                    editMode={editMode}
                                    initialImageURL={values.photo}
                                    onPhotoChange={(base64StringOrNull) => {
                                        setFieldValue("photo", base64StringOrNull || "");
                                    }}
                                />
                                
                                <Fab
                                    variant = "extended"
                                    className={`!z-20 self-center rounded-lg !shadow-none !mt-2`}
                                    sx={{
                                        backgroundColor: "transparent",
                                        color: `${colors.blueAccent[200]} `  ,
                                        ":hover":{ 
                                            backgroundColor: `${theme.palette.mode === "dark"? colors.primary[600]:colors.primary[900]} !important` ,
                                            color: `${colors.blueAccent[100]} `
                                        }
                                    }}
                                    onClick={handleEditClick}
                                >
                                    <EditIcon className="mr-2"/>
                                    <Typography>{!editMode?"Update Info":"Submit Update"}</Typography>
                                </Fab>
                            </Box> 
                              {/* --- Middle Left: Personal Information --- */}
                            <Box className="rounded-xl p-5 grow-1"
                                backgroundColor = {colors.primary[400]}
                            >
                                <Typography className="!font-bold !mb-3"
                                    variant="h4" 
                                    color={colors.blueAccent[300]}
                                >
                                    Personal Information
                                </Typography>
                                <Divider sx={{ mb: 2, borderColor: theme.palette.mode === "dark"? colors.grey[200]:colors.grey[700] }}/>
                                
                                {/* --- Display Mode --- */}
                                {!editMode ? (
                                    <Box sx={{ display:"flex", flexDirection:"column", justifyContent: "space-between", color: colors.grey[300] }}>
                                        <Typography fontSize={"15px"} fontWeight={"400"} mb={1} sx={{ color: colors.grey[100] }}>
                                            <strong>Name: </strong> {currentUser?.name}
                                        </Typography>
                                        <Typography fontSize={"15px"} fontWeight={"400"} mb={1} sx={{ color: colors.grey[100] }}>
                                            <strong>Phone Number: </strong> {currentUser?.phone}
                                        </Typography>
                                        <Typography fontSize={"15px"} fontWeight={"400"} mb={1} sx={{ color: colors.grey[100] }}>
                                            <strong>Role: </strong> {currentUser?.role}
                                        </Typography>
                                        <Typography fontSize={"15px"} fontWeight={"400"} mb={1} sx={{ color: colors.grey[100] }}>
                                            <strong>Email: </strong> {currentUser?.email}
                                        </Typography>
                                    </Box> 
                                ) : (
                                    /* --- Edit Mode (Formik Fields) --- */
                                    <Box className="flex flex-col gap-3"
                                    >
                                       <Box className="flex flex-row gap-3">
                                            <TextField fullWidth label="Full Name" name="name" variant="outlined" 
                                                value={values.name} onBlur={handleBlur} onChange={handleChange}
                                                error={!!touched.name && !!errors.name} helperText={touched.name && errors.name}
                                                sx={{ ...textFieldStyles }}
                                            />
                                            <TextField fullWidth label="Role" name="role" variant="outlined" 
                                                value={values.role} onBlur={handleBlur} onChange={handleChange}
                                                error={!!touched.role && !!errors.role} helperText={touched.role && errors.role}
                                                sx={{ ...textFieldStyles }}
                                            />
                                       </Box>
                                        <Box className="flex flex-row gap-3">
                                            <TextField fullWidth label="Email" name="email" variant="outlined" 
                                            value={values.email} onBlur={handleBlur} onChange={handleChange}
                                            error={!!touched.email && !!errors.email} helperText={touched.email && errors.email}
                                            sx={{ ...textFieldStyles }}
                                            />
                                            <TextField fullWidth label="Phone Number" name="phone" variant="outlined" 
                                                value={values.phone} onBlur={handleBlur} onChange={handleChange}
                                                error={!!touched.phone && !!errors.phone} helperText={touched.phone && errors.phone}
                                                sx={{ ...textFieldStyles}}
                                            />
                                        </Box>
                                    </Box> 
                                )}
                            </Box>
                            
                            {/* --- Bottom Left: Security --- */}
                            <Box className="rounded-xl p-5"
                                backgroundColor = {colors.primary[400]}
                            >
                                <Typography className="!font-bold !mb-3"
                                    variant="h4" 
                                    color={colors.blueAccent[300]}
                                >
                                    Security
                                </Typography>
                                <Divider sx={{ mb: 2, borderColor: theme.palette.mode === "dark"? colors.grey[200]:colors.grey[700] }}/>
                                <Box className="flex justify-between">
                                    <Button 
                                        className="!text-base !rounded-xl shadow-none "
                                        variant="contained"
                                        onClick={handleChangePasswordClick} 
                                        sx={{
                                            backgroundColor: colors.primary[400],
                                            color: colors.blueAccent[400],
                                            textTransform: 'none',
                                            ":hover": {
                                                boxShadow:`0px 2px 6px 2px ${theme.palette.mode === "dark"?colors.primary[500]:colors.grey[800]} !important`,
                                            }
                                        }}>
                                        Change Password
                                    </Button>
                                </Box>
                            </Box>
                            
                            </Box>
                            {/* --- Right Column: CV & Certificates --- */}
                            <Box className="rounded-xl p-5 grow-1"
                                backgroundColor = {colors.primary[400]}>
                                <Typography 
                                    variant="h4" 
                                    fontWeight={"700"}
                                    color={colors.blueAccent[300]}
                                    mb={1}
                                >
                                    Training Certificates
                                </Typography>
                                <Divider sx={{ mb: 2, borderColor: theme.palette.mode === "dark"? colors.grey[200]:colors.grey[700] }}/>
                                <Box 
                                    display={"flex"} 
                                    flexDirection={"column"} 
                                    p={2}
                                    alignItems={"flex-start"}
                                >
                                    {/* Display uploaded files */}
                                    {values.file.map((file,index)=> (
                                        <Box
                                            key={index}
                                            sx={{
                                                display:"flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                mb:1,
                                                borderRadius: "15px",
                                                width: "100%",
                                                p:1,
                                                cursor: "pointer",
                                                transition: "ease-in-out 0.3s",
                                                ":hover": {
                                                    backgroundColor: theme.palette.mode === "dark"?alpha(colors.blueAccent[400],0.1):alpha(colors.blueAccent[800],0.4)
                                                },
                                            }}
                                        >
                                            <Box display={"flex"} alignItems="center">
                                                <img 
                                                    alt="pdf"
                                                    src="../../assets/pdf-icon.png" 
                                                    style={{ width: 25, height: 25, marginRight: 8 }}
                                                />
                                                <Typography sx={{ color: colors.grey[100] ,fontSize: "15px"}}>
                                                    {file.name}
                                                </Typography>
                                            </Box>
                                            <Box display="flex" gap={1}>
                                                <Button 
                                                    className="view-btn"
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => console.log("Viewing file:", file.name)} 
                                                    sx={{
                                                        color: colors.blueAccent[400],
                                                        borderColor: colors.blueAccent[400],
                                                        textTransform: "none",
                                                        "&:hover": {
                                                            borderColor: colors.blueAccent[100],
                                                            color:colors.blueAccent[100],
                                                            backgroundColor: `${colors.blueAccent[700]}40`,
                                                        },
                                                    }}> 
                                                    View
                                                </Button>
                                                {editMode && (
                                                    <Button 
                                                        variant="outlined"
                                                        color="error"
                                                        size="small"
                                                        onClick={() => {
                                                            const updatedFiles = values.file.filter((_, i) => i !== index);
                                                            setFieldValue("file", updatedFiles);
                                                            const updatedUser = {
                                                                ...currentUser,
                                                                file: updatedFiles,
                                                            }
                                                            login(updatedUser)
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                )}
                                            </Box>
                                        </Box>
                                    ))}
                                    
                                    {/* Add File Button */}
                                    {editMode && (
                                        <IconButton 
                                            onClick={handleFileBtnClick}
                                            sx={{
                                                ml:1,
                                                mt:2,
                                                backgroundColor: theme.palette.mode === "dark"? colors.primary[100]: colors.primary[900],
                                                color: colors.primary[600],
                                                ":hover": {backgroundColor: theme.palette.mode === "dark"? colors.primary[200]: colors.primary[800]}
                                            }}>
                                            < AddIcon />
                                        </IconButton>
                                    )}
                                    
                                </Box>
                          
                            </Box>
                            
                        </Box>
                        
                        <input 
                            type="file" multiple accept=".pdf" ref={fileInputRef} hidden name="file"
                            onChange={(e) => {
                                const files = Array.from(e.target.files);
                                const fileData = files.map((file) => ({
                                    name: file.name, type: file.type,
                                }));
                                const existingFiles = values.file || [];  
                                const updatedFiles = [...existingFiles, ...fileData];
                                setFieldValue("file", updatedFiles); 
                                e.target.value = "";
                            }}
                        />

                        <Button type="submit" ref={submitBtnRef} sx={{ display: "none" }}>
                            SUBMIT
                        </Button>
                    </form>
                )}
            </Formik>

            <Dialog 
                open={openDialog} 
                onClose={handleCloseDialog} 
                aria-labelledby="change-password-dialog"
                maxWidth="sm"
                fullWidth
                PaperProps={{ sx: { backgroundColor: colors.primary[400], borderRadius: '8px' }}}
            >
                {renderDialogContent()}
            </Dialog>
        </Box>
    )
}

export default ViewProfile;