import { useEffect, useRef, useState } from 'react';
import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import nextPackage from "next/package.json";
import { BoxGeometryProps, Canvas, useFrame, Vector3 } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { IcosahedronGeometry, Mesh, MeshStandardMaterial, MeshToonMaterial } from 'three';
import { Box, Center, Stars, OrbitControls, Plane, RoundedBox, Sphere, Text3D, useGLTF } from '@react-three/drei'
import { Physics, useBox, usePlane, useSphere } from '@react-three/cannon';
import styled from 'styled-components';
import { Duck } from '../Duck';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const hoverScaleDiff = 0.5;

export type RandomDimensionsOptions = {
}

const getRandomDimensions = (options: any) => [
]


export const Ground = (props: any) => {
  const [ref, api] = useSphere(() => ({ velocity: [0, 0, 0], rotation: [-Math.PI / 2, 0, 0], position: [0, -252, 0], args: [250]}));

  return (
    <Sphere ref={ref} position={[0, -252, 0]} args={[250, 500, 500]} receiveShadow>
      <meshToonMaterial color="grey" />
    </Sphere>
  );
}

export const Text = (props: any) => {
  const [ref, api] = useBox(() => ({ mass: 1, angularVelocity: [2, 0, 0], velocity: [0, -4, 0], rotation: [-Math.PI / 4, 0, 0], position: [1, 0, 0], args: [7, 4, 0.38] }));

  useFrame(({ clock }) => {
    if (!ref.current) return;
  })

  useEffect(() => {
    const unsubscribe = api.angularVelocity.subscribe(([x, y, z]) => {
      api.angularVelocity.set(x, 0, 0);
    })
    return unsubscribe 
  }, [])

  return (
    <Center scale={2} castShadow ref={ref as any} {...props}>
      <K color="green" />
      <Text3D castShadow curveSegments={100} size={1} position={[0, 0, 0]} font="/Inter_Bold.json">
        iloLab
        <meshPhongMaterial color="white" />
      </Text3D>
    </Center>
  )
}

const boxRadius = 0.05

const boxArgs = [0.5, 2, 0.2]
export const K = (props: any) => {
  return (
    <Center castShadow receiveShadow position={[-0.7, 0.8, 0]}>
      <RoundedBox castShadow receiveShadow radius={boxRadius} args={boxArgs as any}>
        <meshStandardMaterial color="green" />
      </RoundedBox>
      <RoundedBox castShadow receiveShadow radius={boxRadius} position={[0.5, -0.1, 0.01]} args={[0.5, 2.3, 0.2]} rotation={[0, 0, -Math.PI / 6]}>
        <meshStandardMaterial color="purple" />
      </RoundedBox>
      <RoundedBox castShadow receiveShadow radius={boxRadius} position={[0.7, -0.7, 0]} args={[0.4, 1.1, 0.2]} rotation={[0, 0, -Math.PI * 3 / 4]}>
        <meshStandardMaterial color="green" />
      </RoundedBox>
    </Center>
  )
}

export const Scene = () => {
  const ref = useRef<number>(null!)
  useFrame(({ clock }) => {
    ref.current = clock.getElapsedTime()
  })
  return (
    <group>
      <directionalLight
        castShadow
        position={[20, 20, 20]}
        intensity={0.3}
        color="white"
        shadow-mapSize-height={6000}
        shadow-mapSize-width={6000}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      <Stars
        saturation={100}
        speed={2}
        radius={250}
      />
      <Physics gravity={[0, -0.5, 0]}>
        <Text />
        <Ground />
        <Duck position={[5, 5, 0]} />
      </Physics>
      <OrbitControls
        makeDefault
        position={[0, 0, 10 + ref.current]}
        enableZoom
        enablePan
        zoom0={ref.current}
        autoRotate
        autoRotateSpeed={0.5} 
        enableRotate
        minDistance={10}
        minPolarAngle={2 * Math.PI / 6}
        maxPolarAngle={2 * Math.PI / 6} 
      />
    </group>
  );
}

const rotation = [-0.5, -0.25, 0]
const rotationDefault = [0, 0, 0]

export default function Home({}) {
  return (
    <Container style={{height: '100vh', width: '100vw'}}>
      <Canvas camera={{ position: [0, 20, 20]}} shadows style={{height: '100%', width: '100%'}} >
        <color attach="background" args={["black"]} />
        <Scene />
      </Canvas>
    </Container>
  );
}
 6