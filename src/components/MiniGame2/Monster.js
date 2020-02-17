
import React, { Component } from 'react';
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

// const render = Matter.Render.create({
//   element: document.body,
//   engine: Matter.engine,
//   options: {
//     width: 800,
//     height: 500,
//     wireframes: false
//   }
// });

export default class Monster extends Component {

    state = {
        entities: this.setUpWorld()
    }

    onClick(){
      // return Matter.Bodies.circle(Math.random()*1000 + 30, 500, 30);
      let monsters= Matter.Composites.softBody(Math.random()*700 + 30, 100, Math.floor(Math.random()*6) + 1, 5, 0, 0, true, 15, particleOptions, constraintOptions);
      // return{
      //   monsters:{
      //     body : monsters,
      //     size : [50,50],
      //     color : 'red',
      //     renderer : MonsterTexture
      //   }
      // }
    }

    setUpWorld(){
      let engine = Matter.Engine.create({enableSleeping:false});
      
      let world = engine.world;
      // var monsters = Matter.Bodies.circle(210, 100, 30, { restitution: 0.5 });

      var monsters = Matter.Composites.softBody(100, 200, 10, 5, 0, 0, true, 15, particleOptions, constraintOptions);
        console.log(monsters)
      Matter.World.add(world)

      return{
        physics:{
          engine:engine,
          world:world,
        },
        monsters:{
          body : monsters,
          size : [50,50],
          color : 'red',
          renderer : MonsterTexture
        }
      }
    }

    // render = Matter.Render.create({
    //   element: document.body,
    //   engine: Matter.engine,
    //   options: {
    //     width: 800,
    //     height: 500,
    //     wireframes: false
    //   }
    // });

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