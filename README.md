A React Native authentication app with Login, Signup, and Home screens, built with React Context API for state management and React Navigation for screen flow.

## Features

- **AuthContext** (`src/auth/AuthContext.tsx`) — global auth state with `user`, `login`, `signup`, and `logout`.
- **AuthService** (`src/auth/AuthService.ts`) — mock backend simulating async network calls (`Promise` + `setTimeout`) against an in-memory user store. Swap this file for real HTTP calls later without touching `AuthContext` or the screens.
- **Validation** (`src/validation/authValidation.ts`) — email format, required fields, and minimum password length (6 chars), checked before hitting `AuthService`.
- **Persistence** (`src/storage/authStorage.ts`) — the logged-in user is saved to `AsyncStorage` so the session survives an app restart.
- **Screens**:
  - `LoginScreen` — email/password, shows format errors and incorrect-credential errors.
  - `SignupScreen` — name/email/password, shows missing-field, invalid-email, and short-password errors.
  - `HomeScreen` — shows the logged-in user's name and email, with a Logout button.
- **Password visibility toggle** (`src/components/PasswordInput.tsx`) — Show/Hide button on password fields (bonus task).
- **Navigation** (`src/navigation/AppNavigator.tsx`) — switches between the auth stack (Login/Signup) and Home automatically based on whether `user` is set.

## Screenshots

| Login | Signup | Home |
|---|---|---|
| ![Login screen](screenshots/login.png) | ![Signup screen](screenshots/signup.png) | ![Home screen](screenshots/home.png) |

| Login — no account found | Signup — account already exists |
|---|---|
| ![Login no account found alert](screenshots/login-no-account-found.png) | ![Signup account already exists alert](screenshots/signup-account-exists.png) |

## Known limitation

There's no real backend — `AuthService.ts` keeps registered users in memory, so **signed-up accounts are lost on a full app reload** (Metro fast refresh preserves them; a cold restart does not). The *logged-in session* itself does persist across restarts via AsyncStorage, but re-registering after a cold restart is expected.

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
