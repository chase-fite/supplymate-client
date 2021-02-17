import React, { Component } from 'react'
import { Button, Form, Col, Row, Table } from 'react-bootstrap'
import apiManager from '../utility/apiManager'
import './Inventory.css'


class ManageAddresses extends Component {

    state = {
        itemTypeList: [],
        selectedItemTypeId: 0,
        rowClassNameList: []
    }

    componentDidMount() {
        apiManager.get('itemtypes')
            .then(itemTypes => {
                this.setState({
                    itemTypeList: itemTypes,
                })
                this.createRowClassNameList(itemTypes)
            })
    }

    handleAddItemType = () => {

        const newItemType = {
            name: this.refs.name.value
        }

        apiManager.post('itemtypes', newItemType)
            .then(r => {
                apiManager.get('itemtypes')
                    .then(itemTypes => {
                        this.setState({
                            itemTypeList: itemTypes,
                        })
                        this.createRowClassNameList(itemTypes)
                    })
            })
        this.clearAllInputFields()
    }

    clearAllInputFields = () => {
        for(let ref in this.refs) {
            this.refs[ref].value = ''
        }
    }

    handleDeleteItemType = (id) => {
        if (this.state.selectedItemTypId !== 0) {
            apiManager.delete('itemtypes', id)
                .then(r => {
                    apiManager.get('itemtypes')
                        .then(itemTypes => {
                            this.setState({
                                itemTypeList: itemTypes,
                            })
                            this.createRowClassNameList(itemTypes)
                        })
                })
        } else {
            window.alert('Please select an item type to delete')
        }
    }

    updateClassNameList = (indx) => {
        let tempClassNameList = []
        this.state.rowClassNameList.forEach((cn, indx2) => {
            if (indx2 === indx) {
                tempClassNameList.push('highlighted-row')
            } else {
                tempClassNameList.push('')
            }
        })
        this.setState({
            rowClassNameList: tempClassNameList
        })
    }

    createRowClassNameList = (itemTypeList) => {
        let tempClassNameList = []
        itemTypeList.forEach(itemType => {
            tempClassNameList.push('')
        })
        this.setState({
            rowClassNameList: tempClassNameList
        })
    }

    render() {
        return (
            <div className="manage-item-type">
                <Table striped bordered hover size="sm">
                    <thead className="table-bottom-margin">
                        <tr>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.itemTypeList.map((itemType, indx) => {
                            return (
                                <tr className={this.state.rowClassNameList[indx]} key={itemType.id} onClick={() => {
                                    this.updateClassNameList(indx)
                                    this.setState({ selectedItemTypeId: itemType.id })
                                }}>
                                    <td>{itemType.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <Button className="item-detail-btn" onClick={() => this.handleDeleteItemType(this.state.selectedItemTypeId)}>Delete Item Type</Button>

                <Form>
                    <h2 className="inv-title">Add Item Type</h2>
                    <div className="add-item-type">
                        <div className="add-item-type__label">
                            <div>Item Type</div>
                        </div>
                        <div className="add-item-type__input">
                            <Form.Control type="text" ref="name" />

                        </div>
                    </div>
                    <Button className="item-detail-btn" onClick={this.handleAddItemType}>Save</Button>
                    <Button className="item-detail-btn" onClick={() => {
                        if(this.props.returnToEditItem) {
                            this.props.returnToEditItem()
                        }
                        else {
                            this.props.returnToAddItem()
                        }
                    }}>Back</Button>
                </Form>
            </div>
        )
    }
}

export default ManageAddresses
