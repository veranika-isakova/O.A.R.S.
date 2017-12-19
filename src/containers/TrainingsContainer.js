import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {GridList, GridTile} from 'material-ui/GridList';
import Training from './Training.js'
import {fetchTrainings} from '../actions/training/fetch'
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import googleMaps from '../img/googleMaps.png'
const styles = {
root: {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
},
gridList: {
  width: 500,
  height: 450,
  overflowY: 'auto',
},
};


export class TrainingsContainer extends PureComponent {

  componentWillMount() {
     this.props.fetchTrainings()
   }

   renderTraining = (training, index) => {
      return <Training
        key={index} { ...training } />
    }

  render() {
    const { trainings } = this.props

    return (
      <div style={styles.root}>
        <GridList
          cellHeight={180}
          style={styles.gridList}
        >
          <Subheader>Training</Subheader>
          {trainings.map((training) =>
            <GridTile
              key={training.id}
              title={training.startdate}
              subtitle={<span>Start Time: <b>{training.starttime}</b></span>}
              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
            >
              <img src={ googleMaps } />
            </GridTile>
          )}
        </GridList>
      </div>

      )
    }
}

const mapStateToProps = ({ trainings }) => ({ trainings })

export default connect(mapStateToProps, {fetchTrainings, push})(TrainingsContainer)
