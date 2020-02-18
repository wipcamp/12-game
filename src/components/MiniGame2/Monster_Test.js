import React from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";
import MonsterTexture from './MonsterTexture'
import { GameEngine } from "react-game-engine";

const particleOptions = {
    friction: 0.05,
    frictionStatic: 0.1,
    render: { visible: true , renderer: MonsterTexture}
};

const constraintOptions = {
    render: { visible: true }
};

class Scene extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entities: this.setUpWorld(),
        }
    }

    componentDidMount(){
        this.setUpWorld()
    }

    setUpWorld() {
        let Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies,
            engine = Engine.create({
                // positionIterations: 20
            });

        let render = Render.create({
            element: this.refs.scene,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: true
            }
        });

        let ballA = Bodies.circle(210, 100, 30, { restitution: 0.5 });
        let ballB = Bodies.circle(110, 50, 30, { restitution: 0.5 });
        let monsters = Matter.Composites.softBody(
            100, 200, 10, 5, 0, 0, true, 15, particleOptions, constraintOptions
        );

        World.add(engine.world, [
            // walls
            Bodies.rectangle(200, 0, 600, 50, { isStatic: true }),
            Bodies.rectangle(200, 600, 600, 50, { isStatic: true }),
            Bodies.rectangle(260, 300, 50, 600, { isStatic: true }),
            Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
        ]);

        World.add(engine.world, [ballA, ballB, monsters]);

        Engine.run(engine)
        Render.run(render)

        // return {
        //     physics: {
        //         engine: engine,
        //         world: World,
        //     },
        //     monsters: {
        //         body: monsters,
        //         size: [2, 2],
        //         color: 'red',
        //         renderer: MonsterTexture
        //     },
        //     ballA: {
        //         body: monsters,
        //         size: [2, 2],
        //         color: 'red',
        //         renderer: MonsterTexture
        //     },
        //     ballB: {
        //         body: monsters,
        //         size: [2, 2],
        //         color: 'red',
        //         renderer: MonsterTexture
        //     }
        // }

    }

    render() {
        return (
            <div>
                <div ref="scene">
                    <MonsterTexture/>
                </div>
            </div>
        );
    }
}
export default Scene;
