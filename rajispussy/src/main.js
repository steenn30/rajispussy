import React from './runtime/react.js';
import { createRoot } from './runtime/react-dom.js';
import { BrowserRouter, Routes, Route } from './router/react-router-dom.js';
import HomePage from './components/HomePage.js';
import ScreenwriterProfileCustomerView from './components/ScreenwriterProfileCustomerView.js';
import { profiles } from './data/seed.js';

function ProfileWrapper({ params }) {
  const name = decodeURIComponent(params.name || '');
  const profile = profiles[name];
  return React.createElement(ScreenwriterProfileCustomerView, { profile });
}

function App() {
  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      Routes,
      null,
      React.createElement(Route, { path: '/', element: React.createElement(HomePage, null) }),
      React.createElement(Route, { path: '/profile/:name', element: React.createElement(ProfileWrapper, null) }),
    ),
  );
}

const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App, null));
