export interface IPostDialogSettings {
  bodyChanged(value: string);
  titleChanged(value: string);
  onCreate();
  onClose();
  isVisible: any;
  title: string;
  createText: string;
}
