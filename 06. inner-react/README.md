# Learning React: 06: Inner Workings

## Components

1. **Component Definition**

   - A component in React is essentially a function that returns JSX.

2. **Component Instances**

   - A component instance is a component being used as `<Component />`.
   - Component instances actually hold states and props, return JSX, and live in the application.

3. **JSX and React Elements**
   - Each JSX creates a `React.createElement` function call which in turn produces a 'React element' for each component instance. These are essentially JavaScript objects.
   - These React elements are then rendered to DOM elements and displayed as UI.

## How Rendering Works in React

### 1. Rendering is Triggered

Rendering can be triggered in two main ways:

- **Initial Render**: When the application is first loaded.
- **State Update (Re-render)**: When the state of a component changes, causing a re-render.

**Important Notes:**

- Rendering is triggered for the entire application, but the DOM is updated only for the specific component that changed.
- Renders are not triggered immediately; they are scheduled through the JavaScript engine.

### 2. Render Phase

- Rendering only happens internally during this phase; no visual changes are made.
- Initially, React will go through all component instances and render them (calls their functions). This will create React elements which will form the Virtual DOM.
- **Virtual DOM / React Element Tree**: A tree of all React elements generated from all components.
- If a component (let's call it Component X) causes a re-render, all its child/nested components will be re-rendered as well (React elements re-render), essentially creating a new Virtual DOM.
- The new Virtual DOM will then be reconciled with the Fiber Tree to create the Updated Fiber Tree.
- **Reconciliation**
  - **Why we need it?** Writing to the DOM every time is very slow.
  - **What is it?** Reconciliation decides which DOM elements need to be inserted, deleted, or updated to reflect the latest changes. It essentially outputs a list of DOM operations.
  - Reconciliation is done by the reconciler, which is the heart of React.
  - The current reconciler is called Fiber. The Fiber tree has fibers for all components; fibers are NOT re-created on re-render, they persist from the initial render.
  - After a state update, a new Virtual DOM is created, then it combines with the current Fiber tree through reconciliation and diffing (comparing elements step by step based on their position in the tree). This process creates the updated Fiber tree (workInProgress tree) and a list of effects (DOM updates) which will be used in the Commit phase.
  - The process is asynchronous and can be paused, etc.

#### Diffing Algorithm

- **Rules:**
  1.  Two elements of different types will produce different trees.
  2.  Elements with a stable key prop stay the same across renders.
- **Two situations:**
  1.  Same position, different element
    - basically change in html tag
    - react assumes entire sub-tree is invalid, old components are destroyed with states, and is rebuild with new states
  2.  Same position, same element
    - DOM and react elements remain same with state
    - only props change

**Key Prop**
  - special prop which can establish uniqueness
  - allows react to distinguish b/w multiple instances of same component
  - if key changes b/w renders, the element is destroed and rebuilt (even if same position)

### 3. Commit Phase

- This phase involves actually writing to the DOM, including updating, deleting, etc.

### 4. Browser Paint

- This is the phase where the browser produces visual changes (outside of React).

## Additional Notes

- **React Reacts to State Changes**: React re-renders components when there is a change in state.
- **Component Without Instance**: Calling a component without an instance leads to React treating it as a raw React element, which cannot manage its own state.

This understanding of the inner workings of React, including how components and rendering work, is crucial for efficient React development and optimization.
