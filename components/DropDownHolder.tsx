export type AlertType = 'info' | 'warn' | 'error' | 'success';

export type DropdownType = {
  alertWithType: (type: AlertType, title: string, message: string) => void
}

export class DropDownHolder {
  static dropDown: DropdownType
  static onClose: Function;

  static setDropDown(dropDown: DropdownType) {
    this.dropDown = dropDown
  }

  static alert(type: AlertType, title: string, message: string) {
    this.dropDown.alertWithType(type, title, message)
  }

  static setOnClose(onClose: Function) {
    this.onClose = onClose;
  }

  static invokeOnClose(data) {
    if (typeof this.onClose === 'function') {
      this.onClose(data);
    }
  }
}