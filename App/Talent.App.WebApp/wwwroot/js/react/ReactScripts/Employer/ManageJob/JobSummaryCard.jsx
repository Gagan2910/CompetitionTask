import React from 'react';
import Cookies from 'js-cookie';
import {Card,Button,Icon, Label, Grid } from 'semantic-ui-react';
import { JobSummary } from '../CreateJob/JobSummary.jsx';
import { Popup } from 'semantic-ui-react';
import moment from 'moment';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectJob = this.selectJob.bind(this)
    }

    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        //url: 'http://localhost:51689/listing/listing/closeJob',
    }

    render() {
        return(
        <Card style={{height:350,width:400}}>
        <Card.Content>
          <Card.Header>{this.props.title}</Card.Header>
          <Label color="black" ribbon='right'><Icon name="user"/>{this.props.noOfSuggestions}</Label>
          <Card.Meta><p>{this.props.city},{this.props.country}</p></Card.Meta>
          <Card.Description>{this.props.summary}</Card.Description>
          </Card.Content><br/><br/>
          <Card.Content extra>
          <div>  
          <Label color='red' floated='left'>Expired</Label>
          <Button.Group floated='right'>
          <Button basic color='blue'>
          <Icon name="ban"/>Close
          </Button>
          <Button basic color='blue'>
          <Icon name="edit"/>Edit
          </Button>
          <Button basic color='blue'>
          <Icon name="copy"/>Copy
          </Button>
          </Button.Group>
          </div>
          </Card.Content>
        </Card>
        
        )
       
    }
}