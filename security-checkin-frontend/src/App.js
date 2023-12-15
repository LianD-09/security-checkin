import * as React from 'react';
import LoadingModal from './components/modal/LoadingModal';
import Router from './router';
import Modal from 'react-modal';

Modal.setAppElement('#root')

function App() {
  return (
    <React.Fragment>
      <Router />
      <LoadingModal />
    </React.Fragment>
  );
}

export default App;
