import React from "react";
import styled from "styled-components";
import axios from "axios";

const ModalContainer = styled.div`
  background-color: white;
  width: 350px;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
  line-height: 8px;
`;

const ClickableWrapper = styled.button`
  margin: 3px;
  width: 30%;
  font-size: 0.8em;
`;

class EditMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedName: '',
      updatedCategory: '',
      updatedPrice: '',
      updatedDescription: '',
      updatedImageUrl: '',
      updated: {},
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    const value = event.target.value;
    const field = event.target.name;
    this.setState({[field]: value});
  }

  handleSubmit() {
    const original = this.props.menuItem;
    const update = this.state;

    //item to be updated
    const item = {};
    item.id = original.id;
    item.name = update.updatedName === '' ? original.name : update.updatedName;
    item.category = update.updatedCategory === '' ? original.category : update.updatedCategory;
    item.price = update.updatedPrice === '' ? original.price : update.updatedPrice;
    item.description = update.updatedDescription === '' ? original.description : update.updatedDescription;
    item.imageUrl = update.updatedImageUrl === '' ? original.imageUrl : update.updatedImageUrl;
    
    //request to update item
    axios.put('/api/bar/menu/edit', {item: item})
      .then(() => {
        console.log('saved changes');
      })
      .catch(err => console.log(err));

    this.props.toggleModal();
  }

  render() {
    const item = this.props.menuItem;
    return (
      <ModalContainer>
        <div>
          <form>
            <h2>Edit Menu Item</h2>
            Item Name<br />
            <input 
              type="text"
              name="updatedName"
              defaultValue={item.name}
              onChange={this.handleInput} />
            <br /><br />
            Category<br />
            <input 
              type="text"
              name="updatedCategory"
              defaultValue={item.category}
              onChange={this.handleInput} />
            <br /><br />
            Price<br />
            $ <input 
              type="text"
              name="updatedPrice"
              defaultValue={item.price}
              onChange={this.handleInput} />
            <br /><br />
            Description<br />
            <textarea 
              rows="4"
              cols="100%"
              name="updatedDescription"
              defaultValue={item.description}
              onChange={this.handleInput} />
            <br /><br />
            Image URL<br />
            <input 
              type="text"
              name="updatedImageUrl"
              defaultValue={item.imageUrl}
              onChange={this.handleInput} />
            <br /><br />
            <ClickableWrapper type="submit" onClick={this.handleSubmit}>
              Save Item
            </ClickableWrapper>
          </form>
          <ClickableWrapper onClick={() => this.props.toggleModal()}>
            Exit
          </ClickableWrapper>
        </div>
      </ModalContainer>
    );
  }
}

export default EditMenuItem;