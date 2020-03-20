import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import {Card,Pagination,Button,Icon,Grid } from 'semantic-ui-react';
import { jobCategories } from '../common.js';


class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs:[],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showExpired: true,
                showUnexpired: true,
            },
            totalPages: 1,
            activeIndex: "",
            showCards:false
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        //your functions go here
        this.handleFilter=this.handleFilter.bind(this);
        this.handleSort=this.handleSort.bind(this);
        this.handlePageChange=this.handlePageChange.bind(this);
       
        
        
    };

    handleFilter({target}){
        console.log("filter value " + target.value);
        switch (target.value) {
            case "Active":
                this.setState((state) => ({
                    filter: Object.assign(state.filter, {showActive:true,showClosed:false,showExpired: true, showUnexpired:true})
                }),()=>this.loadData(),console.log(
                    "Active : " +
                      this.state.filter.showActive +
                      " Closed : " +
                      this.state.filter.showClosed +
                      " Expired : " +
                      this.state.filter.showExpired +
                      " UnExpired : " +
                      this.state.filter.showUnexpired
                  ));
            break;
            case "Closed":                         
                this.setState(state=>({
                    filter: Object.assign(state.filter, {showActive:false,showClosed:true,showExpired: true, showUnexpired:true})
                }),()=>this.loadData(),
                console.log(
                    "Active : " +
                      this.state.filter.showActive +
                      " Closed : " +
                      this.state.filter.showClosed +
                      " Expired : " +
                      this.state.filter.showExpired +
                      " UnExpired : " +
                      this.state.filter.showUnexpired
                  ));
            break;
            case "Expired":
                this.setState(state=>({
                    filter:Object.assign(state.filter, {showActive: true, showClosed: true, showExpired: true, showUnexpired: false})               
                 }),()=>this.loadData(),
                 console.log(
                    "Active : " +
                      this.state.filter.showActive +
                      " Closed : " +
                      this.state.filter.showClosed +
                      " Expired : " +
                      this.state.filter.showExpired +
                      " UnExpired : " +
                      this.state.filter.showUnexpired
                  ));
            break;
            case "Unexpired":
                this.setState(state => ({
                    filter: Object.assign(state.filter, { showActive: true, showClosed: true, showExpired: false, showUnexpired: true })
                }),()=>this.loadData(),
                console.log(
                    "Active : " +
                      this.state.filter.showActive +
                      " Closed : " +
                      this.state.filter.showClosed +
                      " Expired : " +
                      this.state.filter.showExpired +
                      " UnExpired : " +
                      this.state.filter.showUnexpired
                  ));
            break;
            default:
                break;
        }
    }

    handleSort(){
        this.setState(state=>({
            sortBy:Object.assign(state.sortBy, {date:'asc'})               
         }),()=>this.loadData(),
         console.log(
            "Newest First : " +
              this.state.sortBy.date
          ));
         }
    
    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        // this.setState({ loaderData })
        //)
        
       // console.log(this.state.loaderData)
    }

    componentDidMount() {
       this.init();
       this.loadData();
    };

    loadData() {
       var link = `http://localhost:51689/listing/listing/getSortedEmployerJobs?activePage=${this.state.activePage}&sortbyDate=${this.state.sortBy.date}&showActive=${this.state.filter.showActive}&showClosed=${this.state.filter.showClosed}&showExpired=${this.state.filter.showExpired}&showUnexpired=${this.state.filter.showUnexpired}`;
        var cookies = Cookies.get('talentAuthToken');
       // your ajax call and other logic goes here
       $.ajax({
        url: link,
        headers: {
            'Authorization': 'Bearer ' + cookies,
            'Content-Type': 'application/json'
        }, type: "GET",
        contentType: "application/json",
        dataType: "json",
        //data:jobData,
        success: function (res) {
                if (res.success==true) {
                    this.setState({ loadJobs: res.myJobs, totalPages:res.totalCount})
                    this.setState({showCards:true})
                }
                }.bind(this),
                error: function (res) {
                    console.log(res.status)
                }
            }) 
}
loadNewData(data) {
    var loader = this.state.loaderData;
    loader.isLoading = true;
    data[loaderData] = loader;
    this.setState(data, () => {
        this.loadData(() => {
            loader.isLoading = false;
            this.setState({
                loadData: loader
                },console.log(loaderData))
            })
        });
    }
handlePageChange(event,data){
       console.log(data)
       this.setState({
        activePage: data.activePage
    },()=>this.loadData())
    }



render() {
       const {loadJobs}=this.state;
       const numberPages=Math.floor(this.state.totalPages/2);
       return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
             <div className="ui container" >
                    <div>
                        <h2>List of Jobs</h2>
                    </div><br/>
                    <div>
                    <Icon name="filter"/>Filter:&nbsp;
                    <select style={{border:"none"}} onChange={this.handleFilter}>
                    <option defaultValue>Choose filter</option>
                    <option>Active</option>
                    <option>Closed</option>
                    <option>Expired</option>
                    <option>Unexpired</option>
                    </select>
                    
                    <Icon name="calendar alternate"/>Sort by date&nbsp;
                    <select style={{border:"none"}} onChange={this.handleSort}>
                    <option defaultValue>Newest first</option>
                    <option>Newest first</option>
                    </select>
                    </div><br/>
                   
                    {this.state.showCards?<div><Card.Group itemsPerRow={2}>{loadJobs.map(jobs =><JobSummaryCard key={jobs.id} title={jobs.title} 
                            city={jobs.location.city} country={jobs.location.country} summary={jobs.summary} noOfSuggestions={jobs.noOfSuggestions} expiryDate={jobs.expiryDate}/>)}
                            </Card.Group></div>:<h4>No Jobs found</h4>}

                    <br/><br/>

                    <Grid centered>
                    {this.state.showCards?<Pagination totalPages={numberPages} onPageChange={this.handlePageChange} defaultActivePage={1}/>
                    :<Pagination totalPages={0}/>}
                    </Grid>
                    <br/><br/>
                </div>
            </BodyWrapper>
        )
    }
}
export default ManageJob;

