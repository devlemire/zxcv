import React, { Component } from 'react';
import { connect } from 'react-redux';
import CountUp from 'react-countup';
import { CATEGORIES, reset } from '../../ducks/reducer';
import courses from '../../utils/courses.json';
import determineSelectedAndPercent from '../../utils/determineSelectedAndPercent';
import calculateWidth from '../../utils/calculateWidth';

import './Results.css';

class Results extends Component {
  constructor( props ) {
    super( props );

    let categories = [ ...props.categories ];

    this.state = determineSelectedAndPercent( categories, CATEGORIES );
    this.updateSelected = this.updateSelected.bind( this );
    this.finishSurvey = this.finishSurvey.bind( this );
  }

  componentDidMount() {
    const { percent } = this.state;

    let appChildStyles = document.getElementById('App__child').style;
    appChildStyles.width = '100%';

    this.setState({ progressBarPixels: calculateWidth( percent, this.refs.percent_meter.offsetWidth ) });
  }

  updateSelected( category ) {
    this.setState({ selected: category.label, percent: category.value, progressBarPixels: calculateWidth( category.value, this.refs.percent_meter.offsetWidth ) });
  }

  finishSurvey() {
    const { history, reset } = this.props;
    reset();
    history.push('/');
  }

  render() {
    const { selected, percent, categories, progressBarPixels } = this.state;

    return (
      <div className="Results__parent">
        <div className="Results__child">
          <h1> Survey Results </h1>
          <h2>Click on different courses to learn more about them.</h2>

          <div className="Category__parent">
            {
              CATEGORIES.map( ( category, i ) => (
                <div className={ selected === category.label ? 'Category__child selected' : 'Category__child' }
                    key={ `category-child-${ i }` }
                    id={ `category-child-${ i }` }
                    onClick={ () => this.updateSelected( category ) }>

                  <div className="Category__percent">
                    <CountUp start={0} end={ categories[i].value } />%
                  </div>

                  <span className="Category__label">{ category.display }</span>
                </div>
              ))
            }
          </div>
          
          <div className="Selected__container">
            <div className="Selected__header-container">
              <h1> { courses[ selected ].title } </h1>
            </div>

            <div className="Selected__percent-container">
              <span>Personality Match:</span><h3>{ percent }%</h3>
              <div ref="percent_meter" id="Selected__percent-meter">
                <div id="Selected__percent_filler" style={ { width: progressBarPixels } } />
              </div>
            </div>

            <div className="Selected__details-container">

            </div>

            <div className="Selected__finish-container">
              <button onClick={ this.finishSurvey }>Finish Survey</button>
            </div>
          </div>

          <div className="Results__lightest-blue-bg" />
          <div className="Results__light-blue-bg" />
          <div className="Results__dark-blue-bg" />
        </div>
      </div>
    )
  }
}

function mapStateToProps( state ) {
  return {
    categories: state.categories
  }
}

export default connect( mapStateToProps, { reset } )( Results );