import React from 'react';
import { Grid } from 'semantic-ui-react';
import MainHeader from './MainHeader/MainHeader';
import ChartPanel from './ChartPanel/ChartPanel';
import { withRouter } from 'react-router-dom';
function App(props) {
  return (
    <Grid padded>
      <Grid.Row>
        <Grid.Column>
        <MainHeader {...props}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
        <ChartPanel {...props}/>
        </Grid.Column>
      </Grid.Row>
      </Grid>
    )
}

export default withRouter(App);
