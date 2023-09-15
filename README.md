# adapt-notifyLinks  

**notifyLinks** is an *extension* to allow a learner to click on a link to open an adapt model in a notify popup.

You can see it [here](https://adaptlearning-no-core.web.app/#/id/eo-35)

## Usage
Use the css selector that you specified in the course settings to create a link to an adapt model element. And use the href attribute to specify the adapt model id.
```
<a class="notify-link" href="#id-adapt-model">Notify link</a>
```
If you want to use the _name property, set the href attribute with the _name property.
```
<a class="notify-link" href="custom-name">Notify link name</a>
```

----------------------------
**Author / maintainer:**  [Nacho Cinalli](https://github.com/nachocinalli/)    
