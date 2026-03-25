export type RootStackParamList = {
  '(auth)/onboarding': undefined;
  '(auth)/sign-in': undefined;
  '(auth)/sign-up': undefined;
  '(auth)/create-profile': undefined;
  '(tabs)': undefined;
  '(modals)/add-review': undefined;
  '(modals)/add-item': undefined;
  '(modals)/place-search': undefined;
  'place/[id]': { id: string };
  'review/[id]': { id: string };
  'user/[id]': { id: string };
  saved: undefined;
  'collections/index': undefined;
  'collections/[id]': { id: string };
  'settings/index': undefined;
  'settings/subscription': undefined;
};
