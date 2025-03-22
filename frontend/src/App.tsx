import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NameForm from './NameForm';
import SignedUpForm from './SignedUpForm';
import Sorry from './Sorry';
import CookieRedirect from './CookieRedirect';
import DatesTable from './Dong';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CookieRedirect />} />
        <Route path="/start" element={<NameForm />} />
        <Route path="/signedup" element={<SignedUpForm />} />
        <Route path="/nope" element={<Sorry />} />
        <Route path="/gYBfRsgCgmoMybEk6eNzJ" element={<DatesTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
