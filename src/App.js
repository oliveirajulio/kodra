import './Styles.css'
import { TaskRefreshProvider } from './contexts/RefreshContext';
import Router from './router'


function App() {
  return (
    <TaskRefreshProvider>
      <Router/>
    </TaskRefreshProvider>
  );
}

export default App;
