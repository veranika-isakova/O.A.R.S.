import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneShip } from '../actions/ships/fetch'
import Title from '../components/Title'
import {Table,TableBody, TableHeader,  TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton'
import Info from 'react-material-icons/icons/action/info'

class ShipPage extends PureComponent {

  componentWillMount() {
    const { shipId } = this.props.match.params
      this.props.fetchOneShip(shipId)
  }

  linkToBoat = ( trainingId, boatNumber ) => event => this.props.push(`/boats-path/${trainingId}/${boatNumber}`)

  renderShip = (ship, index) => {
    return (
       <TableRow key={index}>
        <TableRowColumn>{ship.TrainingId}</TableRowColumn>
        <TableRowColumn>{ship.startdate}</TableRowColumn>
        <TableRowColumn>{ship.starttime}</TableRowColumn>
        <TableRowColumn>{ship.boat_number}</TableRowColumn>
        <TableRowColumn><IconButton onClick={this.linkToBoat(ship.TrainingId, ship.boat_number)}><Info /></IconButton></TableRowColumn>
      </TableRow>
    )
  }

render() {
  const { ship } = this.props
  const shipname = ship.filter((r) => (r))[0]
   if (!ship) return null

  return (
   <article className="rowerprofile">
    <header>
      <Title content={`Name: ${shipname.name} Type: ${shipname.type}`}/>
    </header>

    <main>
      <Table>
         <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
           <TableRow>
             <TableHeaderColumn>Training</TableHeaderColumn>
             <TableHeaderColumn>Date</TableHeaderColumn>
             <TableHeaderColumn>startTime</TableHeaderColumn>
             <TableHeaderColumn>boat Number</TableHeaderColumn>
            <TableHeaderColumn>Link to Training</TableHeaderColumn>
           </TableRow>
         </TableHeader>
         <TableBody displayRowCheckbox={false}>
            {ship.map(this.renderShip)}
         </TableBody>
     </Table>
    </main>
   </article>
     )
  }
}

const mapStateToProps = ({ ships }, { match }) => {
const ship = ships.filter((t) => (t.id === +match.params.shipId))

return {
  ship
  }
}

export default connect(mapStateToProps, { fetchOneShip, push }) (ShipPage)
