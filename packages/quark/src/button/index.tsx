import QuarkElement, {
  property,
  customElement,
  createRef
} from '@quarkd/core';
import "../loading";
import style from './style.css';

@customElement({
  tag: 'quark-button',
  style,
})
class QuarkButton extends QuarkElement {
  constructor() {
    super();
  }

  @property({
    type: Boolean,
  })
  disabled: boolean = false;

  @property()
  size: string;

  @property()
  type: string = '';

  @property()
  icon: string | undefined = undefined;

  @property()
  shape: string;

  @property({
    type: Boolean,
  })
  loading: boolean = false;

  @property()
  loadtype: string;

  @property()
  loadingcolor: string;

  @property()
  loadingsize: number;

  @property({
    type: Boolean,
  })
  plain: boolean = false;

  slotRef: any = createRef();

  renderIcon = () => {
    if (this.icon && this.icon.includes('http')) {
      return <img class="quark-button-icon" src={this.icon}></img>;
    }
    if (this.loading) {
      return (
        <quark-loading
          class="quark-button-load"
          color={this.loadingcolor ? this.loadingcolor : "#fff"}
          size={this.loadingsize ? this.loadingsize : "20"}
          type={this.loadtype ? this.loadtype : "spinner"}
        />
      );
    }
    return null;
  };

  componentDidMount() {
    this.slotRef.current.addEventListener('click', (e) => {
      if(this.disabled || this.loading) {
        e.stopPropagation();
      }
    })
  }

  render() {
    return (
      <div ref={this.slotRef} class="quark-button">
        {this.renderIcon()}
        <slot></slot>
      </div>
    );
  }
}

export default QuarkButton;
