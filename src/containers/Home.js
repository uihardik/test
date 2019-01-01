import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  List, Avatar, Button,Row, Col,notification, Checkbox } from 'antd';

  import{CartItemSet} from './../actions'
  import {Link} from 'react-router-dom'

import reqwest from 'reqwest';

const count = 3;
//const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;
const fakeDataUrl = `http://www.mocky.io/v2/5c2b94223000005000abafd9`;

class Home extends Component {

  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
    setitem: []
  }

   constructor (props) {
    super(props)

    this.ItemAdded = this.ItemAdded.bind(this)
  }

  componentDidMount() {
    this.getData((res) => {
      this.setState({
        initLoading: false,
        data: res.data,
        list: res.data,
      });
    });
  }

  getData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res);
      },
    });
  }

  // onChange(checkedValues) {
  //   this.ItemAdded(checkedValues);
  // }

  render () {

    const { initLoading, loading, list } = this.state;
    const listItem = list.map((value) =>{
          return <Col span={16} style={{width:'100%',padding:'5px',margin:'2px',display: 'flex',justifyContent: 'space-between',backgroundColor:'#e4e2e2'}}>
          <Checkbox value={value}>
            < span>{value.item}</span>
          </Checkbox>
          <span><lable>Weight: </lable>{value.weight}g</span>
          <span><lable>price: </lable>${value.price}</span>
          </Col>
    })

    const openNotification = (item) => {
      this.ItemAdded(item)
      //this.setitem.push('1')
      //this.setState([...state.setitem, action.place])
      notification.open({
        message: `${item.item}`,
        description: `${item.item}`+' is Added in Our cart.This you can continue shoping and get the notification. This is the content of the notification.',
        style: {
          width: 600,
          marginLeft: 335 - 600,
        },
      });
    };

    return (
      <article>
        <div>
          <section className='text-section'>
             <Link to='/dashboard' className='btn btn--dash btn--nav'>Place order</Link>
              <Checkbox.Group style={{ width: '100%' }} onChange={this.ItemAdded}>
                <Row gutter={16}>
                  {listItem}
                </Row>
              </Checkbox.Group>
            </section>
        </div>
      </article>
    )
  }

  async ItemAdded (item1) {
    await this.props.dispatch(CartItemSet(item1,(res) => {
    }
    ));
  }
}

function select (state) {
  return {
    data: state.item
  }
}

export default connect(select)(Home)