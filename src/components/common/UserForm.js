import React from "react";
import { Field, reduxForm } from "redux-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const validate = values => {
  const errors = {};
  const requiredFields = [
    "name",
    "email",
    "gender",
    "status"
  ];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
    sx={{ mb: 2 }}
  />
);

const radioButton = ({
  input,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <FormControl
      error={touched && Boolean(error)}
      component="fieldset"
      sx={{ mb: 2 }}
    >
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup {...input} {...rest}>
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
      </RadioGroup>
      {renderFormHelper({ touched, error })}
    </FormControl>
  )
};

const renderFormHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
};

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl
    error={touched && Boolean(error)}
    fullWidth
  >
    <InputLabel htmlFor="color-native-simple">{label}</InputLabel>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name: input.name,
        id: "color-native-simple"
      }}
    >
      {children}
    </Select>
    {renderFormHelper({ touched, error })}
  </FormControl>
);

const UserForm = props => {
  const { handleSubmit, pristine, reset, submitting, classes } = props;

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit}>
            <div>
              <Field name="name" component={renderTextField} label="Name" />
            </div>
            <div>
              <Field name="email" component={renderTextField} label="Email" />
            </div>
            <div>
              <Field name="gender" component={radioButton}>
                <Radio value="male" label="male" />
                <Radio value="female" label="female" />
              </Field>
            </div>
            <div>
              <Field
                classes={classes}
                name="status"
                component={renderSelectField}
                label="Status"
              >
                <option value="" />
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Field>
            </div>
            <div />
            <Box
              sx={{
                width: "80%",
                margin: "auto",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <Button
                type="submit"
                disabled={pristine || submitting}
                variant="contained"
                sx={{ mt: 3, mr: 2 }}
              >
                Submit
              </Button>
              <Button
                type="button"
                disabled={pristine || submitting}
                onClick={reset}
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: "#808080",
                  "&:hover": {
                    backgroundColor: "#696969"
                  }
                }}
              >
                Clear
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default reduxForm({
  form: "UserForm",
  validate,
  enableReinitialize: true
})(UserForm);
