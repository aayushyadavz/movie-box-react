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

     - Unsubscribing: The `onAuthStateChanged` method returns an unsubscribe function. The return () => unsubscribe(); line ensures that the subscription is properly cleaned up when the component is no longer in use, avoiding memory leaks or duplicate listeners.

   - `signOut`:

     - Used to log out the currently authenticated user.

   - `updateProfile`:
     - Allows updating the user's profile information, such as display name and profile picture.

#### Some Later on Bug Fixes:

1. Issue: User info displayed incorrectly on other devices.

Fix:

- Wait for Firebase to confirm auth status (isAuthChecked).
- Show user info only when logged in.
- Clear Redux state on logout.
- Prevent rendering until auth check completes.

Outcome: User info now displays correctly.

2. Issue: User not redirected to browse page after correcting errors during sign-up.

Fix:

- Reset error messages before initiating sign-up/sign-in actions.
- Ensure state is updated before redirecting.
- Correct validation flow to avoid conflicts.

Outcome: User is now redirected to the browse page after successful sign-up.

3. Issue: "Page not found" (404 error) occurs when refreshing or directly accessing routes (e.g., /browse) in a Netlify-deployed React app.

Fix:

- Added a netlify.toml file in the root directory.
- Configured Netlify to redirect all routes to index.html using the following rule

```bash
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Outcome: All routes now correctly serve index.html, and React Router handles routing without showing a 404 error. Refreshing or directly visiting any route works seamlessly.
