import './App.css';
import 'antd/dist/antd.min.css';
import './assets/css/global.scss';

import { Example } from './pages/Example/Example';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/example" exact component={Example} />

          <Route path="/" exact>
            <Redirect to="/example" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
