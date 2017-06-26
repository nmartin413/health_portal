import {Link}             from 'react-router-dom'
import debounce           from 'lodash/debounce'
import {connect}          from 'react-redux'
import LabeledInput       from '../common/LabeledInput'
import {getPatientList}   from '../../actions/patients'
import React, {Component} from 'react'

class PatientList extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = { searchText: '' }

    this.performSearchWithDelay = debounce(this.performSearch, 300)
  }

  componentDidMount() {
    this.performSearch()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchText !== this.state.searchText) this.performSearchWithDelay()
  }

  performSearch() {
    this.props.dispatch(getPatientList({
      search: this.state.searchText
    }))
  }

  renderPatient = (patient) => {
    return (
      <Link className="Box PatientList-result" key={patient.id} to={`/patients/${patient.id}`}>
        <div className="PatientList-resultTitle">{patient.last_name}, {patient.first_name}</div>
      </Link>
    )
  }

  render() {
    const {
      props: { searchResult, searchLoading },
      state: { searchText }
    } = this

    return (
      <div className="PatientList">
        <div className="PatientList-wrap">
          <div className="PatientList-sidebar">
            <LabeledInput
              label       = "Search"
              value       = {searchText}
              onChange    = {(evt) => this.setState({ searchText: evt.target.value })}
              placeholder = "ex: Jane Smith or 708-867-5309"
            />
          </div>
          <div className="PatientList-results">
            {searchLoading &&
              <div className="PatientList-resultsLoading">Loading...</div>
            }
            {searchResult && searchResult.map(this.renderPatient)}
          </div>
        </div>
      </div>
    )
  }

}

export default connect(
  (state) => ({
    searchResult  : state.patients.searchResult,
    searchLoading : state.patients.searchLoading,
    searchError   : state.patients.searchError,
  })
)(PatientList)
