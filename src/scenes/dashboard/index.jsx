import React from 'react';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { getDatabase, ref, push, set } from "firebase/database";
import { stewardship, pgts,ministerial_spouses } from '../../data/sampleData';
import '../../config/firebase';
import Header from '../../components/Header';
import { Box, Button, TextField } from "@mui/material";

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
            acc[curr.id] = values[curr.id];
            return acc;
          }, {}),
        },
        stewardship: {
          ...stewardship.reduce((acc, curr) => {
            acc[curr.id] = values[curr.id];
            return acc;
          }, {}),
        },
        ministerial_spouses: {
          ...ministerial_spouses.reduce((acc, curr) => {
            acc[curr.id] = values[curr.id];
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
    <div className="Dashboard" style={{ color: colors.primary, marginRight: 40, marginLeft:20 }}>
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
          }, {})
        }}
        onSubmit={(values, { resetForm }) => {
          saveDataToRealtimeDatabase(values);
          resetForm();
        }}
        validate={(values) => {
          const errors = {};
          [...stewardship, ...pgts].forEach(({ id, label }) => {
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
  <h2 style={{ fontSize: theme.typography.h2.fontSize }}>stewardship</h2>
  {stewardship.map(({ id, label }) => (
    <div key={id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <label style={{ fontSize: theme.typography.h4.fontSize, marginRight: '10px', textAlign: 'right' }}>{label}</label>
      <Field name={id}>
        {({ field }) => (
          <TextField
            fullWidth
            type="number"
            id={id}
            style={{
              fontSize: theme.typography.h5.fontSize,
              borderRadius: '5px',
              backgroundColor: '#fcfcfc',
              border: `1px solid ${colors.primary[600]}`,
              width: '400px',
            }}
            {...field}
            disabled={isSubmitting}
            pattern="[0-9]*"
          />
        )}
      </Field>
      <ErrorMessage name={id} component="div" style={{ color: 'red', fontSize: theme.typography.h6.fontSize }} />
    </div>
  ))}
</Box>

<Box display="flex" flexDirection="column" mt="20px">
  <h2 style={{ fontSize: theme.typography.h2.fontSize }}>Planned Giving and Trust Services</h2>
  {pgts.map(({ id, label }) => (
    <div key={id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <label style={{ fontSize: theme.typography.h4.fontSize, marginRight: '10px', textAlign: 'right' }}>{label}</label>
      <Field name={id}>
        {({ field }) => (
          <TextField
            fullWidth
            type="number"
            id={id}
            style={{
              fontSize: theme.typography.h5.fontSize,
              borderRadius: '5px',
              backgroundColor: '#fcfcfc',
              border: `1px solid ${colors.primary[600]}`,
              width: '400px',
            }}
            {...field}
            disabled={isSubmitting}
            pattern="[0-9]*"
          />
        )}
      </Field>
      <ErrorMessage name={id} component="div" style={{ color: 'red', fontSize: theme.typography.h6.fontSize }} />
    </div>
  ))}
</Box>

<Box display="flex" flexDirection="column" mt="20px">
  <h2 style={{ fontSize: theme.typography.h2.fontSize }}>Ministerial Spouses Association</h2>
  {ministerial_spouses.map(({ id, label }) => (
    <div key={id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <label style={{ fontSize: theme.typography.h4.fontSize, marginRight: '10px', textAlign: 'right' }}>{label}</label>
      <Field name={id}>
        {({ field }) => (
          <TextField
            fullWidth
            type="number"
            id={id}
            style={{
              fontSize: theme.typography.h5.fontSize,
              borderRadius: '5px',
              backgroundColor: '#fcfcfc',
              border: `1px solid ${colors.primary[600]}`,
              width: '400px',
            }}
            {...field}
            disabled={isSubmitting}
            pattern="[0-9]*"
          />
        )}
      </Field>
      <ErrorMessage name={id} component="div" style={{ color: 'red', fontSize: theme.typography.h6.fontSize }} />
    </div>
  ))}
</Box>

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
                marginBottom:'20px',
              }}
            >
              {isSubmitting ? 'Saving...' : 'Save to Realtime Database'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};


export default Dashboard;
