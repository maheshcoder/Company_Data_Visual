import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../Pages/Dashboard';
import Table1 from '../../Pages/Table1';
import Table2 from '../../Pages/Table2';
import Table3 from '../../Pages/Table3';
import Table4 from '../../Pages/Table4';
import Table5 from '../../Pages/Table5';
import Graph from '../../Pages/Graph'; // Import the Graph component

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/table1" element={<Table1 />} />
      <Route path="/table2" element={<Table2 />} />
      <Route path="/table3" element={<Table3 />} />
      <Route path="/table4" element={<Table4 />} />
      <Route path="/table5" element={<Table5 />} />
      <Route path="/graph" element={<Graph />} /> {/* Add the route for the graph page */}
    </Routes>
  );
}

export default AppRoutes;
