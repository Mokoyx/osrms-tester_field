import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
function DashboardTables() {
  const [data, setData] = useState({
    pgts: {},
    stewardship: {},
    ministerial_spouses: {}
  });

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, 'report');

    // Subscribe to Realtime Database and listen for updates
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const reportData = snapshot.val();
        // Assume latest data is what we need or process to find latest
        const latestKey = Object.keys(reportData).pop();
        const latestData = reportData[latestKey];

        setData({
          pgts: latestData.pgts || {},
          stewardship: latestData.stewardship || {},
          ministerial_spouses: latestData.ministerial_spouses || {}
        });
      } else {
        console.log("No data available");
      }
    });

    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, []);

  // Component to render data in a table
  function DataTable({ data, title }) {
    return (
      <TableContainer component={Paper} sx={{ margin: '20px', width: 'auto' }}>
        <Table sx={{ minWidth: 300 }} aria-label={title}>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell align="left">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(data).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  {key} {/* You can map IDs to labels here if needed */}
                </TableCell>
                <TableCell align="left">{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <div style={{ marginLeft:'20px' }}>
      <h2>Planned Giving and Trust Services</h2>
      <DataTable data={data.pgts} title="Planned Giving and Trust Services" />

      <h2>Stewardship</h2>
      <DataTable data={data.stewardship} title="Stewardship" />

      <h2>Ministerial Spouses</h2>
      <DataTable data={data.ministerial_spouses} title="Ministerial Spouses" />
    </div>
  );
}

export default DashboardTables;
