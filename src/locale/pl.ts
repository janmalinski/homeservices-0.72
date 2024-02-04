import appConfig from '../../app.json';

const translations = {
  common: {
    cancel: 'Anuluj',
    login: 'Zaloguj się',
    noInternetConnection: 'Brak internetu',
    somethingWentWrong: 'Coś poszło nie tak',
  },
  welcome: {
    hireHomeHelp: 'Wyszukaj pomoc domową',
    start: 'Rozpocznij',
    findHomeHelp: 'Znajdź pomoc domową w 10 minut',
    alreadyHaveAccount: 'Masz już konto?',
  },
  location: {
    howCanWeHelpYou: 'Jak możemy Tobię pomóc?',
    location: 'Location',
    clientOrWorker: 'Are you looking for Home Help, or you are Home Help?',
    client: 'I am looking for Home Help',
    worker: 'I am Home Help',
    clientEmploymentType: 'I am looking for home help',
    workerEmploymentType: 'I am looking for client',
    yourLocation: 'Your location',
    detectLocation: 'Detect my location or set location manually',
  },
  map: {
    searchOrMoveTheMap: 'Search or move the map',
    whereAreYouLookingForHelp: 'Gdzie chcesz znaleźć pomoc domową?',
    whichAreYouWantToWork: 'W jakim rejonie chcesz pracować?',
    unableOpenSettings: 'Nie można otworzyć ustawień',
    locationDisabled: `Turn on Location Services to allow "${appConfig.displayName}" to determine your location. This is required to add your ad to listing`,
    locationPermissionDenied: 'Location permission denied',
    goToSettings: 'Go to Settings',
    dontUseLocation: "Don't Use Location",
    locationPermisssionRevoked: 'Location permission revoked by user',
    confirmLocation: 'Zatwierdź lokalizację',
  },
  login: {
    logInButton: 'Zaloguj się',
    signUpTip: 'Nie masz konta?',
    forgotPassword: 'Zapomniałeś hasła?',
  },
  register: {
    register: 'Zarejestruj się',
    accept: 'Akceptuje ',
    termsOfUse: 'Warunki korzystania',
  },
  verifyRegistrationCode: {
    checkEmail:
      'Sprawdź skrzynkę emailową. Prześlij w formularzy kod weryfikacyjny zą emaila',
    registrationCodeVerification: 'Weryfikacja kodu autoryzacyjnego',
    registrationCode: 'Kod autoryzacyjny',
    registrationCodeButton: 'Zatwierdź kod autoryzacyjny',
  },
  resetPassword: {
    resetPassword: 'Reset password',
    guide1:
      'Provide you email in the field below. We will send you link to reset your password.',
    guide2:
      'After setting up new password, sign in with newly set password at the login screen.',
    resetPasswordButtonLabel: 'Reset Password',
    userNotFound:
      'No user found for provided email. Make sure to provide email you registered.',
    resetPasswordSuccess:
      'Email with password reset link has been sent. After setting up new password, sign in with newly set password at the login screen.',
  },
  adList: {
    screenTitle: 'Ogłoszenia',
    image: 'Image',
    addAd: 'Add Ad',
    contentList: 'Treści',
    contentImage: 'Content Image',
    contentCreate: 'Content Create',
    addContent: 'Add new content',
  },
  adCreate: {
    screenTitle: 'Create Ad',
    employmentType: 'Employment type',
    availableFrom: 'Availiable from',
    availableTo: 'Availiable to',
    services: 'Services',
    description: 'Description',
    fixedTerm: 'Fixed-term',
    setHoursWorkingTime: 'Time of day',
    workingTimeNegotiable: 'Negotiable',
    setHoursWorkingTimeSetHours: 'Set hours',
    days: {
      monday: 'Mo',
      tuesday: 'Tu',
      wednesday: 'We',
      thursday: 'Th',
      friday: 'Fr',
      saturday: 'Sa',
      sunday: 'Su',
    },
    overnight: 'Night',
    location: 'Location',
    detectLocation: 'Detect my location',
    setLocationManually: '',
  },
  settings: {
    screenTitle: 'Ustawienia',
    account: 'Konto',
    signOutTitle: 'Wyloguj się',
    signOutSubtitle: 'Po wylogowaniu się, musisz zalogować się ponownie',
    signOutAction: 'Wyloguj',
    signOutDialogTitle: 'Wyloguj się',
    signOutDialogDescription: 'Czy na pewno chcesz się wylogować?',
    yourAds: 'Twoje ogłoszenia',
    manageTheme: 'Zarządzaj theme'
  },
  account: {
    account: 'Profil uzytkownika',
    consentPhoneNumberVisibility:
      ' I would like to display my phone number to users',
  },
  userAdList: {
    screenTitle: 'Your Ads',
  },
  adDetails: {
    published: 'Data dodania',
    availableFrom: 'Dostępne od',
    availableTo: 'Dostępne do',
    services: 'Serwis',
    description: 'Opis',
    availability: 'Dostępność',
    negotiable: 'Do uzgodnienia',
    typesOfEmployment: 'Rodzaj zatrudnienia',
  },
};

export default translations;
