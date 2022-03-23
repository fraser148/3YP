import React, { useEffect }     from 'react';
import Header   from './Header';
import * as THREE from "three";

import { Container, Row, Col }   from 'react-bootstrap';

const Topography = () => {

    useEffect(() => {
        // === THREE.JS CODE START ===
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        camera.position.z = 5;
        var animate = function () {
          requestAnimationFrame( animate );
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
          renderer.render( scene, camera );
        };
        animate();
        // === THREE.JS EXAMPLE CODE END ===
      })

    return (
        <div className="dashboard">
            <Header />
            <div className="main-container">
                <Container>
                    <Row>
                        <Col sm={6} lg={6} xl={6} md={6}>

                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Topography;