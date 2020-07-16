import * as CANNON from 'cannon';
import React, { createContext, useState, useEffect, useContext, useRef } from 'react'
import { useFrame } from 'react-three-fiber';
import { GRAVITY } from '../lib/gameMechanics';

// Cannon-world context provider
const PhysicsContext = createContext(null)

const PhysicsProvider = ({ children }) => {
  // Set up physics
  const [world] = useState(() => new CANNON.World())
  useEffect(() => {
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 5;
    world.gravity.set(0, -GRAVITY, 0);
  }, [world])

  // Run world stepper every frame
  useFrame(() => world.step(1 / 60))
  // Distribute world via context
  return (
    <PhysicsContext.Provider value={world}>
      {children}
    </PhysicsContext.Provider>
  )
}

// Custom hook to maintain a world physics body
const useCannon = ({ ...props }, fn, deps = []) => {
  const ref = useRef()
  // Get cannon world object
  const world = useContext(PhysicsContext)
  // Instanciate a physics body
  const [body] = useState(() => new CANNON.Body(props))
  useEffect(() => {
    // Call function so the user can add shapes
    fn(body)
    // Add body to world on mount
    world.addBody(body)
    // Remove body on unmount
    return () => world.removeBody(body)
  }, deps)

  useFrame(() => {
    if (ref.current) {
      // Transport cannon physics into the referenced threejs object
      ref.current.position.copy(body.position)
      ref.current.quaternion.copy(body.quaternion)
    }
  })

  return ref
}

export { PhysicsProvider, useCannon };
