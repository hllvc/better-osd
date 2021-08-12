const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;

const Gettext = imports.gettext.domain("better-osd");
const _ = Gettext.gettext;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

//-----------------------------------------------

function init() {
  ExtensionUtils.initTranslations();
}

//-----------------------------------------------

const OSDSettingsWidget = new GObject.registerClass(
  {
    GTypeName: "OSDPrefsWidget",
  },
  class OSDSettingsWidget extends Gtk.Box {
    _init(params) {
      super._init(params);
      this.margin = 30;
      this.spacing = 25;
      this.fill = true;
      this.orientation = Gtk.Orientation.VERTICAL;

      this._settings = ExtensionUtils.getSettings(
        "org.gnome.shell.extensions.better-osd"
      );

      let labelHorizontalPercentage = _("Horizontal position (percentage) :");

      let horizontalPercentage = new Gtk.SpinButton();
      horizontalPercentage.set_sensitive(true);
      horizontalPercentage.set_range(-60, 60);
      horizontalPercentage.set_value(0);
      horizontalPercentage.set_value(this._settings.get_int("horizontal"));
      horizontalPercentage.set_increments(1, 2);

      horizontalPercentage.connect(
        "value-changed",
        function (w) {
          var value = w.get_value_as_int();
          this._settings.set_int("horizontal", value);
        }.bind(this)
      );

      let hBox = new Gtk.Box({
        orientation: Gtk.Orientation.HORIZONTAL,
        spacing: 15,
      });
      hBox.prepend(
        new Gtk.Label({
          label: labelHorizontalPercentage,
          use_markup: true,
          halign: Gtk.Align.START,
        })
      );
      hBox.append(horizontalPercentage);
      this.append(hBox);

      //-------------------------------------------------------

      let labelVerticalPercentage = _("Vertical position (percentage) :");

      let verticalPercentage = new Gtk.SpinButton();
      verticalPercentage.set_sensitive(true);
      verticalPercentage.set_range(-110, 110);
      verticalPercentage.set_value(70);
      verticalPercentage.set_value(this._settings.get_int("vertical"));
      verticalPercentage.set_increments(1, 2);

      verticalPercentage.connect(
        "value-changed",
        function (w) {
          var value = w.get_value_as_int();
          this._settings.set_int("vertical", value);
        }.bind(this)
      );

      let vBox = new Gtk.Box({
        orientation: Gtk.Orientation.HORIZONTAL,
        spacing: 15,
      });
      vBox.prepend(
        new Gtk.Label({
          label: labelVerticalPercentage,
          use_markup: true,
          halign: Gtk.Align.START,
        })
      );
      vBox.append(verticalPercentage);
      this.append(vBox);

      //-------------------------------------------------------

      let labelSizePercentage = _("Size (percentage) :");

      let sizePercentage = new Gtk.SpinButton();
      sizePercentage.set_sensitive(true);
      sizePercentage.set_range(0, 100);
      sizePercentage.set_value(20);
      sizePercentage.set_value(this._settings.get_int("size"));
      sizePercentage.set_increments(1, 2);

      sizePercentage.connect(
        "value-changed",
        function (w) {
          var value = w.get_value_as_int();
          this._settings.set_int("size", value);
        }.bind(this)
      );

      let sizeBox = new Gtk.Box({
        orientation: Gtk.Orientation.HORIZONTAL,
        spacing: 15,
      });
      sizeBox.prepend(
        new Gtk.Label({
          label: labelSizePercentage,
          use_markup: true,
          halign: Gtk.Align.START,
        })
      );
      sizeBox.append(sizePercentage);
      this.append(sizeBox);

      //-------------------------------------------------------

      let labelDelay = _("Hide Delay (ms) :");

      let hideDelay = new Gtk.SpinButton();
      hideDelay.set_sensitive(true);
      hideDelay.set_range(0, 5000);
      hideDelay.set_value(1500);
      hideDelay.set_value(this._settings.get_int("delay"));
      hideDelay.set_increments(1, 2);

      hideDelay.connect(
        "value-changed",
        function (w) {
          var value = w.get_value_as_int();
          this._settings.set_int("delay", value);
        }.bind(this)
      );

      let delayBox = new Gtk.Box({
        orientation: Gtk.Orientation.HORIZONTAL,
        spacing: 15,
      });
      delayBox.prepend(
        new Gtk.Label({
          label: labelDelay,
          use_markup: true,
          halign: Gtk.Align.START,
        })
      );
      delayBox.append(hideDelay);
      this.append(delayBox);

      //-------------------------------------------------------

      let labelTransparency = _("Transparency:");

      let switchTransparency = new Gtk.Switch();
      switchTransparency.set_active(this._settings.get_boolean("transparency"));

      switchTransparency.connect(
        "state-set",
        function (w) {
          var value = w.get_active();
          this._settings.set_boolean("transparency", value);
        }.bind(this)
      );

      let transparencyBox = new Gtk.Box({
        orientation: Gtk.Orientation.HORIZONTAL,
        spacing: 15,
      });
      transparencyBox.prepend(
        new Gtk.Label({
          label: labelTransparency,
          use_markup: true,
          halign: Gtk.Align.START,
        })
      );
      transparencyBox.append(switchTransparency);
      this.append(transparencyBox);
    }
  }
);

//-----------------------------------------------

//I guess this is like the "enable" in extension.js : something called each
//time he user try to access the settings' window
function buildPrefsWidget() {
  return new OSDSettingsWidget();
}
