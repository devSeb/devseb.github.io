import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';

import Chart from 'chart.js/src/chart.js';

/** Components **/
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';

/** private Components **/
import LineChartJsCustom from '../components/LineChartjsCustom/LineChartJsCustom';
import SideBarLeft from '../components/SideBar/Left/SideBarLeft';


class ChartJs extends Component {

    static propTypes = {};

    constructor() {
        super();
        this.state = {
            selectedElement : null,
            sideBarLeftDisplay: false
        }
    }

    test( activePoints) {
        let index = activePoints[0]._index;
        let colorElementSelected = activePoints[0]._model.backgroundColor;
        let nameElementSelected = activePoints[0]._model.label;
        let objElementSelected = {index: index, color: colorElementSelected, name: nameElementSelected};
        this.setState( {selectedElement: objElementSelected} );

    }

    onClickSideBarLeft () {
        var self = this;
        this.setState( {sideBarLeftDisplay : !self.state.sideBarLeftDisplay} );
    }

    componentDidMount () {
        require('./ChartJs.css');
        var self = this;
        $(function() {
            /** First chart **/
            var canvas1 = $('<canvas/>', { id: 'myChart', height: 700, width: 700});
            canvas1.css('border', 'solid 0px red');
            $('#element').append(canvas1);


            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Products Red", "Products Blue", "Products Yellow", "Products Green", "Products Purple", "Products Orange"],
                    datasets: [{
                        label: '# of Sales of this month',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    title: {
                        display: false,
                        text: 'Sales products',
                        fontSize: 20,
                        fontStyle: "bold"
                    },
                    legend: {
                        display: true,
                        labels: {
                            fontColor: 'rgb(255, 99, 132)',
                            fontSize: 10
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
            $("#myChart").click(
                function(evt){
                    let activePoints = myChart.getElementsAtEvent(evt);
                    self.test(activePoints);
                }
            );
        });
    }

    render() {

        var activeNavBar = "Projects";
        return(
            <div className="chart-js">
                <div>
                    <NavBar active={activeNavBar}/>
                </div>

                <div className="header">
                    <h4><a href="#" onClick={this.onClickSideBarLeft.bind(this)}><i className="glyphicon glyphicon-menu-hamburger"> Global Informations </i> </a></h4>
                    {this.state.sideBarLeftDisplay &&
                        <SideBarLeft />
                    }
                </div>
                <br/>
                <br/>
                <div className={ (this.state.sideBarLeftDisplay) ? "margin text-center" : "text-center"}>
                    <div className="container">
                        <h2>ChartJs Project</h2>

                        <div className="container ">
                            <div className="row text-center">
                                <div className="col-sm-12" id="element"></div>
                            </div>
                        </div>

                        {this.state.selectedElement &&
                        <div className="container">
                            <LineChartJsCustom selectedElement={this.state.selectedElement}/>
                        </div>
                        }
                    </div>
                </div>

                <div>
                    <Footer />
                </div>
            </div>
        );
    }
}
export default ChartJs;
