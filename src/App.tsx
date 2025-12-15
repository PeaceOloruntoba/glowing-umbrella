import { Container } from '@mantine/core';
import AutomationRules from './components/AutomationRule';

function App() {
  return (
    <Container size="md" className="app">
      <h1>Automation Rules</h1>
      <AutomationRules />
    </Container>
  );
}

export default App;