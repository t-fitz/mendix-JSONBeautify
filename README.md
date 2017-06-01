# mendix-JSONBeautify

A Mendix widget which beautifies a JSON string

No dependencies. Small size.

----

### What does it do?

This widget will beautify / prettify a JSON string. What does that mean? The JSON string will be formatted with appropriate indentations and new lines.  

----

### How to get it to work?

Just download the latest release. Add the .mpk file to your projects widget folder. Open your project (press F4 if your project is already open). The JsonBeautify widget will now be available in the Add-on dropdown when you're styling a page.

Put the widget on the page.

Set your Data parameters for the Entity and Attribute that you want to beautify.

![JSON Beautify Settings](/images/Widget Options.PNG?raw=true "JSON Beautify Settings")

Once you've selected the Entity and Attrributes you're good to go. Run your project and you're done.

#### Example time

Here's an example of a JSON string before it's beautified.

![Unbeautified JSON String](/images/Unbeautified JSON String.PNG?raw=true "Unbeautified JSON String")


Here's an example of a JSON string after it's been beautified.

![Beautified JSON String](/images/Beautified JSON String.PNG?raw=true "Beautified JSON String")

----

### Where will it work?

I've tested this in Mendix 6 so it should be good for use in Mendix 5 and 6.

As this uses the newer widget definition style it won't work, as is, in Mendix 4. Of course that doesn't stop you from scooping out the guts of the widget and putting it in a Mendix 4 widget template. Let me know if you do so I can link to it.

----

### Bugs and other stuff

Do let me know if you run into any troubles using this widget. Pictures and error codes welcomed.

Any ideas to make this better? What?! Impossible!! Well maybe. Ok, let me know if you need more functionality or if you have ideas to make the code better, faster, stronger.
