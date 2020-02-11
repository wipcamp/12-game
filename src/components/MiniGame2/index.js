import React, { Component } from 'react';
import GageBar from './GageBar'
import Monster from './Monster'
import Player from './Player'

const liff = window.liff;

export default class MiniGame2 extends Component {

    constructor(){
      super();
      this.state = {
        isLoad : false,
      }
      this.player = [];
      this.monsters = [];
    }

  update(){
    const player = this.player[0];
  }

  generateMonsters(){
    let monsters = [];
    let player = this.player[0];
      let monster = new Monster({
        size: 80,
        position: {
          x:"10px",
          y:"10px"
          // x: randomNumBetweenExcluding(0, this.state.screen.width, ship.position.x-60, ship.position.x+60),
          // y: randomNumBetweenExcluding(0, this.state.screen.height, ship.position.y-60, ship.position.y+60)
        },
        create: this.createObject.bind(this),
        // addScore: this.addScore.bind(this)
      });
      this.createObject(monster, 'monsters');
      this.updateObjects(this.monsters, 'monsters')
  }

  updateObjects(items, group){
    let index = 0;
    for (let item of items) {
      // if (item.delete) {
      //   this[group].splice(index, 1);
      // }else{
        items[index].render(this.state);
      // }
      index++;
    }
  }

  createObject(){
    console.log("create")
    // this[group].push(item);
    return(
      <Monster/>
    );
    // console.log(this.monsters.length)
  }

  componentDidMount(){
    // if(liff){
      liff
        .init({
          liffId: '1653691835-vZ4GNK7z'
      })
      .then(async () => {
        if(!liff.isLoggedIn()){
          console.log("not liff")
          //รอpathเกมน้อง
          // window.location.replace("/");
        } else {
            this.setState({
              isLoad:false
            })
        }
    })
    .catch(err => {
        console.log(err);
    });
    // }
    this.intervalId = setInterval(this.createObject.bind(this), 1000);
  }

  render() {
      console.log(this.state.isLoad)
      console.log("in minigame 2 in user")
      console.log(liff)
      if(this.state.isLoad){
          return <p>loading</p>
      }else{       
        return (
          <div>
            <div className="d-flex">
              <Player/>
              {this.createObject()}
            </div>
              <GageBar/>
              <h1>minigame 2 page</h1>
          </div>
        );
      }
    }  
}