
import React, { Component } from 'react';
import Lottie from 'react-lottie'
import animationData from '../../Lottiesfiles/Monster.json'
import Matter from 'matter-js'
import MonsterTexture from './MonsterTexture'
import { GameEngine } from "react-game-engine";

const particleOptions = { 
    friction: 0.05,
    frictionStatic: 0.1,
    render: { visible: true } 
};

const constraintOptions = { 
    render: { visible: true } 
};

export default class Monster extends Component {

    state = {
        entities: this.setUpWorld()
    }

    onClick(){
        let engine = Matter.Engine.create({enableSleeping:false});
      let world = engine.world;
    //   let monsters = Matter.Bodies.rectangle( 500 / 4, 500 / 2, 50, 50);

      var monsters = Matter.Composites.softBody(Math.random()*700 + 30, 100, Math.floor(Math.random()*6) + 1, 5, 0, 0, true, 15, particleOptions, constraintOptions);
        console.log(monsters)
      Matter.World.add(world,monsters)
    }

    setUpWorld(){
      let engine = Matter.Engine.create({enableSleeping:false});
      let world = engine.world;
    //   let monsters = Matter.Bodies.rectangle( 500 / 4, 500 / 2, 50, 50);

      var monsters = Matter.Composites.softBody(450, 200, 10, 5, 0, 0, true, 15, particleOptions, constraintOptions);
        console.log(monsters)
      Matter.World.add(world,[monsters])

      return{
        physics:{
          engine:engine,
          world:world
        },
        monsters:{
          body : monsters,
          size : [50,50],
          color : 'red',
          renderer : MonsterTexture
        }
      }
    }

    render() {
        console.log("gameEngine")
        return (
            <div>
                <GameEngine
                  running={true}
                  entities={this.state.entities}
                  systems={this.state.systems}
                />
                <button onClick={()=>this.onClick()}/>
            </div>
        );
    }
}