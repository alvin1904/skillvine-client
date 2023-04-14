# Custom Error Handling Component for React

This code defines a custom error handling component that can be used in React applications. The component allows the user to throw custom errors, display error messages, and set custom error styles.

## Configuration

The component includes several configurations that can be customized to suit the user's needs. These include:

- Status: An object containing error status codes such as error, success, warning, and info.
- Themes: An object containing color themes for the error component such as dark and light.
- Defaults: An object containing default values for the error component such as whether to show the error message, the default error status, theme, message, and timeout.
- Icons: An object containing icon components for each error status code.
- Error Messages: An object containing error messages to be displayed for each HTTP status code.

## Usage

To use this component, simply import it into your React application:

```jsx
import { CustomError, useCustomError, status, themes } from "./CustomError";
```

Wrap the component around the app's root component:

```javascript
function App() {
  return (
    <CustomError>
      <YourApp />
    </CustomError>
  );
}
```

Use the useCustomError hook to access the error handling function in your components:

```javascript
function ExampleComponent() {
  const { throwError } = useCustomError();

  function handleClick() {
    throwError("There was an error", status.ERROR, themes.DARK);
  }

  return <button onClick={handleClick}>Throw Error</button>;
}
```

```javascript
throwError("There was an error", status.ERROR, themes.DARK);
```

That's it! You can now throw custom errors and display them with the custom error handling component in your React application.