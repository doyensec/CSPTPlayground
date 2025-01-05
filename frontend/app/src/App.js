import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/Login';
import Notes from './components/Notes';
import Index from './components/Index';
import Files from './components/Files';
import FilesBypasses from './components/FilesBypasses';
import JSONP from './components/JSONP';
import OpenRedirect from './components/OpenRedirect';
import Users from './components/Users';
import VulnerableNotesPathParam from './components/VulnerableNotesPathParam';
import VulnerableNotesQueryParam from './components/VulnerableNotesQueryParam';
import VulnerableNotesFragmentParam from './components/VulnerableNotesFragmentParam';
import VulnerableNotesQueryParamXSS from './components/VulnerableNotesQueryParamXSS';
import VulnerableNotesAutoPostSink from './components/VulnerableNotesAutoPostSink';
import VulnerableNotesAutoGet2PostSink from './components/VulnerableNotesAutoGet2PostSink';
import VulnerableNotesScriptSinkXSS from './components/VulnerableNotesScriptSinkXSS';
import CSPTNavbar from './components/CSPTNavbar';



const App = () => {
  const [user, setUser] = useState('');

  return (
    <Router>
      <CSPTNavbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/notes" element={<Notes user={user} setUser={setUser} />} />
        <Route path="/gadget/files" element={<Files />} />
        <Route path="/gadget/files/bypasses" element={<FilesBypasses />} />
        <Route path="/gadget/JSONP" element={<JSONP />} />
        <Route path="/gadget/OpenRedirect" element={<OpenRedirect />} />
        <Route path="/vulnerable/note_path_param/:id/details" element={<VulnerableNotesPathParam />} />
        <Route path="/vulnerable/note_query_param" element={<VulnerableNotesQueryParam />} />
        <Route path="/vulnerable/note_fragment_param" element={<VulnerableNotesFragmentParam />} />
        <Route path="/vulnerable/note_query_param_xss" element={<VulnerableNotesQueryParamXSS />} />
        <Route path="/vulnerable/note_auto_post_sink/:id" element={<VulnerableNotesAutoPostSink />} />
        <Route path="/vulnerable/note_auto_get_to_post_sink/:id" element={<VulnerableNotesAutoGet2PostSink />} />
        <Route path="/vulnerable/note/note_script_sink_xss" element={<VulnerableNotesScriptSinkXSS />} />
      </Routes>
    </Router>


  );
};

export default App;