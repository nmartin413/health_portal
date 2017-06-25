import './PatientList.css'

import LabeledInput       from '../common/LabeledInput'
import React, {Component} from 'react'

export default class PatientList extends Component {

  render() {
    return (
      <div className="PatientList">
        <div className="PatientList-wrap">
          <div className="PatientList-sidebar">
            <LabeledInput label="Search" placeholder="ex: Jane Smith or 708-867-5309" />
          </div>
          <div className="PatientList-results">
            <div className="PatientList-result">
              <div className="PatientList-resultTitle">Patsy P. Pavel</div>
              <div className="PatientList-resultSubtitle">123-456-7890 | 123 Pumpkin Place</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
