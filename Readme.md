## Movie Box

### Learnings While Making This App

#### New Hooks:

1. **useRef:**

   - `useRef` provides a reference to a DOM element or a mutable value that persists across renders.
   - When used with an input box, the `ref` object has a `current` property that points to the DOM element. For example, `ref.current.value` contains the current value of the input field.
   - Key Features:
     - `useRef` does not just store the value of the input box; it holds a reference to the DOM element.
     - It is mutable and does not trigger re-renders when updated.

2. **useNavigate:**
   - `useNavigate` is a hook from React Router DOM used for programmatic navigation between pages.

#### Firebase Configuration:

1. **Authentication with Firebase:**

   - Installed Firebase using:
     ```bash
     npm install firebase
     ```
   - Created a `firebase.js` file in the `utils` directory and added the Firebase configuration code.
   - Steps to enable Email/Password authentication:
     - Go to Firebase Project Overview > Authentication > Get Started.
     - Enable **Email/Password** authentication.
     - Click **Save**.

2. **Firebase API:**
   - `onAuthStateChanged`:
     - This API is triggered automatically whenever the authentication state changes (e.g., sign-in, sign-up, sign-out).
     - Acts like an event listener and can be used at the root level of the app for global authentication management.
