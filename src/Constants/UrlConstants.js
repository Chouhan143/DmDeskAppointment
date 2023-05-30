export const UrlConstants = {
    Base_Url: "https://srninfotech.com/projects/dmdesk_steno",
};

export const Forgot_Password = UrlConstants.Base_Url + `/forgetPassword`;
export const Login = UrlConstants.Base_Url + `/login`;
export const NewLoginUrl =UrlConstants.Base_Url +`/newLogin`;
export const NewLogoutUrl =UrlConstants.Base_Url +`/newLogout`;
export const Get_Appointment_Data = UrlConstants.Base_Url + `/getAppointmentData`;
export const Post_Appointment_Data = UrlConstants.Base_Url +  `/insertAppointmentData`;
export const Update_Appointment_Data = UrlConstants.Base_Url +  `/updateAppointmentData`;
export const Insert_Data = UrlConstants.Base_Url + `/insertData`;
export const Update_Status = UrlConstants.Base_Url + `/updateStatus`;
export const Post_Email_Otp = UrlConstants.Base_Url + `/emailForOtp`;
export const Get_Appointment_Data_by_id = UrlConstants.Base_Url + `/getBookedAppointmentData?id=`;
export const Confirm_Status = UrlConstants.Base_Url+`/paConfirm`;



// for steno 
export const Post_Appointment_Data_Steno = UrlConstants.Base_Url +  `/stenoAppointment`;
export const Get_Appointment_DataBy_Steno = UrlConstants.Base_Url + `/getAppointmentBySteno`;

export const Update_Appointment_Data_By_Steno = UrlConstants.Base_Url + `/editAppointmentBySteno`;
export const Update_StatusSteno = UrlConstants.Base_Url + `/updateStenoStatus`;
export const getSingleStenoAppointment = UrlConstants.Base_Url + `/getSingleStenoAppointment?id=`;
