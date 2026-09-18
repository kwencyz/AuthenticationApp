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

## Build and run your app

This project uses the React Native CLI directly (no separate Metro step needed — the CLI starts Metro for you).

### Android

```sh
npx react-native run-android
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
npx react-native run-ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face: