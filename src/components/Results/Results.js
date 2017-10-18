import React, { Component } from 'react';
import { connect } from 'react-redux';
import CountUp from 'react-countup';
import { CATEGORIES, reset } from '../../ducks/reducer';
import courses from '../../utils/courses.json';

import './Results.css';

class Results extends Component {
  constructor( props ) {
    super( props );

    let { categories } = props;
    categories[0].value = 10;
    categories[1].value = 82;
    categories[2].value = 34;
    categories[3].value = 72;
    categories[4].value = 100;

    let value = -1;
    let selected = null;

    props.categories.forEach( category => {
      if ( category.value > value ) {
        selected = category.label;
      }
    });

    this.state = {
      selected
    };

    this.finishSurvey = this.finishSurvey.bind( this );
  }

  componentDidMount() {
    const { categories } = this.props;

    let appChildStyles = document.getElementById('App__child').style;
    appChildStyles.width = '100%';

    for( var i = 0; i < CATEGORIES.length; i++ ) {
      let styles = document.getElementById(`category-percent-${ i }`).style;
      styles.height = `${ categories[i].value }%`;
    }
  }

  finishSurvey() {
    const { history, reset } = this.props;
    reset();
    history.push('/');
  }

  render() {
    const { categories } = this.props;
    const { selected } = this.state;

    return (
      <div className="Results__parent">
        <h1> Survey Results </h1>

        <div className="Category__parent">
          {
            CATEGORIES.map( ( category, i ) => (
              <div className="Category__child"
                   key={ `category-child-${ i }` }
                   onClick={ () => this.setState({ selected: category.label }) }>

                <div className="Category__details">
                  <div>
                    <CountUp start={0} end={ categories[i].value } />%
                  </div>
                  <span>{ category.display }</span>
                </div>
                
                <div className={ selected === category.label ? 'Category__bg-fill selected' : 'Category__bg-fill' }
                     id={ `category-percent-${ i }` } />
              </div>
            ))
          }
        </div>
        
        <div className="Results__selected-category">
          <h1> { courses[ selected ].title } </h1>
          <button onClick={ this.finishSurvey }>Finish Survey</button>
        </div>

        <div className="Results__lightest-blue-bg" />
        <div className="Results__light-blue-bg" />
        <div className="Results__dark-blue-bg" />
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