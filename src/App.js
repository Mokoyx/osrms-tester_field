import {Routes, Route, Outlet} from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import LoginForm from "./auth/index";
import Dashboard from "./scenes/dashboard";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import ReportView from "./scenes/reportview";


function App() {
  const [theme, colorMode] = useMode();
  const PrivateRoute=()=>{
    return(
      <>
      <Sidebar/>
      <main className="content">
        <Topbar/>
          <Outlet />
        </main>
      </>
    );
  };


  return(
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        <Routes>
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/" element={<PrivateRoute/>}>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/reportview" element={<ReportView/>}/>
          </Route>

        </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
  

}
export default App;