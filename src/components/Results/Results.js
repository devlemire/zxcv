import React, { Component } from 'react';
import { connect } from 'react-redux';
import CountUp from 'react-countup';
import { CATEGORIES, reset } from '../../ducks/reducer';
import courses from '../../utils/courses.json';

import './Results.css';

class Results extends Component {
  constructor( props ) {
    super( props );

    let categories = [ ...props.categories ];
    categories[0].value = 10;
    categories[1].value = 12;
    categories[2].value = 14;
    categories[3].value = 4;
    categories[4].value = 2;
    let value = -1;
    let selected = null;

    categories.forEach( ( category, i ) => {
      category.value = Math.floor( ( category.value / CATEGORIES[i].max ) * 100 );

      if ( category.value > value ) {
        selected = category.label;
        value = category.value;
      }
    });

    this.state = {
      selected,
      categories
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
    const { selected, categories } = this.state;

    return (
      <div className="Results__parent">
        <h1> Survey Results </h1>
        <h2>Click on different courses to learn more about them.</h2>

        <div className="Category__parent">
          {
            CATEGORIES.map( ( category, i ) => (
              <div className="Category__child"
                   key={ `category-child-${ i }` }
                   onClick={ () => this.setState({ selected: category.label }) }>

                <div className="Category__details">
                  <div className="Category__percent">
                    <CountUp start={0} end={ categories[i].value } />%
                  </div>
                  <span className="Category__label">{ category.display }</span>
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