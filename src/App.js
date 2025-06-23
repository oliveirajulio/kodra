import './Styles.css'
import { TaskRefreshProvider } from './contexts/RefreshContext';
import { ToastContainer } from 'react-toastify';
import Router from './router'


function App() {
  return (
    <TaskRefreshProvider>
      <Router/>
      <ToastContainer/>
    </TaskRefreshProvider>
  );
}

export default App;
