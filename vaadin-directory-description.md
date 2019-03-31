
# &lt;vaadin-notification&gt;

[![Available in Vaadin_Directory](https://img.shields.io/vaadin-directory/v/vaadinvaadin-notification.svg)](https://vaadin.com/directory/component/vaadinvaadin-notification)


[&lt;vaadin-notification&gt;](https://vaadin.com/components/vaadin-notification) is a Web Component providing accessible and customizable notifications (toasts), part of the [Vaadin components](https://vaadin.com/components).


[<img src="https://raw.githubusercontent.com/vaadin/vaadin-notification/master/screenshot.png" width="336" alt="Screenshot of vaadin-notification">](https://vaadin.com/components/vaadin-notification)

## Example Usage
```html
<vaadin-notification opened position="middle" duration="-1">
</vaadin-notification>

<script>
  const notification = document.querySelector('vaadin-notification');

  notification.renderer = function(root) {
    // Check if there is a content generated with the previous renderer call not to recreate it.
    if (root.firstElementChild) {
      return;
    }

    const container = window.document.createElement('div');
    const text = window.document.createTextNode('Your work has been saved');
    
    container.appendChild(text);
    root.appendChild(container);
  };
</script>
```
