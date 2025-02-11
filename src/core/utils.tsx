// import AsyncStorage from "@react-native-async-storage/async-storage";

import Box from "@mui/material/Box";
import { PetHubIcon } from "../components/customIcons";
import Typography from "@mui/material/Typography";

export const PetHubLogo = () => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4, justifyContent: "center" }}>
    <PetHubIcon />
    <Typography
      variant="h5"
      sx={{
        color: "#617AFF",
        fontWeight: "bold",
        fontSize: "24px",
      }}
    >
      Pethub
    </Typography>
  </Box>
);

export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "Email cannot be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";

  return "";
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return "Password cannot be empty.";

  return "";
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) return "Name cannot be empty.";

  return "";
};

export const codeValidator = (code: string) => {
  if (!code || code.length <= 0) return "Code cannot be empty.";

  return "";
};

// // export const storeData = async (value: string) => {
// export const storeData = (value: string) => {
//   AsyncStorage.setItem("user-token", value);
//   // try {
//   //   await AsyncStorage.setItem("user-token", value);
//   // } catch (e) {
//   //   // saving error
//   // }
// };

// // export const getStoredData = async (key?: string): Promise<string | null> => {
// //   return await AsyncStorage.getItem("user-token");
// //   // try {
// //   //   const value = await AsyncStorage.getItem("user-token");
// //   //   if (value !== null) {
// //   //     // value previously stored
// //   //     console.log(value);
// //   //     return value;
// //   //   }
// //   //   return '';
// //   // } catch (e) {
// //   //   return '';
// //   //   // error reading value
// //   // }
// // };
// export const getStoredData = async (key?: string): Promise<string | null> => {
//   let value = "";
//   await AsyncStorage.getItem("user-token").then((res) => {
//     if (res) value = res;
//   });

//   return value;
//   // try {
//   //   const value = await AsyncStorage.getItem("user-token");
//   //   if (value !== null) {
//   //     // value previously stored
//   //     console.log(value);
//   //     return value;
//   //   }
//   //   return '';
//   // } catch (e) {
//   //   return '';
//   //   // error reading value
//   // }
// };

// export const clearData = async () => {
//   await AsyncStorage.removeItem("user-token");
// };
