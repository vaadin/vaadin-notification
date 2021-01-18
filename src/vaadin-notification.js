/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { templatize } from '@polymer/polymer/lib/utils/templatize.js';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import { ElementMixin } from '@vaadin/vaadin-element-mixin/vaadin-element-mixin.js';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';
import { ThemePropertyMixin } from '@vaadin/vaadin-themable-mixin/vaadin-theme-property-mixin.js';

/**
 * The container element for all notifications.
 *
 * @extends HTMLElement
 * @mixes ElementMixin
 * @mixes ThemableMixin
 */
class NotificationContainer extends ThemableMixin(ElementMixin(PolymerElement)) {
  static get template() {
    return html`
    <style>
      :host {
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        align-items: stretch;
        pointer-events: none;
      }

      [region-group] {
        flex: 1 1 0%;
        display: flex;
      }

      [region-group="top"] {
        align-items: flex-start;
      }

      [region-group="bottom"] {
        align-items: flex-end;
      }

      [region-group] > [region] {
        flex: 1 1 0%;
      }

      @media (max-width: 420px) {
        [region-group] {
          flex-direction: column;
          align-items: stretch;
        }

        [region-group="top"] {
          justify-content: flex-start;
        }

        [region-group="bottom"] {
          justify-content: flex-end;
        }

        [region-group] > [region] {
          flex: initial;
        }
      }
    </style>

    <div region="top-stretch"><slot name="top-stretch"></slot></div>
    <div region-group="top">
      <div region="top-start"><slot name="top-start"></slot></div>
      <div region="top-center"><slot name="top-center"></slot></div>
      <div region="top-end"><slot name="top-end"></slot></div>
    </div>
    <div region="middle"><slot name="middle"></slot></div>
    <div region-group="bottom">
      <div region="bottom-start"><slot name="bottom-start"></slot></div>
      <div region="bottom-center"><slot name="bottom-center"></slot></div>
      <div region="bottom-end"><slot name="bottom-end"></slot></div>
    </div>
    <div region="bottom-stretch"><slot name="bottom-stretch"></slot></div>
`;
  }

  static get is() {
    return 'vaadin-notification-container';
  }

  static get properties() {
    return {
      /**
       * True when the container is opened
       * @type {boolean}
       */
      opened: {
        type: Boolean,
        value: false,
        observer: '_openedChanged'
      }
    };
  }

  /** @private */
  _openedChanged(opened) {
    if (opened) {
      document.body.appendChild(this);
      if (this._boundIosResizeListener) {
        this._detectIosNavbar();
        window.addEventListener('resize', this._boundIosResizeListener);
      }
    } else {
      document.body.removeChild(this);
      if (this._boundIosResizeListener) {
        window.removeEventListener('resize', this._boundIosResizeListener);
      }
    }
  }

  constructor() {
    super();

    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      this._boundIosResizeListener = () => this._detectIosNavbar();
    }
  }

  /** @private */
  _detectIosNavbar() {
    const innerHeight = window.innerHeight;
    const innerWidth = window.innerWidth;
    const landscape = innerWidth > innerHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (landscape && clientHeight > innerHeight) {
      this.style.bottom = (clientHeight - innerHeight) + 'px';
    } else {
      this.style.bottom = '0';
    }
  }
}

/**
 * The container element for the notification
 *
 * ### Styling
 *
 * The following shadow DOM parts are available for styling:
 *
 * Part name | Description
 * ----------------|----------------
 * `overlay` | The notification container
 * `content` | The content of the notification
 *
 * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
 *
 * @extends HTMLElement
 * @mixes ThemableMixin
 */
class NotificationCard extends ThemableMixin(PolymerElement) {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }

      [part="overlay"] {
        pointer-events: auto;
      }
    </style>

    <div part="overlay">
      <div part="content">
        <slot></slot>
      </div>
    </div>
`;
  }

  static get is() {
    return 'vaadin-notification-card';
  }

  /** @protected */
  ready() {
    super.ready();
    this.setAttribute('role', 'alert');
    this.setAttribute('aria-live', 'polite');
  }
}

/**
 *
 * `<vaadin-notification>` is a Web Component providing accessible and customizable notifications (toasts).
 * The content of the notification can be populated in two ways: imperatively by using renderer callback function
 * and declaratively by using Polymer's Templates.
 *
 * ### Rendering
 *
 * By default, the notification uses the content provided by using the renderer callback function.
 *
 * The renderer function provides `root`, `notification` arguments.
 * Generate DOM content, append it to the `root` element and control the state
 * of the host element by accessing `notification`. Before generating new content,
 * users are able to check if there is already content in `root` for reusing it.
 *
 * ```html
 * <vaadin-notification id="notification"></vaadin-notification>
 * ```
 * ```js
 * const notification = document.querySelector('#notification');
 * notification.renderer = function(root) {
 *   root.textContent = "Your work has been saved";
 * };
 * ```
 *
 * Renderer is called on the opening of the notification.
 * DOM generated during the renderer call can be reused
 * in the next renderer call and will be provided with the `root` argument.
 * On first call it will be empty.
 *
 * ### Polymer Templates
 *
 * Alternatively, the content can be provided with Polymer's Template.
 * Notification finds the first child template and uses that in case renderer callback function
 * is not provided. You can also set a custom template using the `template` property.
 *
 * ```
 * <vaadin-notification>
 *   <template>
 *     Your work has been saved
 *   </template>
 * </vaadin-notification>
 * ```
 *
 * ### Styling
 *
 * `<vaadin-notification>` uses `<vaadin-notification-card>` internal
 * themable component as the actual visible notification cards. See
 * the stylable parts the
 * [`<vaadin-notification-card>` API](https://vaadin.com/components/vaadin-notification/html-api/elements/Vaadin.NotificationCard).
 *
 * Note: the `theme` attribute value set on `<vaadin-notification>` is
 * propagated to the internal `<vaadin-notification-card>`.
 *
 * @extends HTMLElement
 * @mixes ThemePropertyMixin
 * @mixes ElementMixin
 */
class NotificationElement extends ThemePropertyMixin(ElementMixin(PolymerElement)) {
  static get template() {
    return html`
    <style>
      :host {
        display: none;
      }
    </style>
    <vaadin-notification-card id="vaadin-notification-card" theme\$="[[theme]]">
    </vaadin-notification-card>
`;
  }

  static get is() {
    return 'vaadin-notification';
  }

  static get version() {
    return '1.6.1';
  }

  static get properties() {
    return {
      /**
       * The duration in milliseconds to show the notification.
       * Set to `0` or a negative number to disable the notification auto-closing.
       * @type {number}
       */
      duration: {
        type: Number,
        value: 5000
      },

      /**
       * True if the notification is currently displayed.
       * @type {boolean}
       */
      opened: {
        type: Boolean,
        value: false,
        notify: true,
        observer: '_openedChanged'
      },

      /**
       * Alignment of the notification in the viewport
       * Valid values are `top-stretch|top-start|top-center|top-end|middle|bottom-start|bottom-center|bottom-end|bottom-stretch`
       * @type {!NotificationPosition}
       */
      position: {
        type: String,
        value: 'bottom-start',
        observer: '_positionChanged'
      },

      /**
       * Custom function for rendering the content of the notification.
       * Receives two arguments:
       *
       * - `root` The `<vaadin-notification-card>` DOM element. Append
       *   your content to it.
       * - `notification` The reference to the `<vaadin-notification>` element.
       * @type {!NotificationRenderer | undefined}
       */
      renderer: Function,

      /**
       * The template of the notification card content.
       * @type {!HTMLTemplateElement | undefined}
       * @protected
       */
      _notificationTemplate: Object
    };
  }

  static get observers() {
    return [
      '_durationChanged(duration, opened)',
      '_templateOrRendererChanged(_notificationTemplate, renderer, opened)'
    ];
  }

  /** @protected */
  ready() {
    super.ready();

    this._observer = new FlattenedNodesObserver(this, info => {
      this._setTemplateFromNodes(info.addedNodes);
    });
  }

  /**
   * @param {!Array<!Node>} nodes
   * @protected
   */
  _setTemplateFromNodes(nodes) {
    this._notificationTemplate = nodes.filter(node => node.localName && node.localName === 'template')[0] || this._notificationTemplate;
  }

  /**
   * Manually invoke existing renderer.
   */
  render() {
    if (typeof this.renderer !== 'function') {
      return;
    }
    this.renderer(this._card, this);
  }

  /** @private */
  _removeNewRendererOrTemplate(template, oldTemplate, renderer, oldRenderer) {
    if (template !== oldTemplate) {
      this._notificationTemplate = undefined;
    } else if (renderer !== oldRenderer) {
      this.renderer = undefined;
    }
  }

  /** @private */
  _templateOrRendererChanged(template, renderer, opened) {
    if (template && renderer) {
      this._removeNewRendererOrTemplate(template, this._oldTemplate, renderer, this._oldRenderer);
      throw new Error('You should only use either a renderer or a template for notification content');
    }

    this._oldTemplate = template;

    const rendererChanged = this._oldRenderer !== renderer;
    this._oldRenderer = renderer;

    if (renderer) {
      this._card = this.$['vaadin-notification-card'];

      if (rendererChanged) {
        while (this._card.firstChild) {
          this._card.removeChild(this._card.firstChild);
        }
      }

      if (opened) {
        if (!this._didAnimateNotificationAppend) {
          this._animatedAppendNotificationCard();
        }
        this.render();
      }
    }
  }

  /**
   * Opens the notification.
   */
  open() {
    this.opened = true;
  }

  /**
   * Closes the notification.
   */
  close() {
    this.opened = false;
  }

  /** @private */
  get _container() {
    if (!NotificationElement._container) {
      NotificationElement._container = document.createElement('vaadin-notification-container');
      document.body.appendChild(NotificationElement._container);
    }
    return NotificationElement._container;
  }

  /** @private */
  _openedChanged(opened) {
    if (opened) {
      this._container.opened = true;
      if (!this._instance && !this.renderer) {
        this._ensureTemplatized();
      }

      this._animatedAppendNotificationCard();
    } else if (this._card) {
      this._closeNotificationCard();
    }
  }

  /** @private */
  _ensureTemplatized() {
    this._notificationTemplate = this.querySelector('template') || this._notificationTemplate;

    if (!this._notificationTemplate) {
      return;
    }

    if (!this._notificationTemplate._Templatizer) {
      this._notificationTemplate._Templatizer = templatize(this._notificationTemplate, this, {
        forwardHostProp: function(prop, value) {
          if (this._instance) {
            this._instance.forwardHostProp(prop, value);
          }
        }
      });
    }
    this._instance = new this._notificationTemplate._Templatizer({});

    const templateRoot = this._notificationTemplate.getRootNode();
    const isScoped = templateRoot !== document;
    this._card = this.$['vaadin-notification-card'];
    this._cardContent = this._card.shadowRoot.querySelector('[part~="content"]');
    if (isScoped) {

      if (!this._cardContent.shadowRoot) {
        this._cardContent.attachShadow({mode: 'open'});
      }

      const scopeCssText = Array.from(templateRoot.querySelectorAll('style'))
        .reduce((result, style) => result + style.textContent, '')
        // The overlay root’s :host styles should not apply inside the overlay
        .replace(/:host/g, ':host-nomatch');

      if (scopeCssText) {
        const style = document.createElement('style');
        style.textContent = scopeCssText;
        this._cardContent.shadowRoot.appendChild(style);
      }

      this._cardContent.shadowRoot.appendChild(this._instance.root);
    } else {
      this._card.appendChild(this._instance.root);
    }

    this._card.setAttribute('aria-label', this._card.textContent.trim());
  }

  /** @private */
  _animatedAppendNotificationCard() {
    if (this._card) {
      this._card.setAttribute('opening', '');
      this._appendNotificationCard();
      const listener = () => {
        this._card.removeEventListener('animationend', listener);
        this._card.removeAttribute('opening');
      };
      this._card.addEventListener('animationend', listener);
      this._didAnimateNotificationAppend = true;
    } else {
      this._didAnimateNotificationAppend = false;
    }
  }

  /** @private */
  _appendNotificationCard() {
    if (!this._card) {
      return;
    }

    if (!this._container.shadowRoot.querySelector(`slot[name="${this.position}"]`)) {
      window.console.warn(
        `Invalid alignment parameter provided: position=${this.position}`);
      return;
    }

    this._card.slot = this.position;
    if (this._container.firstElementChild && /top/.test(this.position)) {
      this._container.insertBefore(this._card, this._container.firstElementChild);
    } else {
      this._container.appendChild(this._card);
    }
  }

  /** @private */
  _removeNotificationCard() {
    this._card.parentNode && this._card.parentNode.removeChild(this._card);
    this._card.removeAttribute('closing');
    this._container.opened = Boolean(this._container.firstElementChild);
  }

  /** @private */
  _closeNotificationCard() {
    this._durationTimeoutId && clearTimeout(this._durationTimeoutId);
    this._animatedRemoveNotificationCard();
  }

  /** @private */
  _animatedRemoveNotificationCard() {
    this._card.setAttribute('closing', '');
    const name = getComputedStyle(this._card).getPropertyValue('animation-name');
    if (name && name != 'none') {
      const listener = () => {
        this._removeNotificationCard();
        this._card.removeEventListener('animationend', listener);
      };
      this._card.addEventListener('animationend', listener);
    } else {
      this._removeNotificationCard();
    }
  }

  /** @private */
  _positionChanged(position) {
    if (this.opened) {
      this._animatedAppendNotificationCard();
    }
  }

  /** @private */
  _durationChanged(duration, opened) {
    if (opened) {
      clearTimeout(this._durationTimeoutId);
      if (duration > 0) {
        this._durationTimeoutId = setTimeout(() => this.close(), duration);
      }
    }
  }
}

customElements.define(NotificationContainer.is, NotificationContainer);
customElements.define(NotificationCard.is, NotificationCard);
customElements.define(NotificationElement.is, NotificationElement);

export { NotificationElement };
