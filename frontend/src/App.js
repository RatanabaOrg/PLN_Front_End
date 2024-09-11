import AccessHistory from './pages/accessHistory';
import ModalProvider from './contexts/modal';

function App() {
  return (
    <ModalProvider>
      <AccessHistory/>
    </ModalProvider>
  );
}

export default App;
