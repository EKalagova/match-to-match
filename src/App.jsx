import Form from './components/Form/Form'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import './App.css';

function App() {
  return (
    <ErrorBoundary >
      <Form />
    </ErrorBoundary>
  );
}

export default App;
