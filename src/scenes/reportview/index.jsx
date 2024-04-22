import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { getDatabase, ref, onValue } from "firebase/database";
import { stewardship, pgts, ministerial_spouses } from '../../data/sampleData';
import Header from '../../components/Header';

const ReportView = () => {
  const theme = useTheme();
  const db = getDatabase();
  const [firebaseData, setFirebaseData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch data from Firebase Realtime Database
  useEffect(() => {
    const dbRef = ref(db, 'report');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val() || {};
      console.log("Firebase Data:", data); // Log fetched data
      setFirebaseData(data);
      setLoading(false); // Set loading to false once data is fetched
    });
  }, [db]);
  

  // Prepare columns for DataGrid
  const columns = [
    { field: 'id', headerName:'INPUT DATA',width:200 },
    { field: 'label', headerName: 'Label', width: 200 },
    { field: 'value', headerName: 'Value', width: 200 },
  ];

  // Function to render a DataGrid for a department
  const renderDepartmentGrid = (departmentData) => {
    const rows = [];
    departmentData.forEach(({ id, label }) => {
      const value = firebaseData && firebaseData['report'] && firebaseData['report']['-M1234567890abcd'] && firebaseData['report']['-M1234567890abcd'][id] ? firebaseData['report']['-M1234567890abcd'][id] : '';
      rows.push({ id, label, value });
    });

    return (
      <div style={{ height: 400, width: '100%', marginBottom: '20px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
    );
  };

  return (
    <div className="ReportView" style={{ color: theme.palette.primary.main, marginRight: 40, marginLeft: 20 }}>
      <Header
        title="ReportView"
        subtitle="Create a New Department Report"
      />
      {loading ? ( // Display loading indicator while fetching data
        <div>Loading...</div>
      ) : (
        <>
          {/* Render DataGrid for each department */}
          <div>
            <h2>Stewardship Department</h2>
            {renderDepartmentGrid(stewardship)}
          </div>
          <div>
            <h2>Planned Giving and Trust Services Department</h2>
            {renderDepartmentGrid(pgts)}
          </div>
          <div>
            <h2>Ministerial Spouses Association</h2>
            {renderDepartmentGrid(ministerial_spouses)}
          </div>
        </>
      )}
    </div>
  );
};

export default ReportView;
