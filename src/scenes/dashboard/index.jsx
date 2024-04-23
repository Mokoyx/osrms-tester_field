import React from 'react';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';
import { Formik, Form, Field } from 'formik';
import { getDatabase, ref, push, set } from "firebase/database";
import { stewardship, pgts, ministerial_spouses } from '../../data/sampleData';
import '../../config/firebase'; // Ensure this correctly initializes Firebase
import Header from '../../components/Header';
import { Box, Button, TextField } from "@mui/material";
import SubTitles from '../../components/SubTitles';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const db = getDatabase();

  const saveDataToRealtimeDatabase = async (values) => {
    const dbRef = ref(db, 'report');
    try {
      const newReportRef = push(dbRef);
      await set(newReportRef, {
        pgts: {
          ...pgts.reduce((acc, curr) => {
            acc[curr.id] = values[curr.id] || 0; // Default to 0 if not provided
            return acc;
          }, {}),
        },
        stewardship: {
          ...stewardship.reduce((acc, curr) => {
            acc[curr.id] = values[curr.id] || 0; // Default to 0 if not provided
            return acc;
          }, {}),
        },
        ministerial_spouses: {
          ...ministerial_spouses.reduce((acc, curr) => {
            acc[curr.id] = values[curr.id] || 0; // Default to 0 if not provided
            return acc;
          }, {}),
        },
      });
      console.log("Data written to Realtime Database");
    } catch (error) {
      console.error("Error writing data to Realtime Database:", error);
    }
  };

  return (
    <div className="Dashboard" style={{ color: colors.primary, marginRight: 40, marginLeft: 20 }}>
      <Header
        title="DASHBOARD"
        subtitle="Create a New Department Report"
      />
      <Formik
        initialValues={{
          ...stewardship.reduce((acc, curr) => {
            acc[curr.id] = '';
            return acc;
          }, {}),
          ...pgts.reduce((acc, curr) => {
            acc[curr.id] = '';
            return acc;
          }, {}),
          ...ministerial_spouses.reduce((acc, curr) => {
            acc[curr.id] = '';
            return acc;
          }, {})
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          saveDataToRealtimeDatabase(values);
          resetForm();
          setSubmitting(false);
        }}
        validate={(values) => {
          const errors = {};
          [...stewardship, ...pgts, ...ministerial_spouses].forEach(({ id, label }) => {
            if (!values[id]) {
              errors[id] = `${label} is required`;
            } else if (isNaN(Number(values[id]))) {
              errors[id] = `${label} must be a number`;
            }
          });
          return errors;
        }}
      >
        {({ isSubmitting }) => (
          <Form style={{ marginTop: 20 }}>
            <Box display="flex" flexDirection="column" mt="20px">
            <SubTitles subtitleCategory="Stewardship" />
              {stewardship.map(({ id, label }) => (
                <FieldComponent key={id} id={id} label={label} isSubmitting={isSubmitting} colors={colors} theme={theme} />
              ))}

              <SubTitles subtitleCategory="Planned Giving and Trust Services" />
              {pgts.map(({ id, label }) => (
                <FieldComponent key={id} id={id} label={label} isSubmitting={isSubmitting} colors={colors} theme={theme} />
              ))}

              <SubTitles subtitleCategory="Ministerial Spouses" />
              {ministerial_spouses.map(({ id, label }) => (
                <FieldComponent key={id} id={id} label={label} isSubmitting={isSubmitting} colors={colors} theme={theme} />
              ))}
              <Button
                type="submit"
                disabled={isSubmitting}
                style={{
                  marginTop: '20px',
                  padding: '10px 10px',
                  fontSize: theme.typography.h5.fontSize,
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: colors.greenAccent[400],
                  color: '#fff',
                  cursor: 'pointer',
                  marginBottom: '20px',
                }}
              >
                {isSubmitting ? 'Submitting Data...' : 'Submit Data'}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

// Refactor repeated Field code into a separate component
const FieldComponent = ({ id, label, isSubmitting, colors, theme }) => (
  <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
    <label htmlFor={id} style={{ fontSize: theme.typography.h4.fontSize, marginRight: '10px', textAlign: 'right', color: theme.palette.text.primary }}>{label}</label>
    <Field name={id}>
      {({ field, form: { touched, errors } }) => (
        <TextField
          {...field}
          type="number"
          variant="filled"
          fullWidth
          disabled={isSubmitting}
          label={label}
          id={id}
          error={Boolean(touched[id] && errors[id])}
          helperText={touched[id] && errors[id]}
          sx={{
            width:'400px',
            '& .MuiInputBase-input': {  // Targeting the input element specifically
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // Conditionally setting the text color based on theme mode
            }
          }}
        />
      )}
    </Field>
  </div>
);


export default Dashboard;
