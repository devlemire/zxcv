import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CountUp from 'react-countup';
import { reset } from '../../ducks/reducer';
import courses from '../../utils/courses.json';
import CIP from '../../utils/categoriesInPercent';
import sortCategories from '../../utils/sortCategories';
import calculateWidth from '../../utils/calculateWidth';

import './Results.css';

class Results extends Component {
  constructor( props ) {
    super( props );

    let categories = CIP( props.categories );
    let sortedCategories = sortCategories( categories );

    this.state = {
      selected: sortedCategories[0].label,
      percent: sortedCategories[0].value,
      categories: sortedCategories
    };

    this.updateSelected = this.updateSelected.bind( this );
    this.finishSurvey = this.finishSurvey.bind( this );
  }

  componentDidMount() {
    const { percent } = this.state;
    const { percent_meter } = this.refs;

    let appChildStyles = document.getElementById('App__child').style;
    appChildStyles.width = '100%';

    this.setState({ progressBarPixels: calculateWidth( percent, percent_meter.offsetWidth ) });
  }

  updateSelected( category ) {
    const { percent_meter } = this.refs;

    this.setState({ selected: category.label, 
                    percent: category.value, 
                    progressBarPixels: calculateWidth( category.value, percent_meter.offsetWidth ) });
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
          <h1>Survey Results</h1>
          <h2>Click on different courses to learn more about them.</h2>

          <div className="Category__parent">
            {
              categories.map( ( category, i ) => (
                <div className={ selected === category.label ? 'Category__child selected' : 'Category__child' }
                     key={ `category-child-${ i }` }
                     id={ `category-child-${ i }` }
                     onClick={ () => this.updateSelected( category ) }>

                  <div className={ selected === category.label ? 'Category__percent selected' : 'Category__percent' }>
                    <CountUp start={0} end={ categories[i].value } />%
                  </div>

                  <span className="Category__label">{ category.display }</span>
                </div>
              ))
            }
          </div>
          
          <div className="Selected__container">
            <h1> { courses[ selected ].title } </h1>

            <div className="Selected__percent-container">
              <span>Personality Match:</span><h3>{ percent }%</h3>
              <div ref="percent_meter" id="Selected__percent-meter">
                <div id="Selected__percent_filler" style={ { width: progressBarPixels } } />
              </div>
            </div>

            <div className="Selected__details-container">
              <p>Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nullam id dolor id nibh ultricies vehicula ut id elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>

              <p>Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nullam id dolor id nibh ultricies vehicula ut id elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>
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

Results.propTypes = {
  categories: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired
}