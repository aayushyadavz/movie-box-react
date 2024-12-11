## Movie Box

### Learnings while making this app

#### useRef -

- Here, `useRef` provides a reference to a DOM element or a mutable value that persists across renders. When used with an input box, the ref object has a current property, which points to the DOM element. For an input box, ref.current.value contains the current value of the input field.

- `useRef` does not just store the value of the input box; it holds a reference to the DOM element.
- `useRef` is mutable and does not trigger re-renders when updated.

#### Firebase Configuration -

Authentication with firebase:

- npm install firebase
- Created `firebase.js` in utils and pasted the configuration
- In firebase Project overview > Authentication > Get Started > Enable Email/Password > Save
