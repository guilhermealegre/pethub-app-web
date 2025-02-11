import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/de";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { PetHubLogo } from "../core/utils";

export interface AccuntInterface {
  first_name: string;
  last_name: string;
  date: string;
  country: number | string;
  city: number | string;
}

const OnboardingAccount = () => {
  const validationSchema = Yup.object({
    first_name: Yup.string().required("Field is required!"),
    last_name: Yup.string().required("Field is required!"),
    country: Yup.string().required("Field is required!"),
    city: Yup.string().required("Field is required!"),
    date: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      date: "",
      country: "",
      city: "",
    },
    validationSchema: validationSchema,
    onSubmit: (formValue: AccuntInterface) => {
      console.log("cenas");
      console.log(formValue);
    },
  });
  return (
    // <Container maxWidth="sm" className="py-28 px-24">
    <Container maxWidth="sm" sx={{ textAlign: "center", py: 5, mt: 5 }}>
      <PetHubLogo />
      <div className="pb-8">
        <Typography variant="h4" component="h2">
          Criar conta
        </Typography>
        <Typography variant="subtitle2" component="p">
          Está quase! Precisamos só de alguns detalhes.
        </Typography>
      </div>
      <form onSubmit={formik.handleSubmit} noValidate>
        <p className="pb-4 text-left">Qual o teu nome?</p>
        <div className="pb-8">
          <TextField
            id="first_name"
            label="Nome"
            name="first_name"
            type="text"
            placeholder="Nome"
            fullWidth
            variant="outlined"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.first_name && formik.errors.first_name ? true : undefined}
            helperText={formik.touched.first_name && formik.errors.first_name ? formik.errors.first_name : ""}
            required
          />
        </div>
        <div className="pb-8">
          <TextField
            id="last_name"
            label="Apelido"
            name="last_name"
            type="text"
            placeholder="Apelido"
            fullWidth
            variant="outlined"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.last_name && formik.errors.last_name ? true : undefined}
            helperText={
              formik.touched.last_name && formik.errors.last_name
                ? formik.errors.last_name
                : "Confirma que o nome corresponde ao do teu documento de identidade"
            }
            required
          />
        </div>
        <div className="pb-8">
          <TextField
            id="country"
            required
            label="País"
            name="country"
            select
            fullWidth
            // defaultValue=""
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.country && formik.errors.country ? true : undefined}
            helperText={formik.touched.country && formik.errors.country ? formik.errors.country : ""}
          >
            <MenuItem key={1} value={"c1"}>
              country1
            </MenuItem>
            <MenuItem key={2} value={"c2"}>
              country2
            </MenuItem>
            <MenuItem key={3} value={"c3"}>
              country3
            </MenuItem>
          </TextField>
        </div>
        <div className="pb-8">
          <TextField
            id="city"
            required
            label="Cidade"
            name="city"
            select
            fullWidth
            // defaultValue=""
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && formik.errors.city ? true : undefined}
            helperText={formik.touched.city && formik.errors.city ? formik.errors.city : ""}
          >
            <MenuItem key={1} value={"ct1"}>
              city1
            </MenuItem>
            <MenuItem key={2} value={"ct2"}>
              city2
            </MenuItem>
            <MenuItem key={3} value={"ct3"}>
              city3
            </MenuItem>
          </TextField>
        </div>
        <p className="pb-4 text-left">E data de nascimento?</p>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en"}>
          <DatePicker
            key="date"
            name="date"
            onChange={(value) => formik.setFieldValue("date", value?.toISOString())}
            className="w-full"
            format="DD/MM/YYYY"
          />
        </LocalizationProvider>

        <div className="pt-8">
          <Button type="submit" fullWidth color="primary" variant="contained">
            Continuar
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default OnboardingAccount;
