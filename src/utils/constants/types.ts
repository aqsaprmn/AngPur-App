export interface Route {
  id?: number;
  title: string;
  icon?: JSX.Element;
  controls?: string;
  route: string;
  expanded?: boolean;
  translationKey: string;
  isHidden: boolean;
}
