import React, { Component } from 'react'

import axios from 'axios'
import Select from 'react-select'
import Dropdowm from "./Dropdowm";


export default class DropdownEx extends Component {

  constructor(props){
    super(props)
    this.state = {
      dropDownOpt : [],
      selectionId: "",
      selectionLabel: ''
    }
  }

 async renderData(){
    const API = await axios.get('https://localhost:8080/select/dropdown')
    const serverResponse = API.data

    const dropDownValue = serverResponse.map((response) => ({
      "value" : response.selectionId,
      "label" : response.selectionLabel
    }))

    this.setState(
      {
        dropDownOpt: dropDownValue
      }
    )

  }

  onChange(event){
   this.setState(
     {
       selectionId:event.value,
       selectionLabel:event.label
      }
    )
  }

  componentDidMount(){
      this.renderData()
  }

  render() {
    return (
      <div className="">
        <Dropdowm
          id={"ddl1"}
          name={"ddllocation"}
          options={this.state.dropDownOpt}
          title={"Properties"}
          handleChange={this.handleChange}
          selectedValue={this.state.selectionId}
        />
      </div>
    );
  }
}