import { LightningElement, api } from "lwc";

const CSS_CLASS_HIDE = "slds-hide";
const CSS_CLASS_SHOW = "slds-show";

class EnvToastEvent extends CustomEvent {
    constructor(detail) {
      detail.id = `${new Date().getTime()}`
      if (detail.autoClose == null) detail.autoClose = true
      super('envtoast', {
        bubbles: true,
        composed: true,
        detail
      })
    }
  }

/**
 * @module EnvToast
 * @component c-env-toast
 * 
 * @extensible false
 * @description 全局信息提示框.
 */
export default class EnvToast extends LightningElement {
  /**
   * 
   * @description 全局提示的标题
   * @type {string}
   */
  @api title = "";
  /**
   * 
   * @description 全局提示的信息主内容
   * @type {string}
   */
  @api message = "";
  /**
   * 
   * @description 全局提示的类型(不同类型UI不同，包括背景色字体颜色等)，有error success warning三种类型
   * @type {string}
   */
  @api variant = "error";
  /**
   * 
   * @description 显示多少时间后(单位毫秒)，全局提示自动关闭
   * @type {number}
   */
  @api autoCloseTime = 5000;
  /**
   * 
   * @description 是否自动关闭
   * @default false
   * @type {boolean}
   */
  @api autoShow = false
  @api autoClose = false;
  /**
   * 
   * @description error 和 warning类型全局提示，是否强制自动关闭
   * @default false
   * @type {boolean}
   */
  @api autoCloseErrorWarning = false;

  /**
   * 
   * @description 显示全局提示
   */
  @api
  showToast() {
    const toastModel = this.template.querySelector('[data-id="toastModel"]');
    //toastModel.className = 'slds-show';
    toastModel.classList.remove(CSS_CLASS_HIDE);
    toastModel.classList.add(CSS_CLASS_SHOW);

    if (this.autoClose)
      if (
        (this.autoCloseErrorWarning && this.variant !== "success") ||
        this.variant === "success"
      ) {
        this.delayTimeout = setTimeout(this.closeModel, this.autoCloseTime);
      }
  }

  async connectedCallback() {
    if (this.autoShow) {
      await Promise.resolve()
      this.showToast()
    }
  }

  closeModel = () => {
    window.clearTimeout(this.delayTimeout)
    const toastModel = this.template.querySelector('[data-id="toastModel"]');
    //toastModel.className = 'slds-hide';
    toastModel.classList.remove(CSS_CLASS_SHOW);
    toastModel.classList.add(CSS_CLASS_HIDE);
    this.dispatchEvent(new CustomEvent('close'))
  }

  get mainDivClass() {
    return (
      "slds-notify slds-notify_toast forceToastMessage slds-theme_" +
      this.variant
    );
  }

  get messageDivClass() {
    return (
      "slds-icon_container slds-icon-utility-" +
      this.variant +
      " slds-icon-utility-success slds-m-right_small slds-no-flex slds-align-top"
    );
  }
  get iconName() {
    return "utility:" + this.variant;
  }
  static EnvToastEvent = EnvToastEvent
}